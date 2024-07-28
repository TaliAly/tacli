import { argv, env, exit } from 'process'
import { Command } from 'commander'
import loadConf from '@/config'
import { model } from '@/types'
import term from '@/terminal'
import ai from '@/sdk/ai'

const program = new Command()
program.version('1.0.0').description('a funny warp-like copycat')

async function askAI(input: string) {
  const text = await ai({
    service: env.service as model,
    model: env.google_model!,
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
  loadConf()
  if (!argv[2]) {
    term()
    return
  }
  program.parse(argv)
}

main()
