import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Box,
  useMediaQuery,
  Container,
} from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import TablePaginationActions from '../utils/tablePaginationActions'
import dateFormat from 'dateformat'

const Trips = (props) => {
  const { tripsData, pageParameter, changePage, changeRows, changeSort } = props
  const trips = tripsData.Trips
  const totalTrips = tripsData.TripCount
  const order = pageParameter.sort.sortOrder === 1 ? 'asc' : 'desc'
  const orderBy = pageParameter.sort.sortItem

  const columnHeader = [
    { id: 'departureStationName', lable: 'Departure Station' },
    { id: 'departure', lable: 'Departure Time' },
    { id: 'returnStationName', lable: 'Destination Station' },
    { id: 'return', lable: 'Destination Time' },
    { id: 'duration', lable: 'Duration (min)' },
    { id: 'distance', lable: 'Distance (Km)' }
  ]

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
      props
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property)
    }

    return (
      <TableHead >
        <TableRow >
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

  if (!trips){
    return (
      <div style={{ color:'red' }}>
        <h2>No trip find!</h2>
      </div>
    )
  }

  // Display improvment
  const isNarrow = useMediaQuery('(max-width:1024px)')

  return(
    <Container>
      <h2>Trips information</h2>
      <Paper>
        <TableContainer
          sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label='sticky table' >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { trips.map((trip) => {
                return(
                  <TableRow hover role='checkbox' tabIndex={-1} key={trip.id}>
                    <TableCell align='left' >
                      {trip.departureStationName}
                    </TableCell>
                    <TableCell align='center' >
                      {isNarrow ? dateFormat(trip.departure,'dd.mm.yyyy') : dateFormat(trip.departure,'dd.mm.yyyy  HH:MM')}
                    </TableCell>
                    <TableCell align='left' >
                      {trip.returnStationName}
                    </TableCell>
                    <TableCell align='center'  >
                      {isNarrow ? dateFormat(trip.departure,'dd.mm.yyyy') : dateFormat(trip.departure,'dd.mm.yyyy  HH:MM')}
                    </TableCell>
                    <TableCell align='center'>
                      {trip.duration.toFixed(0)}
                    </TableCell>
                    <TableCell align='center' >
                      {trip.distance.toFixed(2)}
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
          colSpan={3}
          count={totalTrips}
          rowsPerPage={pageParameter.rows}
          page={pageParameter.page}
          onPageChange={(event, newPage) => changePage(newPage)}
          onRowsPerPageChange={(event) => changeRows(event.target.value)}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </Container>
  )
}

export default Trips