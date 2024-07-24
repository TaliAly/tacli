import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'
import { AiProps } from '@/types'
import openAI from './openai'

export default async function ai({ prompt, model }: AiProps) {
  const models = {
    google: Google,
    ollama: Ollama,
    openai: openAI,
  }

  const output = await models[model](prompt)
  return output
}
