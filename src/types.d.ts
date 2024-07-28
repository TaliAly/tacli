export type model = 'ollama' | 'google' | 'openai'

interface serviceAi {
  prompt: string
  model: string
}

interface handlerAi extends serviceAi {
  service: model
}
