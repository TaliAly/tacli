export interface AiProps {
  prompt: string
  model: model
}
export type model = 'ollama' | 'google'
