/**
 * Definitions in this file are based on the AWS spec:
 * https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html
 */
import { baseInOutState, baseState, eitherEndOrNext, parametrizedState, retryableState } from './base.schema.js'
import { choiceState } from './choice.schema.js'

import {
    $array,
    $const,
    $dict,
    $number,
    $object,
    $optional,
    $ref,
    $string,
    $union,
    $unknown,
    $validator,
} from '@skyleague/therefore'

export const failState = $object({
    Type: $const('Fail'),
    ...baseState,
})

export const succeedState = $object({
    Type: $const('Succeed'),
    ...baseInOutState,
})

export const passState = $union(
    eitherEndOrNext({
        Type: $const('Pass'),
        ...parametrizedState,
        Result: $optional($unknown),
    }).map((x) => $object(x))
)
export const taskState = $union(
    eitherEndOrNext({
        Type: $const('Task'),
        ...retryableState,
        Resource: $string,
        TimeoutSeconds: $optional($number),
        HeartbeatSeconds: $optional($number),
        TimeoutSecondsPath: $optional($string),
        HeartbeatSecondsPath: $optional($string),
    }).map((x) => $object(x))
)

export const waitState = $union(
    eitherEndOrNext({
        Type: $const('Wait'),
        ...baseInOutState,
    }).map((x) => $object(x))
)

export const parallelState = $union(
    eitherEndOrNext({
        Type: $const('Parallel'),
        ...retryableState,
        Branches: $array(
            $ref(() => stateMachine),
            { minItems: 1 }
        ),
    }).map((x) => $object(x))
)

export const processConfig = $object({
    Mode: $string(),
    ExecutionType: $string(),
})

export const itemProcessor = $object({
    ProcessorConfig: $optional($ref(processConfig)),
    StartAt: $string(),
    States: $dict($ref(taskState)),
})

export const readerConfig = $object({
    InputType: $optional($string),
    CSVHeaderLocation: $optional($string),
    CSVHeaders: $optional($array($string, { minItems: 1 })),
    MaxItems: $optional($number),
})

export const parameters = $object({
    Bucket: $optional($string),
    Key: $optional($string),
    Prefix: $optional($string),
})

export const itemReader = $object({
    ReaderConfig: $optional($ref(readerConfig)),
    Resource: $optional($string),
    Parameters: $optional($ref(parameters)),
})

export const itemBatcher = $object({
    MaxItemsPerBatchPath: $optional($dict($number)),
    MaxInputBytesPerBatchPath: $optional($dict($number)),
})

export const mapState = $union(
    eitherEndOrNext({
        Type: $const('Map'),
        ...retryableState,
        MaxConcurrency: $optional($number),
        ItemsPath: $optional($string),
        Iterator: $optional($ref(() => stateMachine)),
        ItemProcessor: $ref(itemProcessor),
        ItemReader: $optional($ref(itemReader)),
        ItemSelector: $optional($dict($string)),
        ItemBatcher: $optional($ref(itemBatcher)),
        MaxConcurrencyPath: $optional($string),
        Label: $optional($string),
        ToleratedFailurePercentage: $optional($number),
        ToleratedFailurePercentagePath: $optional($string),
        ToleratedFailureCount: $optional($number),
        ToleratedFailureCountPath: $optional($string),
        ResultWriter: $optional($string),
    }).map((x) => $object(x))
)

export const state = $union([
    $ref(taskState),
    $ref(() => parallelState),
    $ref(() => mapState),
    $ref(passState),
    $ref(waitState),
    $ref(choiceState),
    $ref(succeedState),
    $ref(failState),
])

export const stateMachine = $validator(
    $object({
        Comment: $optional($string),
        StartAt: $string(),
        States: $dict(state),
        TimeoutSeconds: $optional($number),
    }),
    { assert: false }
)
