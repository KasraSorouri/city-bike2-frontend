import React from 'react'
import { Box , Typography } from '@mui/material'

const AboutApp = () => {
  return(
    <Box margin={4}>
      <Typography variant="h4" gutterBottom >
        About this App
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
      This is the 2nd version app for showing bike trips and some statistics about bike stations.
      This was done as part of a pre-assignment challenge from <a href='https://www.solita.fi/sv/positions/dev-academy-to-boost-your-software-developer-career-5427532003/'><b>Solita</b></a>
      , and Solita provided the journey and station data.
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        The backend is built with <b>NodeJS</b> and <b>Express</b>, and the frontend is built with <b>ReactJS</b>.
        This version uses <b>GraphQL</b> for transmitting  data between backend and frontend.
      </Typography>
      <Typography variant="h4" gutterBottom marginTop={2}>
        Backend
      </Typography>
      <Typography variant="body1" gutterBottom align='left'>
        You can download the backend and find more information at:
        <a href='https://github.com/KasraSorouri/city-bike2-backend' data-testid='link-backend' > https://github.com/KasraSorouri/city-bike2-backend </a>
      </Typography>
      <Typography variant="h4" gutterBottom marginTop={2}>
        Frontend
      </Typography>
      <Typography variant="body1" gutterBottom align='left'>
         If you are only interested in the frontend, it is available at:
        <a href='https://github.com/KasraSorouri/city-bike2-frontend' data-testid='link-frontend'> https://github.com/KasraSorouri/city-bike2-frontend </a>
      </Typography>
      <Typography variant="h4" gutterBottom marginTop={2}>
        How it works
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Trips
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        Different functions can be selected from the top menu.
        All of the trips are displayed on the trips page. You can see more trips by visiting the other pages. The trips can also be filtered using the FILTER button at the top of the page.
        By clicking on the table header, you can sort the data.
      </Typography>
      <Typography variant="subtitle1" gutterBottom marginTop={2}>
        Stations
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        On the Stations page, you can find general information about bike stations
         such as name, address, capacity, and address. When you click on a station row,
         you are taken to the station info page, which displays some basic station statistics
         as well as the location of the station on the map.
      </Typography>
      <Typography variant="subtitle1" gutterBottom marginTop={2}>
        StationInfo
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        This page displays some basic statistics about the trips related to this station.
        such as the 5 stations that were popular destinations for trips that began at this station.
        and the top five origins for trips that end at these stations.
        Some station information, such as name, address, capacity, rounded trips, and map location.
      </Typography>
      <Typography variant="subtitle1" gutterBottom marginTop={2}>
        Upload Data
      </Typography>
      <Typography variant="body1" gutterBottom align='justify'>
        On this page Trips and Stations&apos; data can be uploaded as a CSV file.
      </Typography>
      <footer>
        <Typography variant="body2" gutterBottom align='center'>
        © 2023 casra
        </Typography>
      </footer>
    </Box>
  )
}

export default AboutApp