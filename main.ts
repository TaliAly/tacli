import { argv, env, exit } from 'process'
import { Command } from 'commander'
import loadConf from '@/config'
import term from '@/terminal'
import Code from '@/flags/code'

const program = new Command()
program.version('1.0.0').description('a funny warp-like copycat')

program
  .option(
    '-a',
    '--ask',
    'Use the GPT capabilities of the AI to ask about anything',
  )
  .option(
    '-c',
    '--code',
    'Pass a custom config for the terminal when working with different AI and projects',
  )
  .option(
    '-s',
    '--shell',
    'Ask the AI a shell command in natural language and get back the output withing your clipboard',
  )

function main() {
  loadConf()
  if (!argv[2]) {
    term()
    return
  }
  program.parse(argv)
}

main()
