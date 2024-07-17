import { execSync } from 'child_process'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export default function term() {
  const promise = new Promise((res) => {
    rl.question('\n> ', (answer) => {
      res(answer)
    })
  })

  promise.then((res) => {
    if (res == 'quit' || res == 'exit') {
      rl.close()
      return
    }
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
    term()
  })
}