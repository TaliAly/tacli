import { cwd } from 'process'
import { ReadLine } from 'readline'

interface promptRes {
  question: Promise<string>
}
interface promptProps {
  defaultPrompt: string
  reader: ReadLine
}

export default function prompt({
  reader,
  defaultPrompt,
}: promptProps): promptRes {
  const path = cwd().split('/').slice(-2).join('/')
  let response = ''

  // reader.prompt is not used because then the path wouldn't
  // update with it! (also because we're short on time)

  return {
    question: new Promise((res) => {
      reader.question(`${path} ~> `, res)
      if (!!defaultPrompt) {
        reader.write(defaultPrompt)
      }
    }),
  }
}
