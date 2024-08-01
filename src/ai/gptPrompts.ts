import { platform } from 'os'

const tip = {
  linux: `I want you to act as a translator from natural text to a ${platform} terminal. You can only reply with commands that can be run in a terminal. Do not explain. Do not give instructions. Only output the command, nothing more. The command is:`,
  error: `Give a shell command for ${platform} that solves the error. Only a command. DO not explain.`,
  code: ``,
}

export default tip
