import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ICreateStore } from '../redux'
import {} from './provider'

export function connect<T> (
  mapStateToProps?: Function,
  mapDispatchToProps?: Function
) {
  
  return function connectWithComponent (WrappedComponent: React.ComponentType) {
  
    return class CustomeComponent extends Component {
      
      static contextTypes = {
        store: PropTypes.shape({
          subscribe: PropTypes.func.isRequired,
          dispatch: PropTypes.func.isRequired,
          getState: PropTypes.func.isRequired
        }).isRequired
      }

      constructor (props: any, context: {store: ICreateStore}) {
        super(props)
        this.store = context.store
        this.state = mapStateToProps(this.store.getState())
        if (typeof mapDispatchToProps === 'function') {
          this.mappedDispatch = mapDispatchToProps(this.store.dispatch)
        }
        console.log('connect....constructor', this.state, this.mappedDispatch)
      }

      state = {}

      store = {} as ICreateStore
      mappedDispatch: any = {}
      unsub = () => {}
    
      componentDidMount () {
        console.log('connect----componentDidMount', mapStateToProps(this.store.getState()))
        this.unsub = this.store.subscribe(() => {
          const mappedState = mapStateToProps(this.store.getState())
          console.log(mappedState, '----mappedState')
          this.setState(mappedState)
        })
      }
    
      componentWillUnmount () {
        this.unsub()
      }
    
      render () {
        return <WrappedComponent {...this.props} {...this.state} {...this.mappedDispatch}/>
      }
    }
  }
}


export function connect1<T> (
  mapStateToProps?: Function,
  mapDispatchToProps?: Function
) {
  
  return function connectWithComponent (WrappedComponent: React.ComponentType) {
  
    return class CustomeComponent extends Component {
      
      static contextTypes = {
        store: PropTypes.shape({
          subscribe: PropTypes.func.isRequired,
          dispatch: PropTypes.func.isRequired,
          getState: PropTypes.func.isRequired
        }).isRequired
      }

      constructor (props: any, context: {store: ICreateStore}) {
        super(props)
        this.store = context.store
        this.state = mapStateToProps(this.store.getState())
        if (typeof mapDispatchToProps === 'function') {
          this.mappedDispatch = mapDispatchToProps(this.store.dispatch)
        }
        console.log('connect....constructor', this.state, this.mappedDispatch)
      }

      state = {}

      store = {} as ICreateStore
      mappedDispatch: any = {}
      unsub = () => {}
    
      componentDidMount () {
        console.log('connect----componentDidMount', mapStateToProps(this.store.getState()))
        this.unsub = this.store.subscribe(() => {
          const mappedState = mapStateToProps(this.store.getState())
          console.log(mappedState, '----mappedState')
          this.setState(mappedState)
        })
      }
    
      componentWillUnmount () {
        this.unsub()
      }
    
      render () {
        return <WrappedComponent {...this.props} {...this.state} {...this.mappedDispatch}/>
      }
    }
  }
}