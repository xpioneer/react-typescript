import { EXCLUDE_KEYS, JWT_TOKEN } from '@/constants'
import { format, isDate, isValid, parseISO } from 'date-fns'
import { DateFormat } from 'types/base'

export const object2Str = (o: string|object): string => {
  return typeof o === 'string' ? o : JSON.stringify(o)
}

export const storage = {
  get: (key: string): string => {
    const value = localStorage.getItem(key)
    return value || ''
  },

  set: (key: string, value: string) => {
    if (value !== null && value !== undefined) {
      localStorage.setItem(key, value)
    }
  },

  remove: (key: string): void => {
    localStorage.removeItem(key)
  },

  clear(exclude = false) {
    if(exclude) {
      Object.keys(localStorage).forEach(key => {
        console.log(EXCLUDE_KEYS, key)
        if(!EXCLUDE_KEYS.includes(key)) {
          this.remove(key)
        }
      })
    } else {
      localStorage.clear()
    }
  }
}


/**
 * 初始化后端分页数据
 */
const initServerData = <T = any>(): IPageData<T> => {
  return {
    data: [],
    list: [],
    meta: {
      current: 0, // antd
      page: 0,
      pageSize: 0,
      total: 0,
      totalPage: 0,
      showTotal: (total: number) => `${total} items`
    }
  }
}

export const data2PageData = <T>(data: IPageData<T> = {
  data: [],
  meta: { page: 1, pageSize: 10, total: 0, count: 0 }
}): IPageData<T> => {
  return {
    ...data,
    meta: {
      ...data.meta,
      showTotal: total => `共${total}条，本页${data.meta.count}条`
    }
    
  }
}

export const pageData2Params = (meta: Partial<IPager> = {page: 1, pageSize: 10}): Pick<IPager, 'page' | 'pageSize'> => {
  return {
    page: meta.page!,
    pageSize: meta.pageSize!
  }
}

/**
 * graphql数据转换数据为antd分页数据
 * @param data 后端数据
 * @returns 分页数据
 */
export const data2AntPageData = <T = any>(
  {
    list,
    meta: {
      page,
      pageSize,
      total,
    }
  } = initServerData<T>()
): IPageData<T> => {
  return {
    data: list!,
    meta: {
      current: page ?? 1,
      pageSize: pageSize ?? 10,
      total: total ?? 0,
      showTotal: (total: number) => `total: ${total} items`
    }
  }
}

export const object2Options = <T extends object, K extends keyof T>(obj: T, keys: K[] = Object.keys(obj) as K[], noNum = true) => {
  return keys.filter(key => noNum ? isNaN(Number(key)) : true).map(key => ({
    label: key,
    value: obj[key]
  }))
}

export const dateFormat = (date: number | string | Date, pattern = DateFormat.Date) => {
  let str = ''
  try {
    if(date) {
      const msTimestamp = +new Date(date)
      if(!isNaN(msTimestamp)) {
        str = format(new Date(msTimestamp), pattern)
      }
    }
  } catch(e) {
    return 'N/A'
  }
  return str
}

export const setRem = () => {
  let _html = document.documentElement
  function getSize () {
    let w = _html.clientWidth
    if(w <= 320) {
      _html.style.fontSize = '17.06666666px'
    } else {
      _html.style.fontSize = w/750*40 + 'px'
    }
  }
  getSize()

  let timer = 0
  window.addEventListener('resize', function (e) {
    clearTimeout(timer)
    timer = window.setTimeout(function () {getSize()}, 300)
  })
}

export const isLogged = () => {
  try {
    const token = storage.get(JWT_TOKEN), [h, p, s] = token.split('.')
    if(h && p && s) {
      const payload = JSON.parse(window.atob(p)),
        exp = (+payload.exp * 1000),
        now = Date.now()
      if(now < exp) {
        return true
      }
    }
    return false
  } catch(e) {
    return false
  }
}