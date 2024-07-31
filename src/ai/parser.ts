export const parser = {
  select: function (input: string) {
    const noOut = [
      {
        text: '',
        description: '',
      },
    ]
    if (!!input) return noOut
    const regex = /`{1,3}((?:\\.|[^`])*)`{1,3}/g
    const matches = input.match(regex)

    if (!matches) return noOut

    return matches.map((match: string) => {
      const res = match.replace(/^`+|`+$/g, '')
      return {
        text: res,
        description: '',
      }
    })
  },
  cmd: function (input: string) {
    const regex = /`{1,3}((?:\\.|[^`])*)`{1,3}/g
    const matches = input.match(regex)

    if (!matches) return ''

    return matches[0]
  },
}
