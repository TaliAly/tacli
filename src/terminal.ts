import Select from './ai/select'
import { cmdErrHandler } from 'utils/cmdErrHandler'
import { execSync } from 'node:child_process'
import { exit } from 'process'
import prompt from './cmd/prompt'
import readline from 'readline'
import cmd from './cmd'

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export default async function term(
  defaultCommand?: string,
): Promise<string | undefined> {
  const { question } = prompt({
    reader: reader,
    defaultOpt: defaultCommand,
  })
  const res = await question
  console.log('freeze')

  if (res == 'quit' || res == 'exit') {
    exit(0)
  }

  if (res == '' || res == undefined || res == '\n') {
    return undefined
  }

  // the cmd will read the passed command
  // if it doesn't find anything, it won't
  // pass an output (null)
  // Why? because there aren't commands on the system
  // that we need to run
  const { answer } = await cmd(res!)
  if (!!answer) {
    return answer
  }

  try {
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
  } catch (err) {
    const ans = await cmdErrHandler({
      res: res,
      err: err as string,
    })
    return ans
  }

  return undefined
}
