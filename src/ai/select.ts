import chalk from 'chalk'
import parser from './parser'
import { createSelection } from 'bun-promptx'

export default async function Select(input: string): Promise<string> {
  const options = await parser({
    input: input,
    type: 'select',
  })

  if (options.length == 1) return options[0]

  const { error, selectedIndex } = createSelection(options)

  if (!!error) return ''

  return options[selectedIndex].text
}
