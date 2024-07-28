import { execSync } from 'node:child_process'
import { exit } from 'process'
import cmd from './cmd'
import prompt from './cmd/prompt'
import ai from './sdk/ai'
import tip from './ai/prompts'
import getOs from 'utils/os'
import { model } from './types'
import { stderr } from 'node:process'
import readline from 'node:readline'
import Select from './ai/select'

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export default async function term(defaultCommand?: string): Promise<void> {
  const { question } = prompt({
    defaultPrompt: defaultCommand!,
    reader: reader,
  })
  const res: string = await question

  if (res == 'quit' || res == 'exit') {
    reader.close()
    exit(0)
  }

  await cmd(res)

  try {
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
  } catch (err) {
    const out = await ai({
      prompt: `${tip.error} What the usar ran: ${res}. The error message: ${stderr.toString()}. And the system is: ${getOs()}`,
      model: process.env.ollama_model!,
      service: process.env.service as model,
    })
    const ans = await Select(out!)
    defaultCommand = ans
  }
  term(defaultCommand)
}
