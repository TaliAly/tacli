import dotenv from 'dotenv'

import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'
import { AiProps } from '@/types'

dotenv.config()

export default async function ai({ prompt, model }: AiProps) {
  const models = {
    google: Google,
    ollama: Ollama,
  }
  models[model](prompt)
}
