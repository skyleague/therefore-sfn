import { $intersection, $object, $record, $string, $unknown } from '@skyleague/therefore'

export const stateMachineCompileInput = $object({
    file: $string,
    export: $string,
    awsRegion: $string,
    awsAccountId: $string,
}).validator()

export const lambdaIntegrationParameters = $intersection([
    $record($unknown),
    $object({
        FunctionName: $string,
        Payload: $unknown,
    }),
]).validator()
