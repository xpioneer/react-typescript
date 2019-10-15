import * as React from 'react'
import { QuillOptionsStatic } from 'quill'
import * as Q from 'quill'

const Quill: any = Q

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }],               // custom button values
  [{ list: 'ordered'}, { list: 'bullet' }],
  [{ script: 'sub'}, { script: 'super' }],      // superscript/subscript
  [{ indent: '-1'}, { indent: '+1' }],          // outdent/indent
  [{ direction: 'rtl' }],                         // text direction

  [{ size: ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] as any }, { background: [] as any }],          // dropdown with defaults from theme
  [{ font: [] as any }],
  [{ align: [] as any }],

  ['link', 'image'],

  ['clean'],                                         // remove formatting button
]

interface IEditor {
  disabled?: boolean
  value: string
  onChange(text: string): Function
}

export default class QuillEditorComponent extends React.Component<IEditor> {
  value: string = this.props.value
  oldVal: string = ''

  quillEditor: any = null
  quillOptions: QuillOptionsStatic = {
    // debug: false,
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: '请在这里写下你的内容...',
    readOnly: false,
    theme: 'snow',
  }

  $editor: any = null
  
  componentDidMount() {
    const { onChange } = this.props
    const { $editor } = this
    this.quillEditor = new Quill($editor, this.quillOptions)

    this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: any) => {
      let _html: string = this.quillEditor.root.innerHTML
      if (_html === '<p><br></p>') {
        _html = ''
      }
      if(this.oldVal !== _html) {
        this.oldVal = _html
        onChange && onChange(_html)
      }
    })
  }

  // change editor value
  changeEditorText = () => {
    const { value } = this.props
    // 赋值
    if(this.oldVal !== value && value !== undefined && this.quillEditor) {
      this.quillEditor.root.innerHTML = value
      this.oldVal = value
    }
  }

  render(){
    const { disabled } = this.props
    this.changeEditorText()

    return <div className="editor-wrap">
      <div style={{minHeight: '600px'}} ref={this.$editor}></div>
      {disabled ? <div className="editor-mask"></div> : ''}
    </div>
    
  }
}