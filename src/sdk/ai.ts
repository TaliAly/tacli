import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'
import OpenAI from './openai'
import { handlerAi } from '@/types'

export default async function ai({ prompt, model, service }: handlerAi) {
  const services = {
    google: Google,
    ollama: Ollama,
    openai: OpenAI,
  }

  const output = await services[service]({ prompt: prompt, model: model })
  return output
}
