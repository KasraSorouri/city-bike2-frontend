import { useState, useEffect } from 'react'
import dataAnalysisService from '../services/dataAnalysis'
import LineChart from './dataAnalysis/LineChart-Group'
import ChordChart from './dataAnalysis/ChordChart'
import BarChart from './dataAnalysis/BarChart'

const DataAnalysis = () => {
  const [data, setData] = useState([])
  const [station, setStation ] = useState ({})
  //console.log(data, station)

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await dataAnalysisService.getData()
      setData(fetchedData.analysedData)
      setStation(fetchedData.station[0])
    }
    getData()
  }, [])

  return (
    <div>
      <p>Data</p>
      { data.length > 1 && <BarChart data={data} station={station} /> }
      { data.length > 1 && <LineChart data={data} station={station} /> }
      <ChordChart />
    </div>
  )
}

export default DataAnalysis
