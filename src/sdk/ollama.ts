import { generateText } from 'ai'
import { createOllama } from 'ollama-ai-provider'
import { env } from 'process'

const llama = createOllama()
const fallback_model = !!env.OLLAMA_MODEL ? env.OLLAMA_MODEL : 'phi3:mini'
const model = llama.languageModel(fallback_model)

export default async function Ollama(input: string) {
  try {
    const { text } = await generateText({
      model: model,
      prompt: input,
    })
    return text
  } catch (err) {
    console.log(err)
  }
}
