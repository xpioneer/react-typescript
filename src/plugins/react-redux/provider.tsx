import React, { Component } from 'react'
import { IAnyObject, ICreateStore } from '../redux/model'
const PropTypes = require('prop-types')

interface IProviderProps{
  store: IAnyObject
  children: React.ReactNode
}

export class ReduxProvider extends Component<IProviderProps, ICreateStore> {
  
  static childContextTypes = {
    store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
    }).isRequired
  }

  constructor (props: IProviderProps) {
    super(props)
    this.$store = props.store
    console.log('ReduxProvider---constructor', 999)
  }

  $store: IAnyObject = {}

  getChildContext () {
    console.log('获取了---getChildContext', this.$store)
    return {
      store: this.$store
    }
  }

  render () {
    console.log('$store', this.props.children)
    return this.props.children
  }
}


// createContext

export const { Provider, Consumer } = React.createContext<IAnyObject | null>(null)

export const ReduxProvider1: React.FC<IProviderProps> = (props) => {

  return <Provider value={props.store}>{(props as any).children}</Provider>
}
