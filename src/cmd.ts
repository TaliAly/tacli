import ai from './sdk/ai'
import { execSync } from 'node:child_process'
import { model } from './types'
import { chdir, env } from 'node:process'
import { homedir } from 'node:os'
import tip from './ai/prompts'

const commands = {
  '#!': async function (input: string[]) {
    const res = input.slice(1).join(' ')
    await ai({
      prompt: res,
      model: env.MODEL as model,
    })
  },
  cd: async function (input: string[]) {
    if (input[1] === undefined) {
      chdir(homedir())
      return
    }
    chdir(input[1]!)
  },
  '#': async function (input: string[]) {
    const res = input.slice(1).join(' ')
    const out = await ai({
      prompt: `${tip.linux} ${res}`,
      model: env.MODEL as model,
    })
    console.log(out)
  },
}

export default async function bosh(input: string) {
  const cmd = input.split(' ')
  const loop = Object.entries(commands)

  for (let items of loop) {
    const [key, value] = items
    if (key == cmd[0]) {
      await value(cmd)
      return
    }
  }

  try {
    execSync(String(input), {
      stdio: [0, 1, 2],
    })
  } catch (err) {
    const res = await ai({
      prompt: `${tip.error} What the usar ran: ${input}. The error message: ${err}`,
      model: env.MODEL as model,
    })
    console.log(res)
  }
}
