import axios from 'axios'

const baseUri = '/api/upload'

const uploadFile = async(file) => {
  const formData = new FormData()
  formData.append(
    'csvFile',
    file,
    file.name
  )
  const  response = await axios.post(`${baseUri}/upload-csv`, formData)
  console.log(response.data)
  return response.data
}

export default { uploadFile }