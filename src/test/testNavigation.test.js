import { render, screen, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Navigation from '../components/Navigation'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Navigation component', () => {
  test('renders navigation links correctly', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    expect(screen.getByText('About App')).toBeInTheDocument()
    expect(screen.getByText('Trips')).toBeInTheDocument()
    expect(screen.getByText('Stations')).toBeInTheDocument()
    expect(screen.getByText('StationInfo')).toBeInTheDocument()
    expect(screen.getByText('Upload Data')).toBeInTheDocument()
  })

  test('navigates to correct routes on link click', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )
    act(() => {
      const tripsLink = screen.getByText('Trips')
      tripsLink.click()
      expect(window.location.pathname).toBe('/trips')

      const stationsLink = screen.getByText('Stations')
      stationsLink.click()
      expect(window.location.pathname).toBe('/stations')
    })
  })
})
