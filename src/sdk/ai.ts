import dotenv from 'dotenv'

import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'
import { AiProps, model } from '@/types'

dotenv.config()

export default async function ai({ prompt, model }: AiProps) {
  const choose = model.replaceAll(`'`, '') as model
  const models = {
    google: Google,
    ollama: Ollama,
  }
  models[choose](prompt)
}
