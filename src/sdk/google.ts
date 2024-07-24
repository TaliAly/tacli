import dotenv from 'dotenv'
import { generateText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { env } from 'process'

dotenv.config()

const google = createGoogleGenerativeAI({
  apiKey: env.GOOGLE_API_KEY,
})

export default async function Google(prompt: string) {
  try {
    const model = google('models/gemini-1.5-pro-latest')
    const { text } = await generateText({
      model,
      prompt,
    })

    return text
  } catch (err) {
    console.error(err)
    return null
  }
}
