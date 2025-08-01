import './App.css'
import RegistrationPage from './Components/RegisterationPage'
import RegistrationSummary from './Pages/RegistrationSummary'
import ThankYou from './Pages/ThankYou'
import TicketLayout from './Pages/TicketLayout'
import { Route, Routes } from 'react-router-dom'
import TicketSummary from './Pages/TicketSummary'

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<TicketLayout />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/register-summary" element={<RegistrationSummary />} />
        <Route path="/ticket-summary" element={<TicketSummary />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  )
}

export default App
