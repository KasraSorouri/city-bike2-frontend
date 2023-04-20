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

export const STATIONS = gql`
  query Stations ($stationId: [String],
    $page: Int!,
    $rows: Int!,
    $sortParam: String,
    $sortOrder:Int) {
      StationCount
      Stations (stations: $stationId,
        page: $page,
        rows: $rows,
        sortParam: $sortParam,
        sortOrder:$sortOrder) {
          id,
          stationId,
          stationName,
          address,
          city,
          operator,
          capacity,
      }
  }
`

export const STATION_INFO = gql`
  query StationInfo ($stationId : String!, $timeFrom: String, $timeTo: String){
    Stations (stations: [$stationId], page: 0, rows: 1 ) {
        id,
        stationId,
        stationName,
        address,
        city,
        operator,
        capacity,
        gpsPosition {
          longtitude,
          latitude,
        }
    }
    StationStatistics (stationId : $stationId, timeFrom: $timeFrom, timeTo: $timeTo) {
      totalTripsFrom,
      totalTripsTo,
      avrageTripFrom,
      avrageTripTo,
      popularDestination{
        stationId,
        count,
        aveDuration,
        minDuration,
        maxDuration,
        aveDistance,
        minDistance,
        maxDistance,
      },
      popularOrigin{
        stationId,
        count,
        aveDuration,
        minDuration,
        maxDuration,
        aveDistance,
        minDistance,
        maxDistance,
      },
      roundTrip{
        stationId,
        count,
        aveDuration,
        minDuration,
        maxDuration,
        aveDistance,
        minDistance,
        maxDistance,
      },
    }
  }
`