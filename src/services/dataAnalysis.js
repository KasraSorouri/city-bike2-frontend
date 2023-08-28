import axios from 'axios'

const baseUri = '/api/dataAnalysis/131'


const getData = async () => {
  const result = await axios.get(baseUri)
  //console.log('** data visualization * service * result -> ', result)
  return result.data
}

export default {
  getData
}