import { cwd, exit } from 'process'
import readline from 'node:readline'
import bosh from './cmd'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export async function prompt(query?: string): Promise<string> {
  const path = cwd().split('/').slice(-2).join('/')

  return new Promise((resolve) =>
    rl.question(!!query ? query! : `${path} ~> `, resolve),
  )
}

export default async function term(): Promise<void> {
  const res = await prompt()

  if (res == 'quit' || res == 'exit') {
    rl.close()
    exit(0)
  }

  bosh(res)
  term()
}
