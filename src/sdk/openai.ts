import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { env } from 'process'
import { serviceAi } from '@/types'

const openai = createOpenAI({
  apiKey: env.openai_model,
})

export default async function Openai({ prompt, model }: serviceAi) {
  if (!env.OPENAI_API_KEY) {
    return 'no Openai key provided'
  }
  try {
    const { text } = await generateText({
      model: openai(model),
      prompt: prompt,
    })
    return text
  } catch (err) {
    console.log(err)
    return null
  }
}
