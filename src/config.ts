import { cwd } from 'process'
import config from './../tacli.json'
import Bun from 'bun'
import { serviceT } from './types'

export async function checkConf() {
  const path = `${cwd()}/tacli.json`
  const exists = Bun.file(path).exists()
  if (!(await exists)) {
  }
}

interface setConfT {
  key: string
  value: string
}

export function setConf({ key, value }: setConfT) {
  const file = JSON.stringify(config)
  if (!file.includes(key)) {
    console.log(`key ${key} wasn't found`)
    return ''
  }

  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`("${escapedKey}":)([^,}]+)`)

  const content = file.replace(regex, `"${key}":"${value}"`)
  Bun.write('./tacli.json', content)
  console.log(`changed ${key} to ${value}`)
}

export default function loadConf() {
  const { service, keys, model, ollama_model, openai_model } = config
  return {
    config: {
      service: !!service ? (service as serviceT) : 'openai',
      keys: !!keys ? keys : null,
      model: !!model ? model : 'gpt-4-turbo',
      ollama: !!ollama_model ? ollama_model : 'phi3:mini',
      openai: !!openai_model ? openai_model : 'gpt-4-turbo',
    },
  }
}
