import { parser } from './parser'
import { createSelection } from 'bun-promptx'

type SelectT = {
  error: boolean
  msg: string
}

export default async function Select(input: string): Promise<SelectT> {
  const options = parser.select(input)
  console.log(options)

  if (!options)
    return {
      error: true,
      msg: "Sorry... I don't know which command",
    }

  console.log(options.length)

  if (options.length == 1)
    return {
      error: false,
      msg: options[0]?.text!,
    }

  const { error, selectedIndex } = createSelection(options)

  if (!!error)
    return {
      error: true,
      msg: '',
    }

  return {
    error: false,
    msg: options[selectedIndex].text,
  }
}
