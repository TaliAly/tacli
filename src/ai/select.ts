import { select } from '@inquirer/prompts'

type SelectT = {
  error: boolean
  msg: string
}

export default async function Select(
  options: { name: string; value: string }[],
): Promise<SelectT> {
  if (!options)
    return {
      error: true,
      msg: "Sorry... I don't know which command",
    }

  if (options.length == 1)
    return {
      error: false,
      msg: options[0]?.name!,
    }

  const answer = await select({
    message: 'I think you can use one of these:',
    choices: [...options],
  })
  return {
    error: false,
    msg: answer.toString()!,
  }
}
