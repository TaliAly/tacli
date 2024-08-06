import { argv, exit } from 'process'
import { Command } from 'commander'
import term from '@/terminal'
import { Flags } from '@/flags/flags'

const program = new Command()
program.version('1.0.0').description('a funny warp-like copycat')

program
  .command('config')
  .option(
    '-r, --rewrite <key>',
    `change the value of the keys:
        [keys]
        [model]`,
  )
  .argument('<value>')
  .description('change the value of the config')
  .action((str, option) => {
    Flags.config({
      input: str,
      options: option.rewrite,
    })
  })

async function main() {
  if (!argv[2]) {
    let val: string | undefined = ''
    while (true) {
      if (!!val) {
        const ans = await term(val)
        val = !!ans ? ans : undefined
        continue
      }
      const ans = await term()
      val = !!ans ? ans : undefined
    }
  }
  program.parse(argv)
}

main()
