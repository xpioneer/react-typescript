import * as React from 'react'
// import * as Quill from 'quill'

const Quill = require('quill')

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
];

interface IEditor {
  value: string
  onChange: Function
}

export default class QuillEditor extends React.Component<IEditor> {
  value: string = this.props.value
  oldVal: string

  quillEditor: any = null
  
  componentDidMount() {
    const { value, onChange } = this.props
    const { editor }: any = this.refs
    this.quillEditor = new Quill(editor, {
      // debug: false,
      modules: {
          toolbar: toolbarOptions,
      },
      placeholder: '请在这里写下你的内容...',
      readOnly: false,
      theme: 'snow',
    })

    // 赋值
    if(value !== undefined && value !== '' && value !== null) {
      this.quillEditor.root.innerHTML = value;
    }
    console.log(value, this.value)

    this.quillEditor.on('editor-change', (delta: any, oldDelta: any, source: any) => {
      console.log('editor-change', delta, oldDelta);
      let _html = this.quillEditor.root.innerHTML;
      if (_html === '<p><br></p>') {
        _html = null; return;
      }
      if(_html && this.oldVal !== _html) {
        this.oldVal = _html
        onChange(_html);
      }
      console.log('editor value:', _html)
    });
  }

  render(){
 
    return <div style={{minHeight: '600px'}} ref="editor"></div>
    
  }
}