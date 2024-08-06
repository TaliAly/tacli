import { generateText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { AiServiceR, AiServiceT } from '@/types'
import loadConf from '@/config'

const { config } = loadConf()
const openai = () => {
  if (!!config.keys)
    return createOpenAI({
      apiKey: config.keys!,
    })
}
export default async function Openai({
  prompt,
  model,
}: AiServiceT): Promise<AiServiceR> {
  if (!config.keys) {
    return {
      error: true,
      msg: 'no Openai key provided',
    }
  }
  try {
    const { text } = await generateText({
      model: openai()!(model),
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
