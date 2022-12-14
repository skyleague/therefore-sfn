/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */
import AjvValidator from 'ajv'
import type { ValidateFunction } from 'ajv'

export interface StateMachineCompileInput {
    file: string
    export: string
    awsRegion: string
    awsAccountId: string
}

export const StateMachineCompileInput = {
    validate: require('./schemas/state-machine-compile-input.schema.js') as ValidateFunction<StateMachineCompileInput>,
    get schema() {
        return StateMachineCompileInput.validate.schema
    },
    is: (o: unknown): o is StateMachineCompileInput => StateMachineCompileInput.validate(o) === true,
    assert: (o: unknown) => {
        if (!StateMachineCompileInput.validate(o)) {
            throw new AjvValidator.ValidationError(StateMachineCompileInput.validate.errors ?? [])
        }
    },
} as const

export interface LambdaIntegrationParameters {
    FunctionName: string
    Payload: unknown
    [k: string]: unknown
}

export const LambdaIntegrationParameters = {
    validate: require('./schemas/lambda-integration-parameters.schema.js') as ValidateFunction<LambdaIntegrationParameters>,
    get schema() {
        return LambdaIntegrationParameters.validate.schema
    },
    is: (o: unknown): o is LambdaIntegrationParameters => LambdaIntegrationParameters.validate(o) === true,
    assert: (o: unknown) => {
        if (!LambdaIntegrationParameters.validate(o)) {
            throw new AjvValidator.ValidationError(LambdaIntegrationParameters.validate.errors ?? [])
        }
    },
} as const
