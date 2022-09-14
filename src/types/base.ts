import { $boolean, $optional, $string, $unknown } from '@skyleague/therefore'

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
export const retryableState = {
    ...parametrizedState,
    ResultSelector: $optional($unknown),
    Retry: $optional($unknown),
    Catch: $optional($unknown),
}

export function eitherEndOrNext<T>(x: T) {
    return [
        { ...x, End: $boolean },
        { ...x, Next: $string },
    ]
}
