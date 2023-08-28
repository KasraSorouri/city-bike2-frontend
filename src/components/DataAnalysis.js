import { useState, useEffect } from 'react'
//import * as d3 from 'd3'
import dataAnalysisService from '../services/dataAnalysis'
import LineChart from './dataAnalysis/LineChart'

const DataAnalysis = () => {
  const [data, setData] = useState([])
  const [ station, setStation ] = useState ({})

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
      {data.length > 1 && <LineChart data={data} station={station} />}
    </div>
  )
}

export default DataAnalysis
