import * as compile from './compile/index.js'

import packageJson from '../../package.json' assert { type: 'json' }

import { install } from 'source-map-support'
import type { CommandModule } from 'yargs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const { bin } = packageJson
const commands = { compile }

export async function run(): Promise<void> {
    install()

    let cli = yargs(hideBin(process.argv)).scriptName(Object.keys(bin)[0] ?? 'cli')
    for (const command of Object.values(commands)) {
        cli = cli.command(command.default as unknown as CommandModule)
    }

    await cli.demandCommand().strict().help().argv
}
