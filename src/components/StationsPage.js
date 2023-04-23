import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { STATIONS, STATION_LIST } from '../queries'
import Togglable from './Togglable'
import Stations from './Stations'
import StationFilter from './StationFilter'
import Notification from '../utils/Notification'

const StationsPage = () => {
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState(10)
  const [ sort, setSort ] = useState({ sortItem: 'stationId' , sortOrder: 1 })
  const [ filterParameters, setFilterParameters ] = useState()

  const sortParam = sort.sortItem
  const sortOrder = sort.sortOrder
  const pageParameter = { page, rows, sort }

  let stationList = []
  const stationParameter = useQuery(STATION_LIST)
  const result = useQuery(STATIONS, { variables: { page, rows, sortParam, sortOrder , ...filterParameters } })
  if (result.loading) {
    return <p>loading .....</p>
  }
  if (result.error) {
    return (
      <Notification text={result.error.message} type={'error'} time={0} />
    )
  }

  const stationsData = result.data

  if (stationParameter.data) {
    stationList = stationParameter.data.StationList
  }

  const handelFilter = async(filterData) => {
    setFilterParameters(filterData)
    setPage(0)
  }

  const handleChangePage = (page) => {
    setPage(page)
  }

  const handleChangeRows = (rows) => {
    setRows(rows)
    setPage(0)
  }

  const handleSort = (sort) => {
    setSort(sort)
    setPage(0)
  }

  const filterActived = filterParameters ? true : false

  return(
    <div>
      <Togglable buttonLabel='Filter' active={ filterActived }>
        <StationFilter changeFilter={handelFilter} filterParameters={filterParameters} stationList={stationList} />
      </Togglable>
      <Stations stationsData={stationsData} pageParameter={pageParameter} changePage={handleChangePage} changeRows={handleChangeRows} changeSort={handleSort} />
    </div>
  )
}

export default StationsPage