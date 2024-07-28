const parsers = {
  select: function (input: string) {
    const regex = /`{1,3}((?:\\.|[^`])*)`{1,3}/g
    const matches = input.match(regex)

    if (!matches) return []

    return matches.map((match: string) => {
      const res = match.replace(/^`+|`+$/g, '')
      return {
        text: res,
        description: '',
      }
    })
  },
}

interface parserType {
  input: string
  type: 'cmd' | 'select'
}

export default function parser({ input, type }: parserType) {
  return parsers[type](input)
}
