import { ollama } from 'ollama-ai-provider'
import { createOllama } from 'ollama-ai-provider'
import { generateText } from 'ai'

const llama = createOllama()

export default async function Ollama(input: string) {
  const model = llama.languageModel('phi3:mini')
  const { text } = await generateText({
    model: model,
    prompt: input,
  })
  console.log(text)
}
