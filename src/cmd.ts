import ai from './sdk/ai'
import { model } from './types'
import { chdir, env } from 'node:process'
import { homedir } from 'node:os'
import tip from './ai/prompts'
import { error } from 'node:console'
import { parser } from './ai/parser'

const commands = {
  '#!': async function (input: string) {
    const { error, msg } = await ai({
      prompt: input,
      model: env.service_model!,
      service: env.service as model,
    })
    if (!!error) throw error
    return {
      error: false,
      answer: msg,
    }
  },
  cd: async function (input: string) {
    if (input[1] === undefined) {
      chdir(homedir())
      return
    }
    chdir(input[1]!)

    return {
      error: false,
      answer: null,
    }
  },
  '#': async function (input: string) {
    const { error, msg } = await ai({
      prompt: `${tip.linux} ${input}`,
      model: env.service_model!,
      service: env.service as model,
    })
    if (!!error) throw error
    return {
      error: false,
      answer: msg,
    }
  },
}

export default async function cmd(input: string) {
  const args = input.split(' ')
  const com = args.slice(1).join(' ')
  const loop = Object.entries(commands)

  for (let items of loop) {
    const [key, value] = items
    if (key == args[0]) {
      const { answer, error } = await value(com)
      if (!!error)
        return {
          error: true,
          answer: null,
        }

      return {
        error: false,
        answer: parser.select(answer)[0]?.text,
      }
    }
  }
  return {
    error: false,
    answer: null,
  }
}
