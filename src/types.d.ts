export type serviceT = 'ollama' | 'google' | 'openai'

export interface AiServiceT {
  prompt: string
  model: string
}

export interface AiT extends AiServiceT {
  service: serviceT
}

export interface AiServiceR {
  msg: string
  error: boolean
}
