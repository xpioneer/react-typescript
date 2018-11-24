

export class Storage {

  get = (key: string) => {
    const value = localStorage.getItem(key);
    return JSON.parse(value)
  }

  set = (key: string, value: any): void => {
    if(value !== null || value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  remove = (key: string): void => {
    localStorage.removeItem(key)
  }

  clear = (): void => {
    localStorage.clear()
  }
}

export const store = new Storage