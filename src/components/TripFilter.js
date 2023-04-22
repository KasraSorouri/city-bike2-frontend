import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import fi from 'date-fns/locale/fi'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TRIPS_PARAMETERS } from '../queries'
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  InputAdornment,
  Stack,
  InputLabel,
  Button,
  useMediaQuery,
  Typography
} from '@mui/material'

const TripFilter = ({ changeFilter, filterParameters }) => {

  const [filteredOriginStations, setFilteredOriginStations] = useState([])
  const [filteredDestinationStations, setFilteredDestinationStations] = useState([])

  // Display improvment
  const isNarrow = useMediaQuery('(max-width:1440px)')

  let initialFilterPrameter = {
    originStationId: null,
    destinationStationID: null,
    originStation: null,
    destinationStation: '',
    durationFrom: '',
    durationTo: '',
    distanceFrom: '',
    distanceTo: '',
    timeFrom: null,
    timeTo: null,
  }

  if (filterParameters) {
    initialFilterPrameter = {
      originStationId: filterParameters.departureStation || null,
      destinationStationID: filterParameters.returnStation || null,
      originStation: '',
      destinationStation: '',
      durationFrom: filterParameters.durationFrom || '',
      durationTo: filterParameters.durationTo || '',
      distanceFrom: filterParameters.distanceFrom || '',
      distanceTo: filterParameters.distanceTo || '',
      timeFrom: filterParameters.departureTimeFrom,
      timeTo: filterParameters.returnTimeTo,
    }
  }

  const [inputs, setInputs] = useState(initialFilterPrameter)

  const maxItemsToShow = 200

  let parameters = {}
  parameters = useQuery(TRIPS_PARAMETERS)

  if (parameters.loading) {
    return (<p>Loading .... </p>)
  }
  if (parameters.error) {
    return <h1>error</h1>
  }

  if (!parameters.data) {
    return null
  }
  const timeRanges = parameters.data.TimeRanges
  const stationList = parameters.data.StationList

  // Reload last filtered stations
  let preSetOriginStation = null
  let preSetReturnStation = null
  if (filterParameters){
    preSetOriginStation = (filterParameters.departureStation) ?
      stationList.filter((s) => s.stationId === filterParameters.departureStation)[0]
      : null

    preSetReturnStation = (filterParameters.returnStation) ?
      stationList.filter((s) => s.stationId === filterParameters.returnStation)[0]
      : null
  }

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

  // Filter the Departure station List based on input value
  const handleOriginStationListFilter = (event) => {
    const filteredStations = stationList.filter(
      (station) =>
        station.stationName.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredOriginStations(filteredStations.slice(0, maxItemsToShow))
  }
  const originStationListParam = filteredOriginStations.length > 0 ? filteredOriginStations : stationList.slice(0, maxItemsToShow)

  // Filter the Destination station List based on input value
  const handleDestinationStationListFilter = (event) => {
    const filteredStations = stationList.filter(
      (station) =>
        station.stationName.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredDestinationStations(filteredStations.slice(0, maxItemsToShow))
  }
  const DestinationStationListParam = filteredDestinationStations.length > 0 ? filteredDestinationStations : stationList.slice(0, maxItemsToShow)

  // Convert filter parameter and send it back
  const handleSubmit = (event) => {
    event.preventDefault()
    const filter = {
      departureStation: (inputs.originStation) ? inputs.originStation.stationId :
        (preSetOriginStation) ? preSetOriginStation.stationId : null,
      returnStation: (inputs.destinationStation) ? inputs.destinationStation.stationId :
        (preSetReturnStation) ? preSetReturnStation.stationId : null,
      departureTimeFrom: inputs.timeFrom,
      returnTimeTo: inputs.timeTo,
      distanceFrom: Number(inputs.distanceFrom),
      distanceTo: Number(inputs.distanceTo),
      durationFrom: Number(inputs.durationFrom),
      durationTo: Number(inputs.durationTo),
    }
    changeFilter(filter)
  }

  const handleReset = () => {
    setInputs({
      originStationId: null,
      destinationStationID: null,
      originStation: '',
      destinationStation: '',
      durationFrom: '',
      durationTo: '',
      distanceFrom: '',
      distanceTo: '',
      timeFrom: null,
      timeTo: null,
    })
    changeFilter(null)
  }

  return (
    <div>
      <Box
        component='form'
        noValidate
        autoComplete='off'
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Stack direction={isNarrow ? 'column' : 'row'} justifyContent="space-between" flex>
              <Box>
                <Typography>Stations</Typography>
                <Stack direction={isNarrow ? 'column' : 'row'} justifyContent="space-between" flex>
                  <Autocomplete
                    id='originStation'
                    name='originStation'
                    sx={{
                      flex: 1,
                      minWidth: '300px',
                      maxWidth:'600px' }}
                    options={originStationListParam}
                    getOptionLabel={(option) => option.stationName || ''}
                    value={inputs.originStation || preSetOriginStation }
                    defaultValue={preSetOriginStation}
                    onChange={(event, newValue) => {
                      handleChange({ target: { name: 'originStation', value: newValue } })}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Origin Station'
                        onChange={handleOriginStationListFilter}
                      />
                    )}
                    isOptionEqualToValue={(option, value) => option.stationId === value.stationId}
                  />
                  <span style={{ margin: '5px' }} />
                  <Autocomplete
                    id='destinationStation'
                    name='destinationStation'
                    sx={{
                      flex: 1,
                      minWidth: '300px',
                      maxWidth:'600px' }}
                    options={DestinationStationListParam}
                    getOptionLabel={(option) => option.stationName || ''}
                    value={inputs.destinationStation || preSetReturnStation }
                    defaultValue={preSetReturnStation}
                    onChange={(event, newValue) => {
                      handleChange({ target: { name: 'destinationStation', value: newValue } })}}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Destination Station'
                        onChange={handleDestinationStationListFilter}
                      />
                    )}
                  />
                </Stack>
              </Box>
              <span style={{ margin: '8px' }} />
              <Box>
                <Typography>Time Ranges</Typography>
                <Stack direction='row' justifyContent="space-between" flex>
                  <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                    <DatePicker
                      label='Time from'
                      name='timeFrom'
                      minDate={new Date(timeRanges.earliest)}
                      maxDate={new Date(timeRanges.latest)}
                      defaultValue={inputs.timeFrom}
                      value={inputs.timeFrom}
                      onChange={handleStartDate}
                      sx={{
                        minWidth: '140px',
                        maxWidth:'200px' }}
                      TextFieldComponent={(params) => <TextField {...params} />}
                    />
                    <span style={{ margin: '5px' }} />
                    <DatePicker
                      label='Time to'
                      name='timeTo'
                      minDate={new Date(timeRanges.earliest)}
                      maxDate={new Date(timeRanges.latest)}
                      defaultValue={inputs.timeTo}
                      value={inputs.timeTo}
                      onChange={handleEndDate}
                      sx={{
                        minWidth: '140px',
                        maxWidth:'200px' }}
                      TextFieldComponent={(params) => <TextField {...params} /> }
                    />
                  </LocalizationProvider>
                </Stack>
              </Box>
              <span style={{ margin: '8px' }} />
              <Grid item xs={12} md={6}>
                <Stack direction={isNarrow ? 'column' : 'row'} justifyContent="space-between" flex spacing={1}>
                  <Box flex={6}>
                    <Typography>Duration between</Typography>
                    <Stack  direction={'row'} justifyContent="space-between" flex >
                      <TextField
                        id='durationFrom'
                        label='From'
                        name='durationFrom'
                        value={inputs.durationFrom}
                        sx={{
                          minWidth: '75px',
                          maxWidth:'200px',
                        }}
                        onChange={(event) => handleChange(event)}
                        InputProps={{ startAdornment: <InputAdornment position='start' >&#62;=</InputAdornment> }}
                      />
                      <InputLabel sx={{ width: '80px', marginTop:2, marginRight: 1, marginLeft: 1 }}> and</InputLabel>
                      <TextField
                        id='durationTo'
                        label='To'
                        name='durationTo'
                        value={inputs.durationTo}
                        sx={{
                          minWidth: '50px',
                          maxWidth:'200px' }}
                        onChange={event => handleChange(event)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>&#60;=</InputAdornment>,
                        }}
                      />
                    </Stack>
                  </Box>
                  <span style={{ margin: '8px' }} />
                  <Box flex={6}>
                    <Typography>Distance between</Typography>
                    <Stack  direction={'row'} justifyContent="space-between" flex >
                      <TextField
                        id='distanceFrom'
                        label='From'
                        name='distanceFrom'
                        value={inputs.distanceFrom}
                        sx={{
                          minWidth: '75px',
                          maxWidth:'200px' }}
                        onChange={event => handleChange(event)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>&#62;=</InputAdornment>,
                        }}
                      />
                      <InputLabel sx={{ width: '80px', marginTop:2, marginRight: 1, marginLeft: 1 }} >and</InputLabel>
                      <TextField
                        id='distanceTo'
                        label='To'
                        name='distanceTo'
                        value={inputs.distanceTo}
                        sx={{
                          minWidth: '80px',
                          maxWidth:'200px' }}
                        onChange={event => handleChange(event)}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>&#60;=</InputAdornment>,
                        }}
                      />
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Stack>
            <Box marginTop={1} marginBottom={1} >
              <Button data-testid="filterButton" variant='contained' size='large' onClick={handleSubmit} sx={{ height: '50px' }} >Filter</Button>
              <span style={{ marginLeft: '16px' }} />
              <Button data-testid="resetButton" variant='contained' size='large' onClick={handleReset} >Reset</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default TripFilter
