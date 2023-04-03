import { LambdaIntegrationParameters } from './input.type.js'

import { templateLambdaArn } from '../../lib/index.js'
import type { StateMachine } from '../../types/index.js'

export function listLambdaArns(definition: StateMachine) {
    const lambdaArns: string[] = []
    for (const state of Object.values(definition.States)) {
        if (state?.Type === 'Task') {
            if (state.Resource.startsWith('arn:aws:lambda:')) {
                lambdaArns.push(state.Resource)
            } else if (
                state.Resource.startsWith('arn:aws:states:::lambda:invoke') &&
                LambdaIntegrationParameters.is(state.Parameters)
            ) {
                if (state.Parameters.FunctionName.startsWith('arn:aws:lambda:')) {
                    lambdaArns.push(state.Parameters.FunctionName)
                } else {
                    lambdaArns.push(templateLambdaArn({ name: state.Parameters.FunctionName }))
                }
            }
        } else if (state?.Type === 'Parallel') {
            for (const branch of state.Branches) {
                lambdaArns.push(...listLambdaArns(branch))
            }
        } else if (state?.Type === 'Map') {
            lambdaArns.push(...listLambdaArns(state.Iterator))
        } else if (
            state?.Type === 'Pass' ||
            state?.Type === 'Choice' ||
            state?.Type === 'Fail' ||
            state?.Type === 'Succeed' ||
            state?.Type === 'Wait'
        ) {
            continue
        } else {
            throw new Error(`Unrecognized State: ${JSON.stringify(state, null, 2)}`)
        }
    }

    return [...new Set(lambdaArns)]
}
