import config from './../tacli.json'
import { serviceT } from './types'

export default function loadConf() {
  return {
    service: config.service as serviceT,
    keys: {
      gemini: config.keys.gemini,
      openai: config.keys.openai,
    },
    model: config.model,
    defaults: {
      ollama: config.ollama_model,
      gemini: config.gemini_model,
      openai: config.openai_model,
    },
  }
}
