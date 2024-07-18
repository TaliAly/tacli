import { generateText } from 'ai'
import { createOllama } from 'ollama-ai-provider'

const llama = createOllama()
const model = llama.languageModel('phi3:mini')

export default async function Ollama(input: string) {
  const { text } = await generateText({
    model: model,
    prompt: input,
  })

  console.log(text)
}
