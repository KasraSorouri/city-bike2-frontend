import { gql } from '@apollo/client'

export const TRIPS_PARAMETERS = gql`
  query TripParameter {
    TimeRanges {
      earliest,
      latest,
    }
    StationList {
      stationId,
      stationName,
    }
  }
`

export const STATION_LIST = gql`
  query StationList {
    StationList {
      stationId,
      stationName,
    }
  }
`
export const TRIPS = gql`
  query Trips ($departureStation: String, 
    $returnStation: String, 
    $departureTimeFrom: String, 
    $returnTimeTo: String, 
    $distanceFrom: Float,
    $distanceTo: Float, 
    $durationFrom: Float, 
    $durationTo: Float, 
    $page: Int!, 
    $rows: Int!,
    $sortParam: String, 
    $sortOrder: Int) {
      TripCount
      Trips (departureStation: $departureStation,
        returnStation: $returnStation, 
        departureTimeFrom: $departureTimeFrom,
        returnTimeTo: $returnTimeTo, 
        distanceFrom: $distanceFrom,
        distanceTo: $distanceTo,
        durationFrom: $durationFrom,
        durationTo: $durationTo,
        page: $page,
        rows: $rows,
        sortParam: $sortParam,
        sortOrder: $sortOrder) {   
          departure,
          return,
          departureStationId,
          departureStationName,
          returnStationId,
          returnStationName,
          distance,
          duration,
          id,
    }
  }
`