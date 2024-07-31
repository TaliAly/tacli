import Code from './code'
import loadConf from '@/config'

const { service } = loadConf()

export const Flags = {
  ask: function (input: string) {
    Code({
      service: service,
      model: model,
      prompt: input,
    })
  },
}
