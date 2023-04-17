import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { TRIPS } from '../queries'
import Togglable from './Togglable'
import Trips from './Trips'
import TripFilter from './TripFilter'

const TripsPage = () => {
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState(10)
  const [ sort, setSort ] = useState({ sortItem: 'departure' , sortOrder: -1 })
  const [ filterParameters, setFilterParameters ] = useState()
  const sortParam = sort.sortItem
  const sortOrder = sort.sortOrder
  const pageParameter = { page, rows, sort }

  const result = useQuery(TRIPS, { variables: { page, rows, sortParam, sortOrder , ...filterParameters } })
  if (result.loading) {
    return <p>loading .....</p>
  }

  const tripsData = result.data

  const handelFilter = async(filterData) => {
    setFilterParameters(filterData)
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
        <TripFilter changeFilter={handelFilter} filterParameters={filterParameters} />
      </Togglable>
      <Trips tripsData={tripsData} pageParameter={pageParameter} changePage={handleChangePage} changeRows={handleChangeRows} changeSort={handleSort} />
    </div>
  )
}

export default TripsPage