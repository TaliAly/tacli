import dotenv from 'dotenv'
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { env } from 'process'
import { serviceAi } from '@/types'

dotenv.config()

const google = createGoogleGenerativeAI({
  apiKey: env.google_key,
})

export default async function Google({ prompt, model }: serviceAi) {
  try {
    const { text } = await generateText({
      model: google(model),
      prompt,
    })

    return text
  } catch (err) {
    console.error(err)
    return null
  }
}
