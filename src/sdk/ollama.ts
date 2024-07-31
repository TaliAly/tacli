import { AiServiceR, AiServiceT } from '@/types'
import { generateText } from 'ai'
import { createOllama } from 'ollama-ai-provider'
import { env } from 'process'

const llama = createOllama()

export default async function Ollama({
  model,
  prompt,
}: AiServiceT): Promise<AiServiceR> {
  const fallback_model = !!env.ollama_model ? env.ollama_model : model
  const mod = llama.languageModel(fallback_model)
  try {
    const { text } = await generateText({
      model: mod,
      prompt: prompt,
    })
    return {
      error: false,
      msg: text,
    }
  } catch (err) {
    return {
      error: true,
      msg: "the AI wasn't able to call",
    }
  }
}
