import tip from '@/ai/gptPrompts'
import Select from '@/ai/select'
import ai from '@/sdk/ai'
import loadConf from '@/config'
import { serviceT } from '@/types'
import { parser } from '@/ai/parser'

interface cmdErrHandlerT {
  res: string
  err: string
}

const { config } = loadConf()

export async function cmdErrHandler({ res, err }: cmdErrHandlerT) {
  const model = config.model
  const service = config.service

  const { error, msg } = await ai({
    prompt: `${tip.error}. What the usar ran: ${res}. The error message: ${err}.`,
    model: model,
    service: service as serviceT,
  })

  if (!!error) {
    console.log('error', error)
    return
  }

  const opts = parser.cmd(msg)
  return opts
}
