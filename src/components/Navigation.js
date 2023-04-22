import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, Grid } from '@mui/material'

const Navigation = () => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Grid container flex alignItems="left" justify="flex-start">
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  )
}

export default Navigation