import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import dataAnalysisService from '../services/dataAnalysis'
import LineChart from './dataAnalysis/LineChart-Group'
import ChordChart from './dataAnalysis/ChordChart'
import BarChart from './dataAnalysis/BarChart'
import { Box, Typography } from '@mui/material'

const DataAnalysis = () => {
  const location = useLocation()
  const { sid } = location.state ? location.state : '001'
  console.log('data analysis * sid ->', sid)
  const [data, setData] = useState([])
  const [station, setStation ] = useState ({})
  //console.log(data, station)
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await dataAnalysisService.getData(sid)
      setData(fetchedData.analysedData)
      setStation(fetchedData.station[0])
    }
    getData()
  }, [])

  return (
    <Box margin={2}>
      <Typography variant='h4'>Analysis of the station <b>{station.stationName}</b> with id:{station.stationId} </Typography>
      { data.length > 1 && <BarChart data={data} station={station} /> }
      { data.length > 1 && <LineChart data={data} station={station} /> }
      <ChordChart />
    </Box>
  )
}

export default DataAnalysis
