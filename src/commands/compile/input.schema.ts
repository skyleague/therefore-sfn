import { $object, $string, $unknown, $validator } from '@skyleague/therefore'

export const stateMachineCompileInput = $validator(
    $object(
        {
            file: $string,
            export: $string,
            awsRegion: $string,
            awsAccountId: $string,
        },
        { additionalProperties: true }
    )
)

export const lambdaIntegrationParameters = $validator(
    $object(
        {
            FunctionName: $string,
            Payload: $unknown,
        },
        { indexSignature: $unknown }
    )
)
