/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */

interface Choices {
    Next: string
    [k: string]: unknown
}

export interface ChoiceState {
    Type: 'Choice'
    Comment?: string
    InputPath?: string
    OutputPath?: string
    Choices: [Choices, ...Choices[]]
    Default?: string
}
