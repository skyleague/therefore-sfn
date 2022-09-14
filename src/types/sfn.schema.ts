/**
 * Definitions in this file are based on the AWS spec:
 * https://docs.aws.amazon.com/step-functions/latest/dg/concepts-amazon-states-language.html
 */
import { baseInOutState, baseState, eitherEndOrNext, parametrizedState, retryableState } from './base'
import { choiceState } from './choice.schema'

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
export const mapState = $union(
    eitherEndOrNext({
        Type: $const('Map'),
        ...retryableState,
        MaxConcurrency: $optional($number),
        ItemsPath: $optional($string),
        Iterator: $ref(() => stateMachine),
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
