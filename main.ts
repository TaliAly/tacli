import { execSync, spawnSync } from 'child_process'
import { Command } from 'commander'
import readline from 'node:readline'
import { argv } from 'process'

const program = new Command()
program
  .version('1.0.0')
  .description('a funny warp-like copycat')
  .option('-a, --ask', 'ask the AI about something', ask)

program.command('ask').description('ask the AI for help').action(ask)

program.parse(argv)

function ask() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  async function prompt() {
    const promise = new Promise((res) => {
      rl.question('\n> ', (answer) => {
        res(answer)
      })
    })

    const res = await promise

    if (res == 'quit' || res == 'exit') {
      rl.close()
      return
    }
    const process = execSync(String(res), {
      stdio: [0, 1, 2],
    })

    prompt()
  }
  prompt()
}
