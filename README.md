# About
This is a client side of basic app for showing bike trips and some statistics about bike stations. It was done based on a pre-assignment challenge from Solita, and Solita supplied the journey and station data.

To make the application working, you also need a backend server, which you can clone: 

```
> git clone https://github.com/KasraSorouri/city-bike2-backend
```
Alternatively, you can use the cloud version, which has some limitations and is available until the end of February 2023 on:
```
https://citybike-v2.onrender.com/api
```

# Frontend
 Frontend is based on React.JS and GraphQL, Apollo/Client, and MaterialUI. According to Mui the supported browsers listed in below table.
 <table>
<thead>
<tr>
<th align="left">Edge</th>
<th align="left">Firefox</th>
<th align="left">Chrome</th>
<th align="left">Safari (macOS)</th>
<th align="left">Safari (iOS)</th>
<th align="left">IE</th>
</tr>
</thead>
<tbody><tr>
<td align="left">&gt;= 91</td>
<td align="left">&gt;= 78</td>
<td align="left">&gt;= 90</td>
<td align="left">&gt;= 14</td>
<td align="left">&gt;= 12.5</td>
<td align="left">11 (partial support)</td>
</tr>
</tbody></table>
The app is available on : https://citybike-v2.onrender.com/

## Prerequisite 
You need to have Node 18.12.1 and npm installed on your machine.
The versions which been mentioned above are based on the one I have on my personal computer.

# Run
To run the app, you can use 
```
> npm start 
```
if everything goes well the app start on port 3000

# Features
The app consists of 5 pages. Which can be navigated to by the App bar top menu.

### About App
shows information about app.

### Trips:
Different functions can be selected from the top menu. All of the trips are displayed on the trips page. You can see more trips by visiting the other pages. The trips can also be filtered using the FILTER button at the top of the page. By clicking on the table header, you can sort the data.

### Stations:
On the Stations page, you can find general information about bike stations such as name, address, capacity, and address. When you click on a station row, you are taken to the station info page, which displays some basic station statistics as well as location of the station on the map. 

### Station Info:
This page displays some basic statistics about the trips related with this station. such as the 5 stations that were popular destinations for trips that began at this station. and the top five origins for trips that end at these stations. Some station information, such as name, address, capacity, rounded trips, and map location.
The station can be chosen directly on this page as well, by the selecting a station on the top corner input. 

### Uploading the new file
On this page Trips, and Stations data can be uploaded as a CSV file that contains data for the Trips or The Stations. The first row determines the data type and will be ignored by the program and treated as a headline. 

# Test
Unit test can be run by:
```
>	npm run test
```

# E2E Test
For E2E testing tools, I selected [Cypress](https://www.cypress.io).
To run the test both frontend and backend should be started.
To start the backend for the test mode run:
```
>	npm run start:test
```
and start the frontend by:
```
>	npm start
```
then E2E test can be started in the graphical test runner mode by the command below.
```
>	npm run cypress:open
```
or  to run the test in the command line mode use 
```
>	npm run test:e2e
```

### City-bike App     
#### Test Visual Content       
✓ Front page open correctly        
✓ App menu are visbale and functioning        
#### Test Trip Page         
✓ Test Table content          
✓ Test Pagination          
✓ Test Filter        
#### Test Station Page         
✓ Test Table content          
✓ Test Pagination        
#### Test Station Info Page         
✓ page forward to station info by click on station          
✓ Show Statistics 
