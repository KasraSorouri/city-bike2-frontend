import { gql } from '@apollo/client'

export const TRIP_COUNT = gql`
  query TripCount {
    TripCount
  }
`