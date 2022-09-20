/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */
import type { ValidateFunction } from 'ajv'
import { ChoiceState } from './choice.type'
import { RetryOptions } from './base.type'

export interface FailState {
    Type: 'Fail'
    Comment?: string
}

export interface SucceedState {
    Type: 'Succeed'
    Comment?: string
    InputPath?: string
    OutputPath?: string
}

export type PassState =
    | {
          Type: 'Pass'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          Result?: unknown
          End: boolean
      }
    | {
          Type: 'Pass'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          Result?: unknown
          Next: string
      }

export type TaskState =
    | {
          Type: 'Task'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]]
          Catch?: unknown
          Resource: string
          TimeoutSeconds?: number
          HeartbeatSeconds?: number
          TimeoutSecondsPath?: string
          HeartbeatSecondsPath?: string
          End: boolean
      }
    | {
          Type: 'Task'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]]
          Catch?: unknown
          Resource: string
          TimeoutSeconds?: number
          HeartbeatSeconds?: number
          TimeoutSecondsPath?: string
          HeartbeatSecondsPath?: string
          Next: string
      }

export type WaitState =
    | {
          Type: 'Wait'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          End: boolean
      }
    | {
          Type: 'Wait'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          Next: string
      }

export type ParallelState =
    | {
          Type: 'Parallel'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]]
          Catch?: unknown
          Branches: [StateMachine, ...StateMachine[]]
          End: boolean
      }
    | {
          Type: 'Parallel'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]]
          Catch?: unknown
          Branches: [StateMachine, ...StateMachine[]]
          Next: string
      }

export type MapState =
    | {
          Type: 'Map'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]]
          Catch?: unknown
          MaxConcurrency?: number
          ItemsPath?: string
          Iterator: StateMachine
          End: boolean
      }
    | {
          Type: 'Map'
          Comment?: string
          InputPath?: string
          OutputPath?: string
          ResultPath?: string
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]]
          Catch?: unknown
          MaxConcurrency?: number
          ItemsPath?: string
          Iterator: StateMachine
          Next: string
      }

export type State = TaskState | ParallelState | MapState | PassState | WaitState | ChoiceState | SucceedState | FailState

export interface StateMachine {
    Comment?: string
    StartAt: string
    States: {
        [k: string]:
            | (TaskState | ParallelState | MapState | PassState | WaitState | ChoiceState | SucceedState | FailState)
            | undefined
    }
    TimeoutSeconds?: number
}

export const StateMachine = {
    validate: require('./schemas/state-machine.schema.js') as ValidateFunction<StateMachine>,
    get schema() {
        return StateMachine.validate.schema
    },
    is: (o: unknown): o is StateMachine => StateMachine.validate(o) === true,
} as const
