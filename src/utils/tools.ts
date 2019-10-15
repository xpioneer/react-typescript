
export const object2Str = (o: string|object): string => {
  return typeof o === 'string' ? o : JSON.stringify(o)
}

export const storage = {
  get:  (key: string) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  },

  set:  (key: string, value: any): void => {
    if(value !== null && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key)
  },

  clear: (): void => {
    localStorage.clear()
  }
}