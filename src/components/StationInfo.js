import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { STATION_INFO, TRIPS_PARAMETERS } from '../queries'
import { Origins, Destinations, BriefStatistic } from './StationInfoItems'

import { useLocation  } from 'react-router-dom'
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
  Typography,
} from '@mui/material'

const StationInfo = () => {
  const location = useLocation()
  const { sid } = location.state ? location.state : {}

  // Display improvment
  const isNarrow = useMediaQuery('(max-width:1040px)')

  const [inputs, setInputs] = useState({})

  const filterParameters = {
    stationId : (inputs.station) ? inputs.station.stationId : ( sid ? sid : '001' ),
    timeFrom: inputs.timeFrom,
    timeTo: inputs.timeTo
  }

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

  let timeRanges
  let stationList = []
  if (stationParameter.data) {
    stationList = stationParameter.data.StationList
    timeRanges = stationParameter.data.TimeRanges

  }

  // Filter the stations List based on input value
  let filteredStations  = []
  const handleStationListFilter = (event) => {
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
      <Stack direction={ isNarrow? 'column' : 'row'} spacing={1}>
        <Autocomplete
          id='station'
          name='station'
          sx={{
            flex: 1,
            minWidth: '300px',
            maxWidth:'600px' }}
          options={stationListParam}
          getOptionLabel={(option) => option.stationName || ''}
          value={inputs.station}
          onChange={(event, newValue) => {
            handleChange({ target: { name: 'station', value: newValue } })}}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Station'
              onChange={handleStationListFilter}
            />
          )}
          isOptionEqualToValue={(option, value) => option.stationId === value.stationId}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <Stack direction={'row'} spacing={2}>
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
          </Stack>
          <Divider orientation="vertical" variant='middle' flexItem={false} >
            <Typography variant='body1' marginTop={1}>OR</Typography>
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
      <Box flex={12} marginTop={2}>
        <SearchStation  />
        <Typography variant='h4' marginTop={2}>Station information</Typography>
        <Stack flex direction={isNarrow ? 'column' : 'row'}  marginTop={3}>
          <Typography variant='h6' marginRight={20} marginTop={-1} ><b>Station name:</b> {stationsData.Stations[0].stationName}</Typography>
          <Stack flex direction='row' spacing={5} justifyContent={'space-between'} >
            <Typography variant='body1' ><b>Address:</b> {stationsData.Stations[0].address}</Typography>
            { (stationsData.Stations[0].city.length > 1) ? (<Typography variant='body1' ><b>City:</b> {stationsData.Stations[0].city}</Typography>) : null }
            { stationsData.Stations[0].operator.length > 1  ? <Typography variant='body1' ><b>Operator:</b>  {stationsData.Stations[0].operator}</Typography> : null }
          </Stack>
        </Stack>
        <Stack flex direction={isNarrow ? 'column' : 'row'} spacing={2} marginTop={3}>
          {stationsData ? ( <BriefStatistic stationsData={stationsData}/> ) : null }
          <Box flex={10}>
            <Map height={300} defaultCenter={[60.22,24.82]} defaultZoom={10}>
              <Marker width={30} anchor={[stationsData.Stations[0].gpsPosition.latitude, stationsData.Stations[0].gpsPosition.longtitude]} color='red' value='test'></Marker>
              <ZoomControl />
            </Map>
          </Box>
        </Stack>
        <Stack flex direction={isNarrow ? 'column' : 'row'} spacing={2} marginTop={3}>
          <Box flex={6}>
            { stationsData.StationStatistics.popularOrigin.length > 0 ?
              <Origins stationsData={stationsData} stationList={stationList} /> : <p>No trip starts from this station</p>
            }
          </Box>
          <Box flex={6}>
            { stationsData.StationStatistics.popularDestination.length > 0 ?
              <Destinations stationsData={stationsData} stationList={stationList} /> : <p>No trip ends at this station</p>
            }
          </Box>
        </Stack>
      </Box>
    </div>
  )
}

export default StationInfo



