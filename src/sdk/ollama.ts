import { serviceAi } from '@/types'
import { generateText } from 'ai'
import { createOllama } from 'ollama-ai-provider'
import { env } from 'process'

const llama = createOllama()

export default async function Ollama({ model, prompt }: serviceAi) {
  const fallback_model = !!env.ollama_model ? env.ollama_model : model
  const mod = llama.languageModel(fallback_model)
  try {
    const { text } = await generateText({
      model: mod,
      prompt: prompt,
    })
    return text
  } catch (err) {
    console.log(err)
    return null
  }
}
