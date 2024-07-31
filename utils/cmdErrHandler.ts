import tip from '@/ai/prompts'
import Select from '@/ai/select'
import { stderr } from 'process'
import getOs from './os'
import { serviceT } from '@/types'
import ai from '@/sdk/ai'

interface cmdErrHandlerT {
  res: string
}

export async function cmdErrHandler({ res }: cmdErrHandlerT) {
  const { error, msg } = await ai({
    prompt: `${tip.error}. What the usar ran: ${res}. The error message: ${stderr.toString()}. And the system is: ${getOs()}`,
    model: process.env.google_model!,
    service: process.env.service as serviceT,
  })
  if (error) {
    console.log(error)
    return
  }

  const ans = await Select(msg!)
  return ans
}
