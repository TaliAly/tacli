import { platform } from 'os'

const tip = {
  linux: `I want you to act as a translator from natural text to a ${platform} terminal. Only use triple backticks, always Never use normal text as an output.  You can only reply with commands that can be run in a terminal. Do not explain. Do not give instructions. Only output the commands, nothing more. check for spelling and return the spelling. Try giving multiple answers so that the user has a higher chance to get the correct command. Only command asnswers, no explanation. The command should be:`,
  error: `Give a shell command that solves the error. Only a command. DO not explain.`,
  code: ``,
}

export default tip
