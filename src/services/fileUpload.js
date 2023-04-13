import axios from 'axios'

const baseUri = 'http://localhost:3005/ping'

const test = async() => {
  const  response = await axios.get(baseUri)
  console.log(response.data)
  return response.data
}

export default test