/// <reference types="react" />

  interface IResponseData<T = any> {
    data: T
    msg: string
    status: number
  }

  type AnyObject<T = any> = Record<string, T>

  type GraphQLResponse<T = any, IsPageData = null> = {
    data: {
      [Key in keyof T]: IsPageData extends true ? IPageData<T[Key]> : T[Key]
    }
  }

  type XExtends<T, K extends string | number | symbol, V = any> = T & { [P in K]: V }
  
  interface IPager {
    count: number
    current: number
    page: number
    pageSize: number
    total: number
    totalPage: number
    showTotal: (total: number) => React.ReactNode
  }

  interface IPageData<T = any> {
    list?: T[] // graphql 返回数据
    data: T[] // restful 返回数据
    meta: Partial<IPager>
    msg?: string
    status?: number
  }

  type IPageParams = Pick<IPageData['meta'], 'page' | 'pageSize'>
  
  interface IOption<V = any, L = string> {
    label: L
    value: V
  }


declare const styles: { [className: string]: string }

declare module '*.scss' {
  export default styles;
}

declare module '*.svg' {

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>;
  const src: string
  export default src;
}


declare module '*.xml' {
  const content: string
  export default content;
}


declare module '*.avif' {
  const src: string
  export default src;
}

declare module '*.bmp' {
  const src: string
  export default src;
}

declare module '*.gif' {
  const src: string
  export default src;
}

declare module '*.jpg' {
  const src: string
  export default src;
}

declare module '*.jpeg' {
  const src: string
  export default src;
}

declare module '*.png' {
  const src: string
  export default src;
}

declare module '*.webp' {
  const src: string
  export default src;
}