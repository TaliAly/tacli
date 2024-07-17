import dotenv from 'dotenv'
import Ollama from './ollama'
import Google from './google'

dotenv.config()

interface AiProps {
  prompt: string
  model: 'ollama' | 'gemini'
}

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
