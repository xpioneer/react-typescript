import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './pages/app'
import './scss/app.scss'
import 'antd/dist/antd.css'
import 'quill/dist/quill.snow.css'
import serviceWorker from './serviceWorker'
import { setRem } from 'utils/tools'

// setRem();

ReactDOM.render(
  <App/>,
  document.getElementById('app')
)
serviceWorker()