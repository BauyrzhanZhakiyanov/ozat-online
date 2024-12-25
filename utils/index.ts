class Utils {
  trimText(text: string) {
    if (!text.includes(' ')) {
      return text
    }
    return text.split(' ').filter(Boolean).join(' ')
  }
  numberize(number: string | number) {
    if (typeof number === 'string') {
      let result = number
      if (number.includes(',')) {
        result = result.split(',').join('.')
      }
      return Number(result)
    }
    return number
  }
  foundBy = (text: string, query: string) => {
    return this.trimText(text)
      .toLowerCase()
      .includes(this.trimText(query).toLowerCase())
  }
  prettyPrice(x: number) {
    return (
      Math.round(x)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'
    )
  }
  removeKeysFromObject<T>(
    object: T,
    keys: (keyof T)[] | Partial<Record<keyof T, boolean>>,
  ) {
    const obj = { ...object }
    if (Array.isArray(keys)) {
      keys.forEach((key) => {
        delete obj[key]
      })
    } else {
      Object.entries(keys).forEach(([key, value]) => {
        if (value) {
          delete obj[key as keyof T]
        }
      })
    }

    return obj
  }
}

export default new Utils()
