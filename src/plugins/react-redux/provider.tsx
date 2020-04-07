import React, { Component } from 'react'
import { IAnyObject } from '../redux/model'
import PropTypes from 'prop-types'

interface IProviderProps{
  $store: IAnyObject
}

export class ReduxProvider extends Component<IProviderProps> {
  
  static childContextTypes = {
    $store: PropTypes.object
  }

  constructor(props: IProviderProps) {
    super(props)
    this.store = props.$store
  }

  store = {}

  getChildContext() {
    return {
      $store: this.store
    }
  }

  render() {
    // console.log('$store', )
    return this.props.children
  }
}