import loadConf, { setConf } from '@/config'
import { parser } from '@/ai/parser'
import ai from '@/sdk/ai'
import { argv0, exit } from 'process'

interface AskT {
  input: string
  options: {
    shell: boolean
    code: boolean
  }
}
async function Ask({ input, options }: AskT): Promise<boolean> {
  const { config } = loadConf()
  const { msg, error } = await ai({
    prompt: input,
    model: config.model,
    service: config.service,
  })
  if (!!error) throw msg
  console.log(parser.cmd(msg).text)
  return false
}

interface configT {
  input: string
  options: string
}
function config({ input, options }: configT) {
  const { config } = loadConf()
  if (!options) {
    const ans = config[input]
    !!ans ? console.log(ans) : console.log(`not a real key`)
    exit(0)
  }

  setConf({
    value: input,
    key: options,
  })
  exit(0)
}

export const Flags = {
  config: config,
  ask: Ask,
}
