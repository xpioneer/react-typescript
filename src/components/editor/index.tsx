import * as React from 'react'

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
  disabled?: boolean
  value: string
  onChange(text: string): Function
}

export default class QuillEditor extends React.Component<IEditor> {
  value: string = this.props.value
  oldVal: string = this.props.value

  quillEditor: any = null
  
  componentDidMount() {
    const { onChange } = this.props
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

    // this.quillEditor.on('editor-change', (delta: any, oldDelta: any, source: any) => {
    //   // too many change
    // });

    this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: any) => {
      let _html: string = this.quillEditor.root.innerHTML;
      if (_html === '<p><br></p>') {
        _html = '';
        // return;
      }
      if(this.oldVal !== _html) {
        this.oldVal = _html
        onChange && onChange(_html);
      }
      // console.log('text value:', this.oldVal)
    });
  }

  // change editor value
  changeEditorText = () => {
    const { value } = this.props
    // 赋值
    if(this.oldVal !== value) {
      this.quillEditor.root.innerHTML = value;
      this.oldVal = value
    }
  }

  render(){
    const { disabled } = this.props
    this.changeEditorText()

    return <div className="editor-wrap">
      <div style={{minHeight: '600px'}} ref="editor"></div>
      {disabled ? <div className="editor-mask"></div> : ''}
    </div>
    
  }
}