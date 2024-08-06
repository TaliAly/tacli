import { cwd } from 'process'
import { ReadLine } from 'readline'

interface promptProps {
  reader: ReadLine
  defaultOpt: string | undefined
}

export default function prompt({ reader, defaultOpt }: promptProps): {
  question: Promise<string>
} {
  const path = cwd().split('/').slice(-2).join('/')

  // reader.prompt is not used because then the path wouldn't
  // update with it! (also because we're short on time)
  return {
    question: new Promise((res) => {
      reader.question(`${path} ~> `, res)
      if (!!defaultOpt) {
        reader.write(defaultOpt)
      }
    }),
  }
}
