import { execSync } from 'child_process'
import readline from 'node:readline'
import ai from './sdk/ai'
import { exit } from 'process'

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
      const prompt = await askQuestion('Introduce tu pregunta para la AI: ')
      if (prompt === 'exit') {
        console.log('Saliendo')
      } else {
        console.log(`Tu pregunta: ${prompt}`)
        ai({
          prompt: prompt,
          model: 'gemini', // Cambia esto según el modelo que desees usar
        })
        console.log(`Generando tu respuesta...`)
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
