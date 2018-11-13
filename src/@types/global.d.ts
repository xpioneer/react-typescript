import { RouteComponentProps } from 'react-router-dom'
import {AxiosInstance} from 'axios'

declare global {
  export const $http: AxiosInstance
  
  export interface IProps extends RouteComponentProps {
    demoStore?: any
    homeStore?: any
    loginStore?: any
  }
}