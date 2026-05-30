import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app/ui/App/App.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
