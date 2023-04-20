import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow } from '@mui/material'

const columnHeader = [
  { id: 'stationName', lable: 'Station Name', minWidth: 100 },
  { id: 'repetitions', lable: 'Repetitions', minWidth: 5 },
  { id: 'distance', lable: 'Distance (km)', minWidth: 8 },
  { id: 'durations', lable: 'Durations (min)', minWidth: 8 }
]

export const Origins = ({ stationsData, stationList }) => {
  return(
    <div>
      <TableContainer data-testid='originTable'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={4} >
                Origins with the most repetitions
              </TableCell>
            </TableRow>
            <TableRow>
              {columnHeader.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.lable}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { stationsData.StationStatistics.popularOrigin.map((station) => {
              return(
                <TableRow key={station.stationId} >
                  <TableCell align='left' >
                    {stationList.filter((s) => s.stationId ===station.stationId)[0].stationName}
                  </TableCell>
                  <TableCell align='center' >
                    {station.count}
                  </TableCell>
                  <TableCell align='center' >
                    {(station.aveDistance).toFixed(1)}
                  </TableCell>
                  <TableCell align='center' >
                    {(station.aveDuration).toFixed(1)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const Destinations = ({ stationsData, stationList }) => {
  return(
    <div>
      <TableContainer data-testid='destinationTable'>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={4} >
                The most pouplar Destinations
              </TableCell>
            </TableRow>
            <TableRow>
              {columnHeader.map((column) => (
                <TableCell
                  key={column.id}
                  align='center'
                  style={{ minWidth: column.minWidth }}
                >
                  {column.lable}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { stationsData.StationStatistics.popularDestination.map((station) => {
              return(
                <TableRow key={station.stationId} >
                  <TableCell align='left' >
                    {stationList.filter((s) => s.stationId ===station.stationId)[0].stationName}
                  </TableCell>
                  <TableCell align='center' >
                    {station.count}
                  </TableCell>
                  <TableCell align='center' >
                    {(station.aveDistance).toFixed(1)}
                  </TableCell>
                  <TableCell align='center' >
                    {(station.aveDuration).toFixed(1)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const BriefStatistic = ({ stationsData }) => {
  return(
    <div>
      <TableContainer data-testid='stationTable'>
        <Table size='small' >
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={2} variant="head" >
                <h3>{stationsData.Stations[0].stationName} station</h3>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'  variant="head" >
                Station capacity
              </TableCell>
              <TableCell align='center' variant="head">
                {stationsData.Stations[0].capacity}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align='left'  variant="head" >
                Total trip from this station
              </TableCell>
              <TableCell align='center' variant="head">
                {stationsData.StationStatistics.totalTripsFrom}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'  variant="head" >
                Total trip to this station
              </TableCell>
              <TableCell align='center' variant="head">
                {stationsData.StationStatistics.totalTripsTo}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'  variant="head" >
              The average distance of trips starting from this station
              </TableCell>
              <TableCell align='center' variant="head">
                { stationsData.StationStatistics.avrageTripFrom ?  stationsData.StationStatistics.avrageTripFrom.toFixed(1) : '-' }
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align='left'  variant="head" >
              The average distance of trips starting to this station
              </TableCell>
              <TableCell align='center' variant="head">
                { stationsData.StationStatistics.avrageTripTo ? stationsData.StationStatistics.avrageTripTo.toFixed(1) : '-' }
              </TableCell>
            </TableRow>
            {(stationsData.StationStatistics.roundTrip[0]) ?
              (<><TableRow>
                <TableCell align='left' variant="head">
                  Total round trip by this station
                </TableCell>
                <TableCell align='center' variant="head">
                  {stationsData.StationStatistics.roundTrip[0].count}
                </TableCell>
              </TableRow><TableRow>
                <TableCell align='left' variant="head">
                    Avarage distance of round Trips
                </TableCell>
                <TableCell align='center' variant="head">
                  {stationsData.StationStatistics.roundTrip[0].aveDistance.toFixed(2)} (km)
                </TableCell>
              </TableRow><TableRow>
                <TableCell align='left' variant="head">
                    Avarage duration of round Trips
                </TableCell>
                <TableCell align='center' variant="head">
                  {stationsData.StationStatistics.roundTrip[0].aveDuration.toFixed(1)} (min)
                </TableCell>
              </TableRow></>
              ) : null }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}