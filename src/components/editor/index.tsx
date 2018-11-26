import * as React from 'react'
import * as Quill from 'quill'

export default class QuillEditor extends React.Component<IProps> {

  refs = {}
  
  componentDidMount() {
    const { editor }: any = this.refs
    // const quill = new Quill()
    console.log(editor, Quill)
  }

  render(){
 
    return <div ref="editor"></div>
    
  }
}