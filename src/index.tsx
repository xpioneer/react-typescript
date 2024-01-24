import * as React from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/app'
import './scss/app.scss'
import 'antd/dist/reset.css'
import 'quill/dist/quill.snow.css'
import serviceWorker from './serviceWorker'
import { setRem } from 'utils/tools'

// setRem();

const container = document.getElementById('app')!
createRoot(container).render(<App />)
serviceWorker()