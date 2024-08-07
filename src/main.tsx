import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { App  as AppAntd} from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppAntd>
      <App />
    </AppAntd>
  </React.StrictMode>,
)
