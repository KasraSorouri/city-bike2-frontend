import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { Typography } from '@mui/material'

const LineChart = ({ data, station }) => {
  const svgRef = useRef()

  useEffect(() => {
    if (data.length === 0) return

    const svg = d3.select(svgRef.current)
    const width = +svg.attr('width')
    const height = +svg.attr('height')
    const margin = { top: 50, right: 20, bottom: 10, left: 10 }

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const minBikeColor = 'red'
    const endBikeColor = 'blue'
    const endModifBikeColor = 'black'


    svg.selectAll('*').remove() // Clear existing content

    // Convert Data
    data.forEach(d => {
      d.timeStamp = new Date(d.timeStamp)
      d.bikeQty = +d.bikeQty // Convert bikes to a number
      d.modifiedBikeQty = +d.modifiedBikeQty
    })

    // Group Data
    const aggregatedData = d3.group(data, (d) => d3.timeDay(d.timeStamp))
    const analizedData = []

    for (const day of aggregatedData) {
      const minBikeQty = Math.min(...day[1].map(d => d.bikeQty))
      const maxBikeQty = Math.max(...day[1].map(d => d.bikeQty))
      const lastBikeQty = day[1][day[1].length - 1].bikeQty
      const minModifiedBikeQty = Math.min(...day[1].map(d => d.modifiedBikeQty))
      const maxModifiedBikeQty = Math.max(...day[1].map(d => d.modifiedBikeQty))
      const lastModifiedBikeQty = day[1][day[1].length - 1].modifiedBikeQty

      analizedData.push({
        day: day[0],
        minBikeQty,
        maxBikeQty,
        lastBikeQty,
        minModifiedBikeQty,
        maxModifiedBikeQty,
        lastModifiedBikeQty
      })
    }

    // Line Chart
    // - Bikes Qty
    const xScale = d3.scaleTime()
      .domain(d3.extent(analizedData, d => d.day))
      .range([0, innerWidth])

    const yScale = d3.scaleLinear()
      .domain([Math.min(0, d3.min(analizedData, d => d.minBikeQty)), d3.max(analizedData, d => d.maxBikeQty)])
      .nice()
      .range([innerHeight, margin.top])

    // Min Modifed Bikes
    const minLine = d3.line()
      .x(d => xScale(d.day))
      .y(d => yScale(d.minModifiedBikeQty))

    // Ramin bikes in the end of day
    const lastLine = d3.line()
      .x(d => xScale(d.day))
      .y(d => yScale(d.lastBikeQty))

    // Remain Modified bikes in the end of day
    const modifiedLine = d3.line()
      .x(d => xScale(d.day))
      .y(d => yScale(d.lastModifiedBikeQty))

    // - Min Modifed Bikes
    svg.append('path')
      .datum(analizedData)
      .attr('fill', 'none')
      .attr('stroke', minBikeColor)
      .attr('stroke-width', 1.5)
      .attr('d', minLine)
      .attr('xScale', xScale)
      .attr('yScale', yScale)

    //  - Ramin bikes in the end of day
    svg.append('path')
      .datum(analizedData)
      .attr('fill', 'none')
      .attr('stroke', endBikeColor)
      .attr('stroke-width', 1.5)
      .attr('d', lastLine)
      .attr('xScale', xScale)
      .attr('yScale', yScale)

    // - Remain Modified bikes in the end of day
    svg.append('path')
      .datum(analizedData)
      .attr('fill', 'none')
      .attr('stroke', endModifBikeColor)
      .attr('stroke-width', 1.5)
      .attr('d', modifiedLine)
      .attr('xScale', xScale)
      .attr('yScale', yScale)

    // Axels
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))

    svg.append('g')
      .call(d3.axisLeft(yScale))

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left  + 5 ) // Position to the left of the Y-axis
      .attr('dy', '-2.5em')
      .attr('text-anchor', 'middle')
      .style('fill', 'black')
      .text('Bike Quantity')

    // Legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${innerWidth - 150 },${0})`)
    const legendItems = [
      { label: 'Reamin Modified Bikes', color: endModifBikeColor },
      { label: 'Reamin Bikes', color: endBikeColor },
      { label: 'Min Modified Bikes', color: minBikeColor },
    ]

    legendItems.forEach((item, index) => {
      const legendItem = legend.append('g')
        .attr('transform', `translate(0, ${index * 20})`) // Adjust spacing between items

      legendItem.append('rect')
        .attr('width', 18)
        .attr('height', 18)
        .attr('fill', item.color)

      legendItem.append('text')
        .attr('x', 25)
        .attr('y', 9)
        .attr('dy', '0.32em')
        .style('font-size', '14px')
        .text(item.label)
    })

    // Mark specific quantities on the Y-axis
    let quantitiesToMark =  [0,10]
    for ( let i = 10; i <= d3.max(data, d => d.bikeQty) ; i += 10 ) {
      quantitiesToMark.push(i)
      console.log('** quantitiesToMark->',i)

    }
    console.log('** quantitiesToMark->',quantitiesToMark)
    quantitiesToMark.forEach(quantity => {
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', yScale(quantity))
        .attr('y2', yScale(quantity))
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3') // Add dashes to the line

      svg.append('text')
        .attr('x', innerWidth + 5)
        .attr('y', yScale(quantity))
        .attr('dy', '0.3em')
        .style('fill', 'gray')
        .text(`${quantity}`)
    })

    // Mark Station Capacity
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', innerWidth)
      .attr('y1', yScale(station.capacity))
      .attr('y2', yScale(station.capacity))
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3') // Add dashes to the line

    svg.append('text')
      .attr('x', innerWidth + 5)
      .attr('y', yScale(station.capacity))
      .attr('dy', '0.3em')
      .style('fill', 'green')
      .text(`${station.capacity}`)



  }, [data])

  return (
    <div>
      <Typography>Quantity of Bikes</Typography>
      <svg ref={svgRef} width='1200' height='500' />
    </div>
  )
}


export default LineChart
