import dotenv from 'dotenv'

import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'

dotenv.config()

export default async function ai({ prompt, model }: AiProps) {
  const models = {
    gemini: Google,
    ollama: Ollama,
  }

  Object.entries(models).map((target) => {
    if (target[0] == model) {
      target[1](prompt)
    }
  })
}
