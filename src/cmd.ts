import ai from './sdk/ai'
import { execSync } from 'node:child_process'
import { model } from './types'
import { chdir, env } from 'node:process'
import { homedir } from 'node:os'
import tip from './ai/prompts'
import { prompt } from './terminal'

const commands = {
  '#!': async function (input: string[]) {
    const res = input.slice(1).join(' ')
    await ai({
      prompt: res,
      model: env.model as model,
    })
  },
  cd: async function (input: string[]) {
    if (input[0] == undefined) {
      chdir(homedir())
    }
    chdir(input[1]!)
  },
  '#': async function (input: string[]) {
    const res = input.slice(1).join(' ')
    console.log(`DEBUG REASON
${tip.linux} ${res}
`)
    const out = await ai({
      prompt: `${tip.linux} ${res}`,
      model: env.model as model,
    })
    console.log(out)
  },
}

export default async function bosh(res: string) {
  const cmd = res.split(' ')
  const loop = Object.entries(commands)

  for (let items of loop) {
    const [key, value] = items
    if (key == cmd[0]) {
      await value(cmd)
      return
    }
  }

  try {
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
  } catch (err) {
    const res = await ai({
      prompt: `explain why error message appeared and give a suggestion on what the user needs to run to solve the problem. Error message: ${err}`,
      model: env.model as model,
    })
    console.log(res)
  }
}
