import Notification from '../utils/Notification'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TablePagination,
  Box,
  TableRow,
  Stack,
  Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import TablePaginationActions from '../utils/tablePaginationActions'

import { useNavigate } from 'react-router-dom'

const Stations = (props) => {
  const { stationsData, pageParameter, changePage, changeRows, changeSort } = props
  const stations = stationsData.Stations
  const totalStations = stationsData.StationCount
  const order = pageParameter.sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = pageParameter.sort.sortItem

  const navigate = useNavigate()

  const columnHeader = [
    { id: 'stationId', lable: 'Station ID', minWidth: 5 },
    { id: 'stationName', lable: 'Station Name', minWidth: 130 },
    { id: 'capacity', lable: 'Station Capacity', minWidth: 30 },
    { id: 'city', lable: 'City', minWidth: 50 },
    { id: 'address', lable: 'Station Address', minWidth: 150 },
  ]

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }
    return (
      <TableHead>
        <TableRow>
          {columnHeader.map((column) => (
            <TableCell
              key={column.id}
              align='center'
              style={{ minWidth: column.minWidth }}
              sx={{ backgroundColor: '#1976d2', color: 'white' }}
              sortDirection={orderBy === column.id ? order : false }
            >
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : 'asc' }
                onClick={createSortHandler(column.id)}
              >
                {column.lable}
                {orderBy === column.id ? (
                  <Box  sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order ==='asc'
    changeSort({ sortItem: property, sortOrder:isAsc ? -1 : 1 })
  }

  if (!stations){
    return (
      <Notification text={'No station find!'} type={'error'} time={0} />
    )
  }

  return(
    <div>
      <Stack direction={'row'} columnGap={7}>
        <Typography variant='h3'>Stations information</Typography>
        {stationsData.StationCount !== stationsData.StationFilteredCount ?
          <Box marginTop={2.5}>
            <Notification text={`${stationsData.StationFilteredCount} of ${stationsData.StationCount} is filtered.`} time={0} />
          </Box>
          : null
        }
      </Stack>
      <Paper>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label='sticky table'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { stations.map((station) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={station.id} onClick={() => navigate('/stationInfo',{ state : { sid : station.stationId } }) } >
                    <TableCell align='center' >
                      {station.stationId}
                    </TableCell>
                    <TableCell align='left' >
                      {station.stationName}
                    </TableCell>
                    <TableCell align='center' >
                      {station.capacity}
                    </TableCell>
                    <TableCell align='center' >
                      {station.city}
                    </TableCell>
                    <TableCell align='left' >
                      {station.address}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component='div'
          count={totalStations}
          rowsPerPage={pageParameter.rows}
          page={pageParameter.page}
          onPageChange={(event, newPage) => changePage(newPage)}
          onRowsPerPageChange={(event) => changeRows(event.target.value)}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  )
}

export default Stations