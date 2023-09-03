import React from 'react'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
} from '@mui/material'

import ConfigIcon from '@mui/icons-material/SettingsSuggest'


const Navigation = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Grid container justifyContent='space-between'>
          <Grid item flex>
            <Button color="inherit" component={Link} to='/'>
              About App
            </Button>
            <Button color="inherit" component={Link} to='/trips'>
              Trips
            </Button>
            <Button color="inherit" component={Link} to='/stations'>
              Stations
            </Button>
            <Button color="inherit" component={Link} to='/stationInfo'>
              StationInfo
            </Button>
            <Button color="inherit" component={Link} to='/uploadFiles'>
              Upload Data
            </Button>
            <Button color="inherit" component={Link} to='/data-analysis'>
              Data Analysis
            </Button>
          </Grid>
          <Grid>
            <Button color='inherit' component={Link} to='/config'>
              <ConfigIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  )
}

export default Navigation