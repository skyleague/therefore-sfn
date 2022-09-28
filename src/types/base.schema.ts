import { $array, $boolean, $number, $object, $optional, $ref, $string, $unknown } from '@skyleague/therefore'

export const baseState = {
    Comment: $optional($string),
}
export const baseInOutState = {
    ...baseState,
    InputPath: $optional($string),
    OutputPath: $optional($string),
}
export const parametrizedState = {
    ...baseInOutState,
    ResultPath: $optional($string),
    Parameters: $optional($unknown),
}
export const retryOptions = $object({
    ErrorEquals: $array($string, { minItems: 1 }),
    IntervalSeconds: $optional($number),
    MaxAttempts: $optional($number),
    BackoffRate: $optional($number),
})
export const catchOptions = $object({
    ErrorEquals: $array($string, { minItems: 1 }),
    Next: $string,
    ResultPath: $optional($string),
})
export const retryableState = {
    ...parametrizedState,
    ResultSelector: $optional($unknown),
    Retry: $optional($array($ref(retryOptions), { minItems: 1 })),
    Catch: $optional($array($ref(catchOptions), { minItems: 1 })),
}

export function eitherEndOrNext<T>(x: T) {
    return [
        { ...x, End: $boolean },
        { ...x, Next: $string },
    ]
}
