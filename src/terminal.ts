import { exit } from 'process'
import readline from 'node:readline'
import { execSync } from 'child_process'

import ai from '@/sdk/ai'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

async function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => rl.question(query, resolve))
}

export default async function term(): Promise<void> {
  const promise: Promise<string> = new Promise((res) => {
    rl.question('\n> ', (answer) => {
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
        ai({
          prompt: prompt,
          model: 'gemini', // Change this according to the model you want to use
        })
        console.log(`Generating your response...`)
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
