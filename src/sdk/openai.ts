import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { env } from 'process'

const openai = createOpenAI({
  apiKey: env.OPENAI_API_KEY,
})

export default async function openAI(input: string) {
  if (!env.OPENAI_API_KEY) {
    return 'no Openai key provided'
  }
  try {
    const { text } = await generateText({
      model: openai('gpt-4-turbo'),
      prompt: input,
    })
    return text
  } catch (err) {
    console.log(err)
    return null
  }
}
