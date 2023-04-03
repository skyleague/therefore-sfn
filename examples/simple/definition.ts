import { templateLambdaArn, validateStateMachine } from '../../src/index.js'

export const definition = validateStateMachine({
    definition: {
        StartAt: 'Entry',
        States: {
            Entry: {
                Type: 'Task',
                Resource: templateLambdaArn({ name: 'entry' }),
                Next: 'ProcessData',
            },
            ProcessData: {
                Type: 'Task',
                Resource: templateLambdaArn({ name: 'process-data' }),
                Next: 'Done',
            },
            Done: {
                Type: 'Pass',
                End: true,
            },
        },
    },
})
