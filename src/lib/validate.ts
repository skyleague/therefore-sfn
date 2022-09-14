import type { SafeStateMachine } from '..'
import { StateMachine } from '../types'
import type { State } from '../types/sfn.type'

export function validateStateMachine<States extends StateMachine['States']>(
    definition: SafeStateMachine<States>,
    onState?: (state: State) => void
): StateMachine {
    if (!StateMachine.is(definition)) {
        throw new Error(
            `Definition did not comply with the StateMachine schema; ${StateMachine.validate.errors?.[0].message ?? ''}`
        )
    }
    const visited = validateNext(definition, definition.StartAt, new Set<string>(), onState)
    for (const name of Object.keys(definition.States)) {
        if (!visited.has(name)) {
            throw new Error(`Unreachable state: ${name}`)
        }
    }

    for (const [_name, state] of Object.entries(definition.States)) {
        if (state?.Type === 'Parallel') {
            for (const branch of state.Branches) {
                void validateStateMachine(branch)
            }
        } else if (state?.Type === 'Map') {
            void validateStateMachine(state.Iterator)
        }
    }
    return definition
}

function validateNext(
    definition: StateMachine,
    next: string,
    visited: Set<string>,
    onState: ((state: State) => void) | undefined
): Set<string> {
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
    if (state.Type === 'Choice') {
        for (const branch of state.Choices) {
            visited = validateNext(definition, branch.Next, visited, onState)
        }
        if (state.Default !== undefined) {
            return validateNext(definition, state.Default, visited, onState)
        } else {
            return visited
        }
    } else if ('Next' in state) {
        return validateNext(definition, state.Next, visited, onState)
    } else if ('End' in state && state.End === true) {
        return visited
    } else if (state.Type === 'Succeed' || state.Type === 'Fail') {
        return visited
    } else {
        throw new Error(`Undefined state transition in ${next}`)
    }
}
