import ai from './sdk/ai'
import { model } from './types'
import { chdir, env } from 'node:process'
import { homedir } from 'node:os'
import tip from './ai/prompts'
import { error } from 'node:console'

const commands = {
  '#!': async function (input: string) {
    const out = await ai({
      prompt: input,
      model: env.ollama_model!,
      service: env.service as model,
    })
    return out
  },
  cd: async function (input: string) {
    if (input[1] === undefined) {
      chdir(homedir())
      return
    }
    chdir(input[1]!)
    return null
  },
  '#': async function (input: string) {
    const out = await ai({
      prompt: `${tip.linux} ${input}`,
      model: env.ollama_model!,
      service: env.service as model,
    })
    return out
  },
}

export default async function cmd(input: string) {
  const args = input.split(' ')
  const com = args.slice(1).join(' ')
  const loop = Object.entries(commands)

  for (let items of loop) {
    const [key, value] = items
    if (key == args[0]) {
      const ans = await value(com)
      return {
        error: null,
        answer: ans,
      }
    }
  }
  return {
    error: true,
    answer: 'no service was contacted',
  }
}
