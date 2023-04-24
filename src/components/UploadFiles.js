import { useState } from 'react'
import fileService from '../services/fileService'
import Notification from '../utils/Notification'
import {
  Button,
  Typography,
  Box,
} from '@mui/material'


const UploadFiles = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)

  const fileChangeHandler = (event) => {
    setFile(event.target.files)
  }

  const fileUploadHandler = async () => {
    try{
      const response = await fileService.uploadFile(file[0])
      if (response) {
        setResult(response)
        setFile(null)
      }
    } catch (err) {
      return(
        <Notification text={err} type={'error'} time={10} />
      )
    }
  }

  const UploadFile = () => {
    return (
      <div>
        <Box marginTop={5}>
          <Typography variant="h6" gutterBottom marginTop={3}>
            Here you can Upload the CSV file that includes Trips and Stations data.          </Typography>
          <Typography variant="h5" gutterBottom marginTop={1}>
            Upload trips file
          </Typography>
          <Typography variant="body1" gutterBottom align='justify'>
            For the trips, the first row should contain this information.
          </Typography>
          <Box sx={{
            border: '2px  solid  black',
            backgroundColor: 'lightgray',
            width: 'fit-content',
            marginInline: 2,
            display: 'flex',
            marginTop: 1,
            marginBottom: 1
          }}>
            <Typography variant="body1" gutterBottom margin={1} sx={{ fontStyle: 'italic' }}>
              Departure, Return, Departure station id, Departure station name, Return station id, Return station name, Covered distance (m), Duration (sec.)
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom align='justify' sx={{ marginInline: 2, display: 'flex' }} >
            * Except for the stations&apos; names, if other information is missed, that row is considered invalid.
          </Typography>
          <Typography variant="h5" gutterBottom marginTop={3}>
            Upload Stations file
          </Typography>
          <Typography variant="body1" gutterBottom align='justify'>
            For the stations, the first row should contain this information.
          </Typography>
          <Box sx={{
            border: '2px  solid  black',
            backgroundColor: 'lightgray',
            width: 'fit-content',
            marginInline: 2,
            display: 'flex',
            marginTop: 1,
            marginBottom: 1
          }}>
            <Typography variant="body1" gutterBottom margin={1} sx={{ fontStyle: 'italic' }}>
              ID, Name, Adress, Kaupunki, Operaattor, Kapasiteet , x, y
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom align='justify' sx={{ marginInline: 2, display: 'flex' }} >
            * If stations&apos; ID, Name, and Adress is missed, that row is considered invalid.
          </Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Upload a File
          </Typography>
          <label>
            <Button variant="outlined" component="span" fullWidth sx={{ marginBottom: 2 }} data-testid="file-upload">
              {file ? <Typography>file:  {file[0].name} </Typography> : 'Please choose a CSV file'}
            </Button>
            <input
              id="file-upload-input"
              data-testid="file-upload-input"
              type="file"
              accept=".csv"
              onChange={fileChangeHandler}
              style={{ display: 'none' }}
            />
          </label>
          {file && (
            <Button variant="contained" onClick={fileUploadHandler} mt={2} fullWidth >
              Upload
            </Button>
          )}
          {file && (
            <Button variant="contained" onClick={() => setFile(null)} mt={2} fullWidth sx={{ marginTop: 2 }}>
              Cancel
            </Button>
          )}
        </Box>
      </div>
    )
  }

  const UploadStatus = () => {
    return (
      <div>
        <Typography variant='body1'>{result.status}</Typography>
        <Typography variant='body1'>the files contains <b>{result.dataType.dataType}</b> data.</Typography>
        <Typography variant='body1'>the files contains <b>{result.dataType.fileRows}</b> Rows.</Typography>
        <Typography variant='body1'> <b>{result.dataType.recordAdded}</b> new data add to the database.</Typography>
        <Typography variant='body1'> <b>{result.dataType.dataInavlid}</b> data add were invalid.</Typography>
        <Typography variant='body1'> <b>{result.dataType.duplicateRecord}</b> data add were duplicated.</Typography>
        <Button variant="contained" onClick={() => setResult(null) } >OK</Button>
      </div>
    )
  }

  return (
    <div>
      <UploadFile />
      { result ? <UploadStatus  /> : null }
    </div>
  )
}

export default UploadFiles