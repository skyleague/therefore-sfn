import type { StateMachine } from './sfn.type'

export { ChoiceState } from './choice.type'
export { FailState, MapState, ParallelState, PassState, StateMachine, SucceedState, TaskState, WaitState } from './sfn.type'

export type SafeStateMachine<States extends StateMachine['States']> = Omit<StateMachine, 'StartAt' | 'States'> & {
    States: States
    StartAt: keyof States
}
