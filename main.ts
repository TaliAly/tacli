import { argv, exit } from 'process'
import { Command } from 'commander'
import term from '@/terminal'
import { Flags } from '@/flags/flags'

const program = new Command()
program.version('1.0.0').description('a funny warp-like copycat')

program
  .option(
    '-c, --code <prompt>',
    'Pass a custom config for the terminal when working with different AI and projects',
    (input: string) => {
      const opts = argv.slice(3, argv.length).join(' ')
      Flags.code(opts)
    },
  )
  .option(
    '-s, --shell <prompt>',
    'Ask the AI a shell command in natural language and get back the output withing your clipboard',
    Flags.shell,
  )
  .option(
    '-a, --ask <prompt>',
    'Use the GPT capabilities of the AI to ask about anything',
    Flags.ask,
  )

function main() {
  if (!argv[2]) {
    term()
    return
  }
  program.parse(argv)
  exit(0)
}

main()
