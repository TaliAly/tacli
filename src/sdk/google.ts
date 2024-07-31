import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { env } from 'process'
import { AiServiceR, AiServiceT } from '@/types'

const google = createGoogleGenerativeAI({
  apiKey: env.google_key,
})

export default async function Google({
  prompt,
  model,
}: AiServiceT): Promise<AiServiceR> {
  try {
    const { text } = await generateText({
      model: google(model),
      prompt,
    })

    return {
      msg: text,
      error: false,
    }
  } catch (err) {
    return {
      error: true,
      msg: "the AI wasn't able to call",
    }
  }
}
