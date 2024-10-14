import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Cadastro from './Cadastro.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cadastro />
    <App/>
    
  </StrictMode>,
)
