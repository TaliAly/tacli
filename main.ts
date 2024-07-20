import { argv } from 'process'
import { Command } from 'commander'

import term from '@/terminal'

const program = new Command()
program.version('1.0.0').description('a funny warp-like copycat')

function main() {
  if (!argv[2]) {
    term()
    return
  }
  program.parse(argv)
}

main()
