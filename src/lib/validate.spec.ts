import { templateLambdaArn } from './helpers.js'
import { validateStateMachine } from './validate.js'

import { expect, it } from 'vitest'

it('lambda retry injection', () => {
    expect(
        validateStateMachine({
            definition: {
                StartAt: 'Enter',
                States: {
                    Enter: {
                        Type: 'Pass',
                        Next: 'SomeLambda',
                    },

                    SomeLambda: {
                        Type: 'Task',
                        Resource: templateLambdaArn({ name: 'some-lambda' }),
                        Next: 'Exit',
                    },

                    Exit: {
                        Type: 'Succeed',
                    },
                },
            },
        }),
    ).toMatchInlineSnapshot(`
      {
        "StartAt": "Enter",
        "States": {
          "Enter": {
            "Next": "SomeLambda",
            "Type": "Pass",
          },
          "Exit": {
            "Type": "Succeed",
          },
          "SomeLambda": {
            "Next": "Exit",
            "Resource": "arn:aws:lambda:\${aws_region}:\${aws_account_id}:function:some-lambda",
            "Retry": [
              {
                "BackoffRate": 1.5,
                "ErrorEquals": [
                  "Lambda.ServiceException",
                  "Lambda.AWSLambdaException",
                  "Lambda.SdkClientException",
                ],
                "IntervalSeconds": 0.2,
                "JitterStrategy": "FULL",
                "MaxAttempts": 17,
              },
              {
                "BackoffRate": 1.5,
                "ErrorEquals": [
                  "Lambda.TooManyRequestsException",
                ],
                "IntervalSeconds": 2,
                "JitterStrategy": "FULL",
                "MaxAttempts": 13,
              },
            ],
            "Type": "Task",
          },
        },
      }
    `)
})
