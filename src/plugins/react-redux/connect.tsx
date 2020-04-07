import React, { Component } from 'react'

export function connect<T>(mapStateToProps: Function, mapDispatchToProps: Function) {
  
  return (WrappedComponent: React.ComponentType) => {
  
    return class Connect extends Component {
      constructor(props: any) {
        super(props)
        // this.state = 
      }
    
      componentDidMount() {
        // 
      }
    
      componentWillUnmount() {
        // 
      }
    
      render() {
        return <WrappedComponent {...this.props}/>
      }
    }
  }
} 