import './App.css'
import RegistrationPage from './Components/RegisterationPage'
import RegistrationSummery from './Pages/RegistrationSummery'
import ThankYou from './Pages/ThankYou'
import TicketLayout from './Pages/TicketLayout'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<TicketLayout />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/register-summary" element={<RegistrationSummery />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </div>
  )
}

export default App
