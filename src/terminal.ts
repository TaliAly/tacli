import { env, exit } from 'process'
import readline from 'node:readline'
import { execSync } from 'child_process'

import ai from '@/sdk/ai'
import { model } from './types'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve))
}

export default async function term(): Promise<void> {
  const promise: Promise<string> = new Promise((res) => {
    rl.question('~> ', (answer) => {
      res(answer)
    })
  })

  const res: String = await promise

  switch (res) {
    case 'quit':
    case 'exit':
      rl.close()
      exit(0)
    case 'ai':
      const prompt = await askQuestion('Enter your question for the AI: ')
      if (prompt === 'exit') {
        console.log('Exiting...')
      } else {
        await ai({
          prompt: prompt,
          model: env.model as model, // Change this according to the model you want to use
        })
      }
      break
    default:
      execSync(String(res), {
        stdio: [0, 1, 2],
      })
      break
  }
  term()
}
