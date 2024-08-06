export const parser = {
  select: function (input: string) {
    const noOut = ['']
    if (input == '') return noOut
    const regex = /`{1,3}((?:\\.|[^`])*)`{1,3}/g
    const matches = input.match(regex)

    if (!matches) {
      const res = input.split(`\n`)
      return res.map((match: string) => {
        const res = match
          .replace(/^`+|`+$/g, '')
          .replace(/^.*\n/, '')
          .trim()
        return {
          name: res,
          value: res,
        }
      })
    }

    return matches.map((match: string) => {
      const res = match
        .replace(/^`+|`+$/g, '')
        .replace(/^.*\n/, '')
        .trim()
      return {
        name: res,
        value: res,
      }
    })
  },
  cmd: function (input: string) {
    const regex = /`{1,3}((?:\\.|[^`])*)`{1,3}/g
    const matches = input.match(regex)

    if (!matches) {
      return input.split('\n')[1]
    }

    let res = matches![0].replace(/^`+|`+$/g, '')
    res.replace(/^.*\n/, '').trim()
    if (res.includes('bash')) return res.split('\n')[1]
    return res
  },
}
