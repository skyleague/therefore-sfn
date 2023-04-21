import { listLambdaArns } from './list-lambda-arns.js'

import { templateLambdaArn } from '../../lib/index.js'
import type { StateMachine } from '../../types/index.js'

import { expect, it } from 'vitest'

it('list-nested-lambda-arns', () => {
    const definition: StateMachine = {
        StartAt: 'Entry',
        States: {
            Entry: {
                Type: 'Task',
                Resource: templateLambdaArn({ name: 'entry' }),
                Next: 'SomeChoice',
            },
            SomeChoice: {
                Type: 'Choice',
                Choices: [
                    {
                        Variable: '$.foo',
                        NumericEquals: 1,
                        Next: 'Option1',
                    },
                ],
                Default: 'EnterParallel',
            },
            Option1: {
                Type: 'Task',
                Resource: templateLambdaArn({ name: 'option-1' }),
                End: true,
            },
            EnterParallel: {
                Type: 'Parallel',
                Branches: [
                    {
                        StartAt: 'Entry1',
                        States: {
                            Entry1: {
                                Type: 'Task',
                                Resource: templateLambdaArn({ name: 'entry-1' }),
                                End: true,
                            },
                        },
                    },
                    {
                        StartAt: 'Entry2',
                        States: {
                            Entry2: {
                                Type: 'Task',
                                Resource: templateLambdaArn({ name: 'entry-2' }),
                                End: true,
                            },
                        },
                    },
                ],
                Next: 'Done',
            },
            Done: {
                Type: 'Succeed',
            },
        },
    }
    expect(listLambdaArns(definition)).toMatchInlineSnapshot(`
        [
          "arn:aws:lambda:\${aws_region}:\${aws_account_id}:function:entry",
          "arn:aws:lambda:\${aws_region}:\${aws_account_id}:function:option-1",
          "arn:aws:lambda:\${aws_region}:\${aws_account_id}:function:entry-1",
          "arn:aws:lambda:\${aws_region}:\${aws_account_id}:function:entry-2",
        ]
    `)
})
