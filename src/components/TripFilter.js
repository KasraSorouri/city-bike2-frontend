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
  useMediaQuery
} from '@mui/material'

const TripFilter = ({ changeFilter }) => {

  const [filteredOriginStations, setFilteredOriginStations] = useState([])
  const [filteredDestinationStations, setFilteredDestinationStations] = useState([])
  const [dates, setDates] = useState({ start: null, end: null })
  // Display improvment
  const isNarroww = useMediaQuery('(max-width:1040px)')

  const initialFilterPrameter = {
    originStation: '',
    destinationStation: '',
    durationFrom: '',
    durationTo: '',
    distanceFrom: '',
    distanceTo: '',
    timeFrom: '',
    timeTo: ''
  }
  const [inputs, setInputs] = useState(initialFilterPrameter)

  const maxItemsToShow = 10

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

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  // Filter the Departure station List based on input value
  const handleOriginStationListFilter = (event) => {
    console.log('filter ->', event.target.value)
    const filteredStations = stationList.filter(
      (station) =>
        station.stationName.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredOriginStations(filteredStations.slice(0, maxItemsToShow))
  }
  const originStationListParam = filteredOriginStations.length > 0 ? filteredOriginStations : stationList.slice(0, maxItemsToShow)

  // Filter the Destination station List based on input value
  const handleDestinationStationListFilter = (event) => {
    console.log('filter ->', event.target.value)
    const filteredStations = stationList.filter(
      (station) =>
        station.stationName.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredDestinationStations(filteredStations.slice(0, maxItemsToShow))
  }
  const DestinationStationListParam = filteredDestinationStations.length > 0 ? filteredDestinationStations : stationList.slice(0, maxItemsToShow)

  // Set the time limit
  const handleStartDate = (value) => {
    setDates(values => ({ ...values, 'start': value }))
  }
  const handleEndDate = (value) => {
    setDates(values => ({ ...values, 'end': value }))
  }

  // Convert filter parameter and send it to upper level
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('inputs ->', inputs)
    const filter = {
      departureStation: inputs.originStation ? stationList.filter((s) => s.stationName === inputs.originStation)[0].stationId : null,
      returnStation: inputs.destinationStation ? stationList.filter((s) => s.stationName === inputs.destinationStation)[0].stationId : null,
      departureTimeFrom: dates.start,
      returnTimeTo: dates.end,
      distanceFrom: Number(inputs.distanceFrom),
      distanceTo: Number(inputs.distanceTo),
      durationFrom: Number(inputs.durationFrom),
      durationTo: Number(inputs.durationTo),
    }
    console.log('filter ->', filter)
    changeFilter(filter)
  }

  const handleReset = () => {
    setDates({ start: null, end: null })
    changeFilter(null)
    setInputs(initialFilterPrameter)
  }

  return (
    <div>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
        flex={6}
      >
        <Grid container>
          <Grid>
            <Stack direction={'row'} flex justifyContent="space-between" >
              <Autocomplete
                id='originStation'
                name='originStation'
                options={originStationListParam}
                getOptionLabel={(option) => option.stationName}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Origin Station'
                    onChange={handleOriginStationListFilter}
                  />
                )}
                onChange={event => handleChange({ target: { name: 'originStation', value: event.target.innerText } })}
              />
              <Autocomplete
                id='destinationStation'
                name='destinationStation'
                options={DestinationStationListParam}
                getOptionLabel={(option) => option.stationName}
                renderInput={(params) => (
                  <TextField
                    key={params.id}
                    value={params.name}
                    {...params}
                    label='Destination Station'
                    onChange={handleDestinationStationListFilter}
                  />
                )}
                onChange={event => {
                  console.log('evet ***/**** ->', event)
                  handleChange({ target: { name: 'destinationStation', value: event.target.innerText } })
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
                <DatePicker
                  label='Time from'
                  name='startDate'
                  minDate={new Date(timeRanges.earliest)}
                  maxDate={new Date(timeRanges.latest)}
                  value={dates.start}
                  onChange={handleStartDate}
                  TextFieldComponent={(params) => <TextField {...params} sx={{ maxWidth: 150 }} />}
                />
                <DatePicker
                  label='Time to'
                  name='Trim to'
                  minDate={new Date(timeRanges.earliest)}
                  maxDate={new Date(timeRanges.latest)}
                  value={dates.end}
                  onChange={handleEndDate}
                  TextFieldComponent={(params) => <TextField {...params} sx={{ maxWidth: 150 }} />}
                />
              </LocalizationProvider>
            </Stack>
            <Stack direction={'row'} flex justifyContent="space-between" >
              <InputLabel sx={{ marginTop: 3 }}>Duration between</InputLabel>
              <TextField
                id='durationFrom'
                label='Duration >='
                name='durationFrom'
                value={inputs.durationFrom}
                sx={{ maxWidth: 80 }}
                onChange={(event) => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#62;=</InputAdornment>,
                }}
              />
              <InputLabel sx={{ marginTop: 3 }}>and</InputLabel>
              <TextField
                id='durationTo'
                label='Duration <='
                name='durationTo'
                value={inputs.durationTo}
                sx={{ maxWidth: 80 }}
                onChange={event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#60;=</InputAdornment>,
                }}
              />
              <InputLabel sx={{ marginTop: 3 }}>distance between</InputLabel>
              <TextField
                id='distanceFrom'
                label='Distance >='
                name='distanceFrom'
                value={inputs.distanceFrom}
                sx={{ maxWidth: 80 }}
                onChange={event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#62;=</InputAdornment>,
                }}
              />
              <InputLabel sx={{ marginTop: 3 }}>and</InputLabel>
              <TextField
                id='distanceTo'
                label='Distance <='
                name='distanceTo'
                value={inputs.distanceTo}
                sx={{ maxWidth: 80 }}
                onChange={event => handleChange(event)}
                InputProps={{
                  startAdornment: <InputAdornment position='start'>&#60;=</InputAdornment>,
                }}
              />
            </Stack>
          </Grid>
          <Grid>
            <Stack spacing={3} flex direction={isNarroww ? 'row' : 'column'} marginTop={2} marginBottom={1} >
              <Button data-testid="filterButton" variant='contained' size='large' onClick={handleSubmit}>Filter</Button>
              <Button data-testid="resetButton" variant='contained' size='large' onClick={handleReset}>Reset</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default TripFilter
