import axios from 'axios'

const baseUri = '/api/dataAnalysis/'


const getData = async () => {
  const result = await axios.get(`${baseUri}/131`)
  //console.log('** data visualization * service * result -> ', result)
  return result.data
}

const getDestinationData = async () => {
  const result = await axios.get(`${baseUri}/131/destination`)
  //console.log('** data visualization * service * result -> ', result)
  return result.data
}

export default {
  getData,
  getDestinationData
}