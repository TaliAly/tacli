import { cwd, exit } from 'process'
import readline from 'node:readline'
import bosh from './cmd'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

interface promptType {
  defaultPrompt?: string
}

export async function prompt({ defaultPrompt }: promptType): Promise<string> {
  const path = cwd().split('/').slice(-2).join('/')

  return new Promise((resolve) => {
    // rl.prompt is not used because then the path wouldn't
    // update with it! (also because we're short on time)
    rl.question(`${path} ~> `, resolve)
    if (!!defaultPrompt) {
      rl.write(defaultPrompt)
    }
  })
}

export default async function term(): Promise<void> {
  const res = await prompt({
    defaultPrompt: undefined,
  })

  if (res == 'quit' || res == 'exit') {
    rl.close()
    exit(0)
  }

  await bosh(res)
  term()
}
