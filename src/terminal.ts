import Select from './ai/select'
import { execSync } from 'node:child_process'
import { exit } from 'process'
import cmd from './cmd'
import prompt from './cmd/prompt'
import readline from 'node:readline'
import { cmdErrHandler } from 'utils/cmdErrHandler'
import { stderr } from 'node:process'

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export default async function term(defaultCommand?: string): Promise<void> {
  const { question } = prompt({
    defaultPrompt: defaultCommand!,
    reader: reader,
  })
  // reset default command
  defaultCommand = ''
  const res: string = await question

  if (res == 'quit' || res == 'exit') {
    reader.close()
    exit(0)
  }

  // the cmd will read the passed command
  // if it doesn't find anything, it won't
  // pass an output (null)
  const { answer } = await cmd(res)
  if (!!answer) {
    const { msg } = await Select(answer!)
    defaultCommand = msg
  }

  try {
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
  } catch (err) {
    const ans = await cmdErrHandler({ res, err: stderr.toString() })
    defaultCommand = ans
  }
  term(defaultCommand)
}
