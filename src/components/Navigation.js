import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button, IconButton } from '@mui/material'

const Navigation = () => {
  return (
    <AppBar position='static' >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to='/'>
          About App
        </Button>
        <Button color="inherit" component={Link} to='/trips'>
          Trips
        </Button>
        <Button color="inherit" component={Link} to='/stations'>
          Stations
        </Button>
        <Button color="inherit" component={Link} to='/station'>
          StationInfo
        </Button>
        <Button color="inherit" component={Link} to='/uploadFiles'>
          Upload Data
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation