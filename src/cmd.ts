import ai from './sdk/ai'
import { execSync } from 'node:child_process'
import { prompt } from './terminal'
import { model } from './types'
import { chdir, env } from 'node:process'
import { homedir } from 'node:os'

const commands = {
  ai: async function () {
    const input = await prompt('Ask: ')
    if (!(input === 'exit')) {
      await ai({
        prompt: input,
        model: env.model as model,
      })
    }
  },
  cd: function (dir: string) {
    if (dir == undefined) {
      try {
        chdir(homedir())
      } catch (err) {
        console.error(err)
      }
    }
    chdir(dir[1]!)
  },
}

export default async function bosh(res: string) {
  const cmd = res.split(' ')
  const loop = Object.entries(commands)

  for (let items of loop) {
    const [key, value] = items
    if (key == res) {
      value(cmd[1]!)
      return
    }
  }

  try {
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
  } catch {
    console.log('hi')
  }
}
