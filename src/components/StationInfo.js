import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { STATION_INFO, TRIPS_PARAMETERS } from '../queries'
import { Origins, Destinations, BriefStatistic } from './StationInfoItems'

//import { useParams, useNavigate } from 'react-router-dom'
import { Map, Marker, ZoomControl  } from 'pigeon-maps'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import fi from 'date-fns/locale/fi'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  Divider,
  Autocomplete,
  TextField,
  Box,
  Stack,
  useMediaQuery,
} from '@mui/material'

const StationInfo = (id) => {
  //const sid = useParams(id).sid
  console.log(' sid ->', id)

  // Display improvment
  const isNarroww = useMediaQuery('(max-width:1040px)')

  const [inputs, setInputs] = useState({})
  console.log(' inputs ->', inputs)

  const filterParameters = {
    stationId : (inputs.station) ? inputs.station.stationId :'001',
    timeFrom: inputs.timeFrom,
    timeTo: inputs.timeTo
  }

  console.log(' filterParameters ->', filterParameters)

  const stationParameter = useQuery(TRIPS_PARAMETERS)
  const result = useQuery(STATION_INFO, { variables: { ...filterParameters } })

  if (result.loading) {
    return <p>loading .....</p>
  }
  if (result.error) {
    return (
      <div>
        <h2>Error !</h2>
        <p>
          {result.error.message}
        </p>
      </div>
    )
  }

  const stationsData = result.data

  console.log('stations data ->', stationsData)
  let timeRanges
  let stationList = []
  if (stationParameter.data) {
    stationList = stationParameter.data.StationList
    timeRanges = stationParameter.data.TimeRanges

  }
  console.log('stations list ->', stationList)
  console.log(' timeRanges ->', timeRanges)

  // Filter the stations List based on input value
  let filteredStations  = []
  const handleStationListFilter = (event) => {
    console.log('filter is called ', event)
    filteredStations = stationList.filter(
      (station) =>
        station.stationName.toLowerCase().includes(event.target.value.toLowerCase())
    )
  }
  const stationListParam = filteredStations.length > 0 ? filteredStations : stationList.slice(0, 200)

  // Handle fields update
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  // Handle time fields update
  const handleStartDate = (value) => {
    setInputs(values => ({ ...values, timeFrom: value }))
  }
  const handleEndDate = (value) => {
    setInputs(values => ({ ...values, timeTo: value }))
  }

  const handleMonth = (value) => {
    const y = value.getFullYear()
    const m = value.getMonth()
    setInputs({ timeFrom: new Date(y,m), timeTo: new Date(y,m+1),  month: value })
  }

  const SearchStation = () => {
    return(
      <Stack direction={'row'} spacing={1}>
        <Autocomplete
          id='station'
          name='station'
          sx={{ width: '30ch' }}
          options={stationListParam}
          getOptionLabel={(option) => option.stationName || ''}
          value={inputs.station}
          onChange={(event, newValue) => {
            handleChange({ target: { name: 'station', value: newValue } })}}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Origin Station'
              onChange={handleStationListFilter}
            />
          )}
          isOptionEqualToValue={(option, value) => option.stationId === value.stationId}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DatePicker
            label='Time from'
            name='timeFrom'
            minDate={new Date(timeRanges.earliest)}
            maxDate={new Date(timeRanges.latest)}
            value={inputs.timeFrom}
            onChange={handleStartDate}
            TextFieldComponent={(params) => <TextField {...params} sx={{ maxWidth: 120 }} />}
          />
          <DatePicker
            label='Time to'
            name='timeTo'
            minDate={new Date(timeRanges.earliest)}
            maxDate={new Date(timeRanges.latest)}
            value={inputs.timeTo}
            onChange={handleEndDate}
            TextFieldComponent={(params) => <TextField {...params} sx={{ maxWidth: 120 }} /> }
          />
          <Divider orientation="vertical" variant='middle' flexItem={false} >
            or
          </Divider>
          <DatePicker
            label='Select Month'
            name='Month'
            minDate={new Date(timeRanges.earliest)}
            maxDate={new Date(timeRanges.latest)}
            openTo='year'
            value={inputs.month}
            views={['year','month']}
            onChange={handleMonth}
            TextFieldComponent={(params) => <TextField {...params}  sx={{ maxWidth: 150 }}/>
            }
          />
        </LocalizationProvider>
      </Stack>
    )
  }

  return (
    <div>
      <Box flex={10}>
        <h1>Station information</h1>
        <SearchStation  />
        <Stack flex direction={isNarroww ? 'column' : 'row'} spacing={2} marginTop={3}>
          <Box>
            { stationsData.StationStatistics.popularOrigin.length > 0 ?
              <Origins stationsData={stationsData} stationList={stationList} /> : <p>No trip starts from this station</p>
            }
          </Box>
          <Box>
            { stationsData.StationStatistics.popularDestination.length > 0 ?
              <Destinations stationsData={stationsData} stationList={stationList} /> : <p>No trip ends at this station</p>
            }
          </Box>
        </Stack>
        <Stack flex direction={isNarroww ? 'column' : 'row'} spacing={2} marginTop={3}>
          {stationsData ? ( <BriefStatistic stationsData={stationsData}/> ) : null }
          <Box flex={10}>
            <h3>Address: {stationsData.Stations[0].address}</h3>
            <br />
            <Map height={300} defaultCenter={[60.22,24.82]} defaultZoom={10}>
              <Marker width={30} anchor={[stationsData.Stations[0].gpsPosition.latitude, stationsData.Stations[0].gpsPosition.longtitude]} color='red' value='test'></Marker>
              <ZoomControl />
            </Map>
          </Box>
        </Stack>
      </Box>
    </div>
  )
}

export default StationInfo



