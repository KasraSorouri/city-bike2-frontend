import { useState, useRef } from 'react'
import fileService from '../services/fileService'
import {
  Button,
  Typography,
  //ToggleButton,
  //ToggleButtonGroup,
  //Stack,
  Box
}from '@mui/material'


const UploadFiles = () => {
  const [file, setFile] = useState(null)
  //const [result, setResult] = useState(null)
  //const [fileSelect, setFileSelect] = useState('trips')
  //const [duplicationCheck, setDuplicationCheck] = useState('true')
  const inputRef = useRef(null)

  const fileChangeHandler = (event) => {
    setFile(event.target.files)
    //setResult(null)
  }

  const fileUploadHandler = async() => {
    const response = await fileService.uploadFile(file[0])
    inputRef.current.value = null
    if (response) {
      setFile(null)
      //setResult(response)
    }
  }

  const UploadFile = () => {
    return(
      <div>
        <Box marginTop={5}>
          <Typography variant="h4" gutterBottom marginTop={3}>
            Here you can Upload the data CSV file for Trips and Station.
          </Typography>
          <Typography variant="h5" gutterBottom marginTop={3}>
            Upload trips file
          </Typography>
          <Typography variant="body1" gutterBottom align='justify'>
            For the trips, the first row should contain this information.
            <Box sx={{
              border: '2px  solid  black',
              backgroundColor: 'lightgray',
              marginTop: 3,
              marginBottom: 1
            }} >
              <i>Departure, Return, Departure station id, Departure station name, Return station id, Return station name, Covered distance (m), Duration (sec.)</i>
            </Box>
            * Except for the stations&apos; names, if other information is missed, that row is considered invalid.
            <Typography variant="h6" gutterBottom marginTop={3}>
              Upload Stations file
            </Typography>
            <p>  For the stations, the first row should contain this information.</p>
            <Box sx={{
              border: '2px  solid  black',
              backgroundColor: 'lightgray',
              marginTop: 3,
              marginBottom: 1
            }} >
              <i>ID, Name, Adress, Kaupunki, Operaattor, Kapasiteet , x, y</i>
            </Box>
            * If stations&apos; ID, Name, and Adress is missed, that row is considered invalid.
          </Typography>
        </Box>
        <input
          id='tripFile'
          type='file'
          ref={inputRef}
          accept=".csv"
          onChange={fileChangeHandler}
          style={{ display: 'none' }}
        />
        <label htmlFor='tripFile' style={{ borderStyle:'solid',
          borderRadius:5,
          padding: 6,
          paddingRight:80
        }}>{ file ? file[0].name : 'Click to Upload csv file' }</label>
        <Button onClick={fileUploadHandler} variant="contained" >
          Upload
        </Button>
        <br/>
      </div>
    )
  }

  return (
    <div>
      <UploadFile />
    </div>
  )
}

export default UploadFiles