import React, { useEffect, useRef, useState } from 'react'
import { QuillOptionsStatic } from 'quill'
import * as Q from 'quill'
// const ImageResize = require('quill-image-resize-module/src/ImageResize.js');
// console.log(ImageResize, 'imageresize')
interface IQuillOptions extends QuillOptionsStatic {
  // imageResize: {
  //   displaySize: boolean
  // }
}

const Quill: any = Q
// Quill.register('modules/imageResize', ImageResize)

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
  value?: string
  onChange?(text: string): () => void
}

export const QuillEditor: React.FC<IEditor> = ({
  disabled,
  value,
  onChange
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<typeof Quill>(null)
  const oldVal = useRef('')

  const quillOptions: IQuillOptions = {
    // debug: false,
    imageResize: {
      displaySize: true // default false
    },
    modules: {
      toolbar: toolbarOptions,
    },
    placeholder: '请在这里写下你的内容...',
    readOnly: false,
    theme: 'snow',
  }

  useEffect(() => {
    editorRef.current = new Quill(divRef.current, quillOptions)

    editorRef.current.on('text-change', (delta: any, oldDelta: any, source: any) => {
      let _html: string = editorRef.current.root.innerHTML
      if (_html === '<p><br></p>') {
        _html = ''
      }
      if (oldVal.current !== _html) {
        oldVal.current = _html
        onChange && onChange(_html)
      }
    })
  }, [])

  // change editor value
  const changeEditorText = () => {
    // 赋值
    if (oldVal.current !== value && value !== undefined && editorRef.current) {
      editorRef.current.root.innerHTML = value
      oldVal.current = value
    }
  }

  useEffect(() => {
    changeEditorText()
  }, [value])

  return <div className="editor-wrap">
    <div style={{minHeight: '600px'}} ref={divRef}></div>
    {disabled ? <div className="editor-mask"></div> : ''}
  </div>
}