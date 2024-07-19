import dotenv from 'dotenv'
import Ollama from '@/sdk/ollama'
import Google from '@/sdk/google'
import { AiProps } from '@/types'
import term, { prompt as terminalPrompt } from '../terminal'
import bosh from '@/cmd'

dotenv.config()

export default async function ai({ prompt, model }: AiProps) {
  const models = {
    google: Google,
    ollama: Ollama,
  }

  if (!models[model]) {
    throw new Error(`Model ${model} is not supported`)
  }

  // Ejecuta el modelo seleccionado con el prompt proporcionado
  await models[model](prompt)

  // Solicita al usuario que ingrese un nuevo prompt
  const res = await terminalPrompt()
  bosh(res)
  term()
}
