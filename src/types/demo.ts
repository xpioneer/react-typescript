import { object2Options } from '@utils/tools'

export interface APIFormTest {
  url: string
  method: Method
  apiSource: APISource
  params: string
}


export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const methodOpts = object2Options(Method)

export enum APISource {
  RESTful = '/api',
  Graphql = '/graphql',
  Quantification = '/py-api'
}

export const apiSourceOpts = object2Options(APISource)
