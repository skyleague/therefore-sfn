import { StateMachineCompileInput } from './input.type.js'
import { listLambdaArns } from './list-lambda-arns.js'

import type { StateMachine } from '../../types/index.js'

import type { Argv } from 'yargs'

import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ValidationError } from 'ajv'

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
    const parsed = StateMachineCompileInput.parse(input)
    if ('left' in parsed) {
        throw new ValidationError(parsed.left)
    }

    let { file } = parsed.right
    if (!path.isAbsolute(file)) {
        // If the path is not an absolute path, attempt to resolve it relative to the working directory
        file = path.join(process.cwd(), file)
    }
    file = pathToFileURL(file).href

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { [parsed.right.export]: definition } = await import(file)
    const lambdaArns = [...listLambdaArns(definition as StateMachine)].sort()
    console.log(
        JSON.stringify({
            definition: JSON.stringify(definition),
            lambda_arns: JSON.stringify(lambdaArns),
        })
            .replace(/\$\{aws_region\}/g, parsed.right.awsRegion)
            .replace(/\$\{aws_account_id\}/g, parsed.right.awsAccountId),
    )
}

export default {
    command: 'compile [file]',
    describe: 'start the service locally',
    builder,
    handler,
}
