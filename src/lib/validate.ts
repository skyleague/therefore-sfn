import type { SafeStateMachine } from '..'
import { StateMachine } from '../types'
import type { State } from '../types/sfn.type'

export function validateStateMachine<States extends StateMachine['States']>({
    definition,
    onState,
    retryOptions,
}: {
    definition: SafeStateMachine<States>
    retryOptions?: RetryOptions
    onState?: (state: State) => void
}): StateMachine {
    if (!StateMachine.is(definition)) {
        throw new Error(
            `Definition did not comply with the StateMachine schema; ${StateMachine.validate.errors?.[0].message ?? ''}`
        )
    }
    const visited = validateNext({
        definition,
        next: definition.StartAt,
        visited: new Set<string>(),
        retryOptions,
        onState,
    })
    for (const name of Object.keys(definition.States)) {
        if (!visited.has(name)) {
            throw new Error(`Unreachable state: ${name}`)
        }
    }

    for (const [_name, state] of Object.entries(definition.States)) {
        if (state?.Type === 'Parallel') {
            for (const branch of state.Branches) {
                void validateStateMachine({ definition: branch })
            }
        } else if (state?.Type === 'Map') {
            void validateStateMachine({ definition: state.Iterator })
        }
    }
    return definition
}

function validateNext({
    definition,
    next,
    visited,
    retryOptions,
    onState,
}: {
    definition: StateMachine
    next: string
    visited: Set<string>
    retryOptions: RetryOptions | undefined
    onState: ((state: State) => void) | undefined
}): Set<string> {
    if (visited.has(next)) {
        return visited
    }
    const state = definition.States[next]
    visited.add(next)
    if (state === undefined) {
        throw new Error(`Undefined target: ${next}`)
    }

    // Apply hook on the state
    void onState?.(state)
    if (state.Type === 'Task') {
        injectRetryOptions({ state, retryOptions })
    }

    if (state.Type === 'Choice') {
        for (const branch of state.Choices) {
            visited = validateNext({
                definition,
                next: branch.Next,
                visited,
                retryOptions,
                onState,
            })
        }
        if (state.Default !== undefined) {
            return validateNext({
                definition,
                next: state.Default,
                visited,
                retryOptions,
                onState,
            })
        } else {
            return visited
        }
    } else if ('Next' in state) {
        return validateNext({
            definition,
            next: state.Next,
            visited,
            retryOptions,
            onState,
        })
    } else if ('End' in state && state.End === true) {
        return visited
    } else if (state.Type === 'Succeed' || state.Type === 'Fail') {
        return visited
    } else {
        throw new Error(`Undefined state transition in ${next}`)
    }
}

interface RetryOptions {
    lambda?: {
        tooManyRequests?: {
            enabled?: boolean
            backoffRate?: number
            intervalSeconds?: number
            maxAttempts?: number
        }
        serviceExceptions?: {
            enabled?: boolean
            backoffRate?: number
            intervalSeconds?: number
            maxAttempts?: number
        }
    }
}
function injectRetryOptions({
    state,
    retryOptions,
}: {
    state: NonNullable<StateMachine['States'][string]>
    retryOptions: RetryOptions | undefined
}) {
    if (
        state.Type === 'Task' &&
        (retryOptions?.lambda?.tooManyRequests?.enabled !== false || retryOptions?.lambda?.serviceExceptions?.enabled !== false)
    ) {
        const lambdaTooManyRequestsException = 'Lambda.TooManyRequestsException'
        if (
            retryOptions?.lambda?.tooManyRequests?.enabled !== false &&
            !state.Retry?.some((r) => r.ErrorEquals.includes(lambdaTooManyRequestsException))
        ) {
            state.Retry = [
                {
                    ErrorEquals: [lambdaTooManyRequestsException],
                    /**
                     * Calculated using: https://www.wolframalpha.com/input?i=sum_i%3D1%5Ex+2+*+1.5%5Ei%2C+where+x%3D13
                     * Comes down to 1161s of backoff time
                     */
                    BackoffRate: retryOptions?.lambda?.tooManyRequests?.backoffRate ?? 1.5,
                    IntervalSeconds: retryOptions?.lambda?.tooManyRequests?.intervalSeconds ?? 2,
                    MaxAttempts: retryOptions?.lambda?.tooManyRequests?.maxAttempts ?? 13,
                },
            ]
        }
        const unhandled = ['Lambda.ServiceException', 'Lambda.AWSLambdaException', 'Lambda.SdkClientException'].filter(
            (err) => !state.Retry?.some((r) => r.ErrorEquals.includes(err))
        )
        if (retryOptions?.lambda?.serviceExceptions?.enabled !== false && unhandled.length > 0) {
            state.Retry = [
                {
                    ErrorEquals: unhandled as [string, ...string[]],
                    /**
                     * Calculated using: https://www.wolframalpha.com/input?i=sum_i%3D1%5Ex+0.2+*+1.5%5Ei%2C+where+x%3D17
                     * Comes down to 590s of backoff time (excluding Lambda execution time)
                     */
                    BackoffRate: retryOptions?.lambda?.serviceExceptions?.backoffRate ?? 1.5,
                    IntervalSeconds: retryOptions?.lambda?.serviceExceptions?.intervalSeconds ?? 0.2,
                    MaxAttempts: retryOptions?.lambda?.serviceExceptions?.maxAttempts ?? 17,
                },
                ...(state.Retry ?? []),
            ]
        }
    }
}
