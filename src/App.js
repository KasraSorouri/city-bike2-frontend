import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Container } from '@mui/material'

import Navigation from './components/Navigation'
import AboutApp from './components/AboutApp'

function App() {

  return (
    <div>
      <Container  maxWidth='xl'>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<AboutApp />} />
            <Route path='/trips' element={<AboutApp />} />
            <Route path='/stations' element={<AboutApp />} />
            <Route path='/station/:sid' element={<AboutApp />} />
            <Route path='/uploadFiles' element={<AboutApp />} />
          </Routes>
        </Router>
      </Container>
    </div>
  )
}

export default App
