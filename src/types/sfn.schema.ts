/**
 * Definitions in this file are based on the AWS spec:
 * https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html
 */
import { baseInOutState, baseState, endOrNext, parametrizedState, retryableState } from './base.schema.js'
import { choiceState } from './choice.schema.js'

import { $const, $number, $object, $record, $ref, $string, $union, $unknown, type UnionType } from '@skyleague/therefore'

export const failState = baseState.extend({
    Type: $const('Fail'),
})

export const succeedState = baseInOutState.extend({
    Type: $const('Succeed'),
})

export const passState = endOrNext(
    parametrizedState.extend({
        Type: $const('Pass'),
        Result: $unknown().optional(),
    }),
)
export const taskState = endOrNext(
    retryableState.extend({
        Type: $const('Task'),
        Resource: $string,
        TimeoutSeconds: $number().optional(),
        HeartbeatSeconds: $number().optional(),
        TimeoutSecondsPath: $string().optional(),
        HeartbeatSecondsPath: $string().optional(),
    }),
)

export const waitState = endOrNext(
    baseInOutState.extend({
        Type: $const('Wait'),
    }),
)

export const parallelState: UnionType = endOrNext(
    retryableState.extend({
        Type: $const('Parallel'),
        Branches: $ref(() => stateMachine).array({ minItems: 1 }),
    }),
)

export const processConfig = $object({
    Mode: $string(),
    ExecutionType: $string(),
})

export const itemProcessor = $object({
    ProcessorConfig: $ref(processConfig).optional(),
    StartAt: $string(),
    States: $record($ref(taskState)),
})

export const readerConfig = $object({
    InputType: $string().optional(),
    CSVHeaderLocation: $string().optional(),
    CSVHeaders: $string().array({ minItems: 1 }).optional(),
    MaxItems: $number().optional(),
})

export const parameters = $object({
    Bucket: $string().optional(),
    Key: $string().optional(),
    Prefix: $string().optional(),
})

export const itemReader = $object({
    ReaderConfig: $ref(readerConfig).optional(),
    Resource: $string().optional(),
    Parameters: $ref(parameters).optional(),
})

export const itemBatcher = $object({
    MaxItemsPerBatchPath: $record($number).optional(),
    MaxInputBytesPerBatchPath: $record($number).optional(),
})

export const mapState = endOrNext(
    retryableState.extend({
        Type: $const('Map'),
        MaxConcurrency: $number().optional(),
        ItemsPath: $string().optional(),
        Iterator: $ref(() => stateMachine).optional(),
        ItemProcessor: $ref(itemProcessor),
        ItemReader: $ref(itemReader).optional(),
        ItemSelector: $record($string).optional(),
        ItemBatcher: $ref(itemBatcher).optional(),
        MaxConcurrencyPath: $string().optional(),
        Label: $string().optional(),
        ToleratedFailurePercentage: $number().optional(),
        ToleratedFailurePercentagePath: $string().optional(),
        ToleratedFailureCount: $number().optional(),
        ToleratedFailureCountPath: $string().optional(),
        ResultWriter: $string().optional(),
    }),
)

export const state: UnionType = $union([
    $ref(taskState),
    $ref(() => parallelState),
    $ref(() => mapState),
    $ref(passState),
    $ref(waitState),
    $ref(choiceState),
    $ref(succeedState),
    $ref(failState),
])

export const stateMachine = $object({
    Comment: $string().optional(),
    StartAt: $string(),
    States: $record(state),
    TimeoutSeconds: $number().optional(),
}).validator()
