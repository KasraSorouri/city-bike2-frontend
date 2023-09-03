import axios from 'axios'

const baseUri = '/api/dataAnalysis'


const getData = async (sid) => {
  const result = await axios.get(`${baseUri}/${sid}`)
  //console.log('** data visualization * service * result -> ', result)
  return result.data
}

const getDestinationData = async (sid) => {
  const result = await axios.get(`${baseUri}/${sid}/destination`)
  //console.log('** data visualization * service * result -> ', result)
  return result.data
}

const analyseData = async () => {
  const result = await axios.post(`${baseUri}/`)
  return result.data
}

export default {
  getData,
  getDestinationData,
  analyseData
}