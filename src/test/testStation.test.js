import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import Stations from '../components/Stations'

// Sample Data
const stationsData = {
  Stations: [
    { id:'i1', stationId: '001', stationName: 'Station 1', capacity: 10, city: 'City 1', address: 'Address 1' },
    { id:'i2', stationId: '002', stationName: 'Station 2', capacity: 20, city: 'City 2', address: 'Address 2' },
  ],
  StationCount: 2,
  StationFilteredCount: 2,
}

// Sample Data Parameter
const pageParameter = {
  sort: {
    sortItem: 'stationId',
    sortOrder: 1
  },
  rows : 10,
  page: 0
}

const changePage = jest.fn()
const changeRows = jest.fn()
const changeSort = jest.fn()

describe('Stations component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Stations
          stationsData={stationsData}
          pageParameter={pageParameter}
          changePage={changePage}
          changeRows={changeRows}
          changeSort={changeSort}
        />
      </MemoryRouter>
    )
  })

  it('renders table with correct column headers', () => {
    const stationIdHeader = screen.getByText('Station ID')
    const stationNameHeader = screen.getByText('Station Name')
    const capacityHeader = screen.getByText('Station Capacity')
    const cityHeader = screen.getByText('City')
    const addressHeader = screen.getByText('Station Address')

    expect(stationIdHeader).toBeInTheDocument()
    expect(stationNameHeader).toBeInTheDocument()
    expect(capacityHeader).toBeInTheDocument()
    expect(cityHeader).toBeInTheDocument()
    expect(addressHeader).toBeInTheDocument()
  })


  it('fires changeSort function when clicking on column header', () => {
    const stationIdHeader = screen.getByText('Station ID')

    fireEvent.click(stationIdHeader)

    expect(changeSort).toHaveBeenCalledTimes(1)
    expect(changeSort).toHaveBeenCalledWith({ sortItem: 'stationId', sortOrder: -1 })
  })
})
