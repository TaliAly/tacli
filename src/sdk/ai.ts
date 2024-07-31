import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'
import OpenAI from './openai'
import { AiServiceR, AiT } from '@/types'

export default async function ai({
  prompt,
  model,
  service,
}: AiT): Promise<AiServiceR> {
  const services = {
    google: Google,
    ollama: Ollama,
    openai: OpenAI,
  }

  const { msg, error } = await services[service]({
    model: model,
    prompt: prompt,
  })
  console.log(msg)
  return {
    msg: msg,
    error: error,
  }
}
