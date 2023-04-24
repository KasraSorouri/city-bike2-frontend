import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Trips from '../components/Trips'

jest.mock('dateformat', () => jest.fn().mockReturnValue('Mocked Date'))

// Sample Data
const tripsData = {
  Trips: [
    {
      id: 1,
      departureStationName: 'Departure Station 1',
      departure: new Date(),
      returnStationName: 'Return Station 1',
      return: new Date(),
      duration: 120,
      distance: 50.25,
    },
    {
      id: 2,
      departureStationName: 'Departure Station 2',
      departure: new Date(),
      returnStationName: 'Return Station 2',
      return: new Date(),
      duration: 90,
      distance: 30.5,
    },
  ],
  TripFilteredCount: 2,
  TripCount: 2,
}

// Sample Data Parameter
const pageParameter = {
  sort: {
    sortItem: 'departureStationName',
    sortOrder: 1,
  },
  rows: 10,
  page: 0,
}
const changePage = jest.fn()
const changeRows = jest.fn()
const changeSort = jest.fn()

describe('Trips Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render Trips component correctly', () => {
    render(
      <Trips
        tripsData={tripsData}
        pageParameter={pageParameter}
        changePage={changePage}
        changeRows={changeRows}
        changeSort={changeSort}
      />
    )

    expect(screen.getByText('Trips information')).toBeInTheDocument()
    expect(screen.getByText('Departure Station')).toBeInTheDocument()
    expect(screen.getByText('Departure Time')).toBeInTheDocument()
    expect(screen.getByText('Destination Station')).toBeInTheDocument()
    expect(screen.getByText('Destination Time')).toBeInTheDocument()
    expect(screen.getByText('Duration (min)')).toBeInTheDocument()
    expect(screen.getByText('Distance (Km)')).toBeInTheDocument()

    expect(changePage).not.toHaveBeenCalled()
    expect(changeRows).not.toHaveBeenCalled()
    expect(changeSort).not.toHaveBeenCalled()
  })

  it('should render notification when no trips are found', () => {
    render(
      <Trips
        tripsData={{ ...tripsData, Trips: null }}
        pageParameter={pageParameter}
        changePage={changePage}
        changeRows={changeRows}
        changeSort={changeSort}
      />
    )

    expect(screen.getByText('No trip find!')).toBeInTheDocument()

    expect(changePage).not.toHaveBeenCalled()
    expect(changeRows).not.toHaveBeenCalled()
    expect(changeSort).not.toHaveBeenCalled()
  })

})
