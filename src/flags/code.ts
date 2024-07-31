import { parser } from '@/ai/parser'
import ai from '@/sdk/ai'

import { AiT } from '@/types'

export default async function Code({
  model,
  prompt,
  service,
}: AiT): Promise<string> {
  const { msg, error } = await ai({
    prompt: prompt,
    model: model,
    service: service,
  })
  if (error) throw msg
  return parser.cmd(msg)
}
