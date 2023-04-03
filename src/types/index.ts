import type { StateMachine } from './sfn.type.js'

export { ChoiceState } from './choice.type.js'
export { FailState, MapState, ParallelState, PassState, StateMachine, SucceedState, TaskState, WaitState } from './sfn.type.js'

export type SafeStateMachine<States extends StateMachine['States']> = Omit<StateMachine, 'StartAt' | 'States'> & {
    States: States
    StartAt: keyof States
}
