import { argv, env, exit } from 'process'
import { Command } from 'commander'

import term from '@/terminal'
import ai from '@/sdk/ai'
import { model } from '@/types'

const program = new Command()
program.version('1.0.0').description('a funny warp-like copycat')

async function askAI(input: string) {
  const text = await ai({
    model: env.MODEL as model,
    prompt: input,
  })
  console.log(text)
  return
}

program
  .command('ask')
  .description('immediatly ask the AI without accesing the terminal')
  .option('-c --cmd', 'ask for a terminal command instead of regular AI')
  .action(async function (input) {
    await askAI(input)
    exit(0)
  })

function main() {
  if (!argv[2]) {
    term()
    return
  }
  program.parse(argv)
}

main()
