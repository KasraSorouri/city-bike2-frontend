import { useState } from 'react'
import {
  Box,
  Grid,
  Autocomplete,
  TextField,
  Stack,
  Button,
} from '@mui/material'

const StationFilter = ({ changeFilter, filterParameters, stationList }) => {
  const [filteredStations, setFilteredStations] = useState([])

  let station = []
  if (filterParameters){
    station = (filterParameters.stationId) ?
      stationList.filter((s) => filterParameters.stationId.includes(s.stationId))
      : []
  }

  let initialFilterPrameter = {
    station,
  }

  const [inputs, setInputs] = useState(initialFilterPrameter)

  const maxItemsToShow = 200

  // Handle fields update
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  // Filter the Destination station List based on input value
  const handleStationListFilter = (event) => {
    const filteredStations = stationList.filter(
      (station) =>
        station.stationName.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredStations(filteredStations.slice(0, maxItemsToShow))
  }
  const stationListParam = filteredStations.length > 0 ? filteredStations : stationList.slice(0, maxItemsToShow)

  // Convert filter parameter and send it back
  const handleSubmit = (event) => {
    event.preventDefault()

    const filter = {
      stationId: (inputs.station) ? inputs.station.map((s) => s.stationId):
        (station) ? station.stationId : null,
    }
    changeFilter(filter)
  }

  const handleReset = () => {
    setInputs({
      stationId: [],
      station: [],
    })
    changeFilter(null)
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
                multiple
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
                    label='Station'
                    onChange={handleStationListFilter}
                  />
                )}
                isOptionEqualToValue={(option, value) => option.stationId === value.stationId}
              />
              <Button data-testid="filterButton" variant='contained' size='large' onClick={handleSubmit} sx={{ height: '50px' , margin: 1 }} >Filter</Button>
              <span style={{ margin: '5px' }} />
              <Button data-testid="resetButton" variant='contained' size='large' onClick={handleReset} sx={{ height: '50px' , margin: 1 }} >Reset</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default StationFilter
