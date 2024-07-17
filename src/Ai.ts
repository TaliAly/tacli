import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateText } from 'ai' // Assuming this is your custom function

// Replace with your actual Google API key (DO NOT SHARE THIS)
// const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY'

const google = createGoogleGenerativeAI({
  apiKey: 'AIzaSyDEG9kux3Yegx_3PmP_5jeLKsvc3BdY5ng',
})

export default async function Ia() {
  const prompt = 'hola mundo'

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
