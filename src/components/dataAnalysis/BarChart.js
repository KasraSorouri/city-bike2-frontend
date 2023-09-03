import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

import { Typography } from '@mui/material'


const BarChart = ({ data }) => {
  const svgRef = useRef()

  useEffect(() => {
    if (data.length === 0) return

    const svg = d3.select(svgRef.current)
    const width = +svg.attr('width')
    const height = +svg.attr('height')
    const margin = { top: 30, right: 20, bottom: 40, left: 10 }

    const innerWidth = width - margin.left - margin.right
    const innerHeight1 = height - margin.top - margin.bottom -150
    const innerHeight2 = height - margin.top - margin.bottom - innerHeight1 + 55

    svg.selectAll('*').remove() // Clear existing content

    // Convert Data
    data.forEach(d => {
      d.timeStamp = new Date(d.timeStamp)
      d.bikeQty = +d.bikeQty
      d.modifiedBikeQty = +d.modifiedBikeQty
    })

    // Group Data
    const aggregatedData = d3.group(data, (d) => d3.timeDay(d.timeStamp), (d) => d.actionType)
    const analizedData = []

    for (const day of aggregatedData) {
      analizedData.push({
        day: day[0],
        departure: day[1].get('departure') ? day[1].get('departure').length : 0,
        return: day[1].get('return') ? day[1].get('return').length : 0,
      })
    }

    // Barchart
    // - Departure and Returen Chart
    const xScale = d3.scaleBand()
      .domain(analizedData.map(d => d.day))
      .range([0, innerWidth])
      .padding(0.2)

    const yScale = d3.scaleLinear()
      .domain([Math.min(0, d3.min(analizedData, d => d.departure-d.return)+100), d3.max(analizedData, d => d.departure+d.return)])
      .nice()
      .range([innerHeight1, margin.top])

    const departureColor = '#00e600'
    const returnColor = '#33ccff'

    const series = d3.stack()
      .keys(['departure', 'return'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone)(analizedData)

    const color = d3.scaleOrdinal()
      .domain(['departure', 'return'])
      .range([departureColor, returnColor])

    svg.append('g')
      .selectAll()
      .data(series)
      .join('g')
      .attr('fill', d => color(d.key))
      .selectAll('rect')
      .data(d => d)
      .join('rect')
      .attr('x', d => xScale(d.data.day))
      .attr('y', d => yScale(d[1]))
      .attr('height', d => yScale(d[0]) - yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .append('title')
      .text(d => `${d.data.day}\n${d.key}: ${d[1] - d[0]}`)


    // Axels
    // - Axel X
    svg.append('g')
      .attr('transform', `translate(0,${innerHeight1})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .text(d => {
        const formattedDay = new Date(d).toLocaleDateString('en-US', { weekday: 'short' })
        if (formattedDay === 'Mon') {
          return new Date(d).toLocaleDateString('en-US',{ day: '2-digit' , month: 'short' })
        }
        return formattedDay
      })
      .attr('transform', 'rotate(-90)')
      .attr('x',-25)

    // - Axel Y
    svg.append('g')
      .call(d3.axisLeft(yScale))

    // Legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${innerWidth - 100 },${0})`)
    const legendItems = [
      { label: 'Departure', color: departureColor },
      { label: 'Retuen', color: returnColor }
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
    let quantitiesToMark =  []
    for ( let i = 10; i <= d3.max(analizedData, d => d.departure +d .return) ; i += 20 ) {
      quantitiesToMark.push(i)
    }
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

      // Balance Chart
      // Balance Data
      const balanceData = analizedData.map(d => {
        return ({
          day: d.day,
          difference: d.return - d.departure
        })
      })

      const balanceScale = d3.scaleLinear()
        .domain([
          Math.max(d3.max(balanceData, d => Math.abs(d.difference)), -d3.min(balanceData, d => Math.abs(d.difference))),
          -Math.max(d3.max(balanceData, d => Math.abs(d.difference)), -d3.min(balanceData, d => Math.abs(d.difference)))
        ])
        .nice()
        .range([0, innerHeight2])

      const balanceChart = svg.append('g')
        .attr('transform', `translate(0, ${innerHeight1+30})`)

      balanceChart.selectAll('rect')
        .data(balanceData)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.day))
        .attr('y', (d) => (d.difference >= 0 ? balanceScale(d.difference) : balanceScale(0)))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => Math.abs(balanceScale(0) - balanceScale(d.difference)))
        .attr('fill', (d) => (d.difference >= 0 ? 'blue' : 'red'))

      balanceChart.append('g')
        .call(d3.axisLeft(balanceScale))

      // Balance Chart Axel
      balanceChart.append('line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1',  balanceScale(0))
        .attr('y2',  balanceScale(0))
        .attr('stroke', 'black')
        .attr('stroke-width', 1)

      // Balance Chart Label
      balanceChart.selectAll('text')
        .data(balanceData)
        .enter()
        .append('text')
        .attr('x', (d) => xScale(d.day) + xScale.bandwidth() / 2)
        .attr('y', (d) => {
          if (d.difference >= 0) {
            return balanceScale(d.difference) -5
          } else {
            return balanceScale(d.difference) +15
          }
        })
        .attr('text-anchor', 'middle')
        .text((d) => d.difference)
    })

  }, [data])

  return (
    <div>
      <Typography>Departure and Return</Typography>
      <svg ref={svgRef} width='1200' height='650' />
    </div>
  )
}


export default BarChart
