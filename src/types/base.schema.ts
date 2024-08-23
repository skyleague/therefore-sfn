import { $array, $boolean, $enum, $number, $object, $ref, $string, $union, $unknown, type ObjectType } from '@skyleague/therefore'

export const baseState = $object({
    Comment: $string().optional(),
})

export const baseInOutState = baseState.extend({
    InputPath: $string().optional(),
    OutputPath: $string().optional(),
})

export const parametrizedState = baseInOutState.extend({
    ResultPath: $string().optional(),
    Parameters: $unknown().optional(),
})

export const retryOptions = $object({
    ErrorEquals: $array($string, { minItems: 1 }),
    IntervalSeconds: $number().optional(),
    MaxAttempts: $number().optional(),
    BackoffRate: $number().optional(),
    MaxDelaySeconds: $number().optional(),
    JitterStrategy: $enum(['FULL', 'NONE']).optional(),
})
export const catchOptions = $object({
    Next: $string,
    ErrorEquals: $string().array({ minItems: 1 }),
    ResultPath: $string().optional(),
})
export const retryableState = parametrizedState.extend({
    ResultSelector: $unknown().optional(),
    Retry: $ref(retryOptions).array({ minItems: 1 }).optional(),
    Catch: $ref(catchOptions).array({ minItems: 1 }).optional(),
})

export function endOrNext<T extends ObjectType>(x: T) {
    return $union([x.extend({ End: $boolean }), x.extend({ Next: $string })])
}
