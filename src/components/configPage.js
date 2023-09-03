import React from 'react'
import {
  Box,
  Button
} from '@mui/material'

import dataAnalysisService from '../services/dataAnalysis'

const ConfigPage = () => {

  return(
    <Box margin={5}>
      <Button variant='contained'  onClick={() => dataAnalysisService.analyseData()}>
        Analyse now
      </Button>
    </Box>
  )
}

export default ConfigPage