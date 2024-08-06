import ai from './sdk/ai'
import { chdir } from 'node:process'
import { homedir } from 'node:os'
import tip from './ai/gptPrompts'
import { parser } from './ai/parser'
import loadConf from './config'

const { config } = loadConf()

const commands = {
  '#!': async function (input: string) {
    const { error, msg } = await ai({
      prompt: input,
      model: config.model,
      service: config.service,
    })
    console.log(msg)
    if (!!error) throw error
    return {
      error: false,
      answer: '',
    }
  },
  cd: async function (input: string) {
    if (input[1] === undefined) {
      chdir(homedir())
      return {
        error: false,
        answer: null,
      }
    }
    try {
      chdir(`./${input}`)
    } catch {
      console.log('no directory with that name')
      return {
        error: true,
        answer: null,
      }
    }

    return {
      error: false,
      answer: null,
    }
  },
  '#': async function (input: string) {
    const { error, msg } = await ai({
      prompt: `${tip.linux} ${input}`,
      model: config.model,
      service: config.service,
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
      const { answer } = await value(com)
      if (!answer)
        return {
          answer: null,
        }

      const ans = parser.cmd(answer!)
      return {
        answer: ans,
      }
    }
  }

  return {
    error: false,
    answer: null,
  }
}
