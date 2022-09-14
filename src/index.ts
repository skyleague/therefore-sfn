import type { StateMachine } from './types'
export * from './types'
export * from './lib'

export type SafeStateMachine<States extends StateMachine['States']> = Omit<StateMachine, 'StartAt' | 'States'> & {
    States: States
    StartAt: keyof States
}
