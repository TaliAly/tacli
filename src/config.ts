import config from './../tacli.json'

export default function loadConf() {
  return {
    service: config.service,
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
