/**
 * Generated by @skyleague/therefore@v1.0.0-local
 * Do not manually touch this
 */
/* eslint-disable */

import type { CatchOptions, RetryOptions } from './base.type.js'
import type { ChoiceState } from './choice.type.js'
import { validate as StateMachineValidator } from './schemas/state-machine.schema.js'

import type { DefinedError, ValidateFunction } from 'ajv'

export interface FailState {
    Comment?: string | undefined
    Type: 'Fail'
}

export interface ItemBatcher {
    MaxItemsPerBatchPath?:
        | {
              [k: string]: number | undefined
          }
        | undefined
    MaxInputBytesPerBatchPath?:
        | {
              [k: string]: number | undefined
          }
        | undefined
}

export interface ItemProcessor {
    ProcessorConfig?: ProcessConfig | undefined
    StartAt: string
    States: {
        [k: string]: TaskState | undefined
    }
}

export interface ItemReader {
    ReaderConfig?: ReaderConfig | undefined
    Resource?: string | undefined
    Parameters?: Parameters | undefined
}

export type MapState =
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]] | undefined
          Catch?: [CatchOptions, ...CatchOptions[]] | undefined
          Type: 'Map'
          MaxConcurrency?: number | undefined
          ItemsPath?: string | undefined
          Iterator?: StateMachine | undefined
          ItemProcessor: ItemProcessor
          ItemReader?: ItemReader | undefined
          ItemSelector?:
              | {
                    [k: string]: string | undefined
                }
              | undefined
          ItemBatcher?: ItemBatcher | undefined
          MaxConcurrencyPath?: string | undefined
          Label?: string | undefined
          ToleratedFailurePercentage?: number | undefined
          ToleratedFailurePercentagePath?: string | undefined
          ToleratedFailureCount?: number | undefined
          ToleratedFailureCountPath?: string | undefined
          ResultWriter?: string | undefined
          End: boolean
      }
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]] | undefined
          Catch?: [CatchOptions, ...CatchOptions[]] | undefined
          Type: 'Map'
          MaxConcurrency?: number | undefined
          ItemsPath?: string | undefined
          Iterator?: StateMachine | undefined
          ItemProcessor: ItemProcessor
          ItemReader?: ItemReader | undefined
          ItemSelector?:
              | {
                    [k: string]: string | undefined
                }
              | undefined
          ItemBatcher?: ItemBatcher | undefined
          MaxConcurrencyPath?: string | undefined
          Label?: string | undefined
          ToleratedFailurePercentage?: number | undefined
          ToleratedFailurePercentagePath?: string | undefined
          ToleratedFailureCount?: number | undefined
          ToleratedFailureCountPath?: string | undefined
          ResultWriter?: string | undefined
          Next: string
      }

export type ParallelState =
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]] | undefined
          Catch?: [CatchOptions, ...CatchOptions[]] | undefined
          Type: 'Parallel'
          Branches: [StateMachine, ...StateMachine[]]
          End: boolean
      }
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]] | undefined
          Catch?: [CatchOptions, ...CatchOptions[]] | undefined
          Type: 'Parallel'
          Branches: [StateMachine, ...StateMachine[]]
          Next: string
      }

export interface Parameters {
    Bucket?: string | undefined
    Key?: string | undefined
    Prefix?: string | undefined
}

export type PassState =
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          Type: 'Pass'
          Result?: unknown
          End: boolean
      }
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          Type: 'Pass'
          Result?: unknown
          Next: string
      }

export interface ProcessConfig {
    Mode: string
    ExecutionType: string
}

export interface ReaderConfig {
    InputType?: string | undefined
    CSVHeaderLocation?: string | undefined
    CSVHeaders?: [string, ...string[]] | undefined
    MaxItems?: number | undefined
}

export type State = TaskState | ParallelState | MapState | PassState | WaitState | ChoiceState | SucceedState | FailState

export interface StateMachine {
    Comment?: string | undefined
    StartAt: string
    States: {
        [k: string]: State | undefined
    }
    TimeoutSeconds?: number | undefined
}

export const StateMachine = {
    validate: StateMachineValidator as ValidateFunction<StateMachine>,
    get schema() {
        return StateMachine.validate.schema
    },
    get errors() {
        return StateMachine.validate.errors ?? undefined
    },
    is: (o: unknown): o is StateMachine => StateMachine.validate(o) === true,
    parse: (o: unknown): { right: StateMachine } | { left: DefinedError[] } => {
        if (StateMachine.is(o)) {
            return { right: o }
        }
        return { left: (StateMachine.errors ?? []) as DefinedError[] }
    },
} as const

export interface SucceedState {
    Comment?: string | undefined
    InputPath?: string | undefined
    OutputPath?: string | undefined
    Type: 'Succeed'
}

export type TaskState =
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]] | undefined
          Catch?: [CatchOptions, ...CatchOptions[]] | undefined
          Type: 'Task'
          Resource: string
          TimeoutSeconds?: number | undefined
          HeartbeatSeconds?: number | undefined
          TimeoutSecondsPath?: string | undefined
          HeartbeatSecondsPath?: string | undefined
          End: boolean
      }
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          ResultPath?: string | undefined
          Parameters?: unknown
          ResultSelector?: unknown
          Retry?: [RetryOptions, ...RetryOptions[]] | undefined
          Catch?: [CatchOptions, ...CatchOptions[]] | undefined
          Type: 'Task'
          Resource: string
          TimeoutSeconds?: number | undefined
          HeartbeatSeconds?: number | undefined
          TimeoutSecondsPath?: string | undefined
          HeartbeatSecondsPath?: string | undefined
          Next: string
      }

export type WaitState =
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          Type: 'Wait'
          End: boolean
      }
    | {
          Comment?: string | undefined
          InputPath?: string | undefined
          OutputPath?: string | undefined
          Type: 'Wait'
          Next: string
      }
