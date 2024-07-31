import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { env } from 'process'
import { AiServiceR, AiServiceT } from '@/types'

const openai = createOpenAI({
  apiKey: env.openai_model,
})

export default async function Openai({
  prompt,
  model,
}: AiServiceT): Promise<AiServiceR> {
  if (!env.OPENAI_API_KEY) {
    return {
      error: true,
      msg: 'no Openai key provided',
    }
  }
  try {
    const { text } = await generateText({
      model: openai(model),
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
