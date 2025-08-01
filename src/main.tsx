import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { TicketProvider } from './context/TicketContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TicketProvider>
      <App />
    </TicketProvider>
  </BrowserRouter>
)
