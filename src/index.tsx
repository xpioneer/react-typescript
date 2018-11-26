import * as React from 'react'
import * as ReactDOM from 'react-dom';
import App from './pages/app';
import './assets/scss/app.scss';
import 'antd/dist/antd.css'
import 'quill/dist/quill.snow.css';

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);