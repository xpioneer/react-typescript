import { object2Options } from '@utils/tools'

export interface APIFormTest {
  url: string
  method: Method
  apiType: APIType
  params: string
}


export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const methodOpts = object2Options(Method)

export enum APIType {
  'RESTful' = '/api',
  'Graphql' = '/graphql'
}

export const apiTypeOpts = object2Options(APIType)
