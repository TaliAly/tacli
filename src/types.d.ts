export type serviceT = 'ollama' | 'openai'

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

type gptModels =
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'gpt-4-turbo'
  | 'gpt-4'
  | 'gpt-3.5-tur'

export interface configFile {
  service: serviceT
  model: gptModels
  keys: string
  ollama_model: string
}
