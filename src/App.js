import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Container } from '@mui/material'

import Navigation from './components/Navigation'
import AboutApp from './components/AboutApp'
import TripsPage from './components/TripsPage'
import StationsPage from './components/StationsPage'


function App() {

  return (
    <div>
      <Container  maxWidth='xl'>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<AboutApp />} />
            <Route path='/trips' element={<TripsPage />} />
            <Route path='/stations' element={<StationsPage />} />
            <Route path='/station/:sid' element={<AboutApp />} />
            <Route path='/uploadFiles' element={<AboutApp />} />
          </Routes>
        </Router>
      </Container>
    </div>
  )
}

export default App
