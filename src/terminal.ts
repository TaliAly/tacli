import { exit } from 'process'
import readline from 'node:readline'
import { execSync } from 'child_process'

import ai from '@/sdk/ai'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export default async function term() {
  const promise = new Promise((res) => {
    rl.question('\n> ', (answer) => {
      res(answer)
    })
  })

  const res = await promise

  switch (res) {
    case 'quit':
    case 'exit':
      rl.close()
      exit(0)
    case 'ai':
      await ai({
        prompt: 'hi',
        model: 'ollama', // change it for a laugh
      })
      break
    default:
      execSync(String(res), {
        stdio: [0, 1, 2],
      })
      break
  }

  term()
}
