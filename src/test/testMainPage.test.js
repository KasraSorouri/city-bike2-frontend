import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import AboutApp from '../components/AboutApp'

describe('AboutApp component', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<AboutApp />)

    expect(getByText('About this App')).toBeInTheDocument()
    expect(getByText('Backend')).toBeInTheDocument()
    expect(getByText('Frontend')).toBeInTheDocument()
    expect(getByText('How it works')).toBeInTheDocument()
    expect(getByText('Trips')).toBeInTheDocument()
    expect(getByText('Stations')).toBeInTheDocument()
    expect(getByText('StationInfo')).toBeInTheDocument()
    expect(getByText('Upload Data')).toBeInTheDocument()

    expect(getByTestId('link-backend', { href: 'https://github.com/KasraSorouri/city-bike2-backend' })).toBeInTheDocument()
    expect(getByTestId('link-frontend', { href: 'https://github.com/KasraSorouri/city-bike2-frontend' })).toBeInTheDocument()
  })
})
