import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai'
import dotenv from 'dotenv'

dotenv.config()

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

export default async function Ia() {
  const prompt = 'hola mundo, esta es una prueba, funcioona?'

  try {
    const model = google('models/gemini-1.5-pro-latest')
    const { text } = await generateText({
      model,
      prompt,
    })

    console.log(text)
  } catch (error) {
    console.error(error)
  }
}
