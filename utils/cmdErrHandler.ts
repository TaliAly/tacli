import tip from '@/ai/gptPrompts'
import Select from '@/ai/select'
import { stderr } from 'process'
import getOs from './os'
import ai from '@/sdk/ai'
import loadConf from '@/config'

interface cmdErrHandlerT {
  res: string
  err: string
}

const { model, service } = loadConf()

export async function cmdErrHandler({ res, err }: cmdErrHandlerT) {
  const { error, msg } = await ai({
    prompt: `${tip.error}. What the usar ran: ${res}. The error message: ${err}.`,
    model: model!,
    service: service,
  })
  if (!!error) {
    console.log(error)
    return
  }

  const ans = await Select(msg!)
  return ans.msg
}
