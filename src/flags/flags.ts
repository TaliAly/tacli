import loadConf from '@/config'
const { service, model } = loadConf()
import { parser } from '@/ai/parser'
import ai from '@/sdk/ai'
import tip from '@/ai/gptPrompts'

async function Ask(input: string): Promise<boolean> {
  const { msg, error } = await ai({
    prompt: input,
    model: model,
    service: service,
  })
  if (!!error) throw msg
  console.log(parser.cmd(msg).text)
  return false
}

export const Flags = {
  ask: async function (input: string) {
    console.log(input)
    return await Ask(input)
  },
  code: async function (input: string) {
    return await Ask(tip.code + input)
  },
  shell: async function (input: string) {
    return await Ask(tip.linux + input)
  },
}
