import { StateMachineCompileInput } from './input.type'
import { listLambdaArns } from './list-lambda-arns'

import type { StateMachine } from '../../types'

import type { Argv } from 'yargs'

import path from 'path'

export function builder(yargs: Argv): Argv<StateMachineCompileInput> {
    return yargs
        .option('export', { default: 'definition', type: 'string' })
        .option('awsRegion', { type: 'string', alias: 'aws-region', demandOption: true })
        .option('awsAccountId', { type: 'string', alias: 'aws-account-id', demandOption: true })
        .positional('file', {
            type: 'string',
            demandOption: true,
        })
}

export async function handler(argv: ReturnType<typeof builder>['argv']): Promise<void> {
    const input = await argv
    StateMachineCompileInput.assert(input)

    let { file } = input
    if (!path.isAbsolute(file)) {
        // If the path is not an absolute path, attempt to resolve it relative to the working directory
        file = path.join(process.cwd(), file)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { [input.export]: definition } = await import(file)
    const lambdaArns = [...listLambdaArns(definition as StateMachine)].sort()
    console.log(
        JSON.stringify({
            definition: JSON.stringify(definition),
            lambda_arns: JSON.stringify(lambdaArns),
        })
            .replace(/\$\{aws_region\}/g, input.awsRegion)
            .replace(/\$\{aws_account_id\}/g, input.awsAccountId)
    )
}

export default {
    command: 'compile [file]',
    describe: 'start the service locally',
    builder,
    handler,
}
