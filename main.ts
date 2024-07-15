import { execSync } from 'child_process'
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function main() {
  prompt()
}
main()

function prompt() {
  const promise = new Promise((res) => {
    rl.question('\n> ', (answer) => {
      res(answer)
    })
  })

  promise.then((res) => {
    if (res == 'quit') {
      rl.close()
      return
    }
    execSync(String(res), {
      stdio: [0, 1, 2],
    })
    prompt()
  })
}
