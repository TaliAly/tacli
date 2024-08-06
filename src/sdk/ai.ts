import Ollama from '@/sdk/ollama'
import OpenAI from './openai'
import { AiServiceR, AiT } from '@/types'
import { Spinner } from '@topcli/spinner'

export default async function ai({
  prompt,
  model,
  service,
}: AiT): Promise<AiServiceR> {
  const services = {
    ollama: Ollama,
    openai: OpenAI,
  }
  const spinner = new Spinner().start('asking the ai')

  const { msg, error } = await services[service]({
    model: model,
    prompt: prompt,
  })
  spinner.succeed('done!')

  return {
    msg: msg,
    error: error,
  }
}
