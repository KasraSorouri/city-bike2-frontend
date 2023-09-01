import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const LineChart = ({ data, station }) => {
  const margin = { top: 20, right: 200, bottom: 20, left: 20 }
  const width = 1630 - margin.left - margin.right
  const height = 650 - margin.top - margin.bottom

  const svgRef = useRef()

  useEffect(() => {
    if (data.length === 0) return

    const svg = d3.select(svgRef.current)

    data.forEach(d => {
      d.timeStamp = new Date(d.timeStamp)
      d.bikeQty = +d.bikeQty // Convert bikes to a number
      d.modifiedBikeQty = +d.modifiedBikeQty
    })

    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => d.timeStamp))
      .range([0, width])


    const yScale = d3.scaleLinear()
      .domain([Math.min(0, d3.min(data, d => d.bikeQty)), d3.max(data, d => d.bikeQty)])
      .nice()
      .range([height, 0])

    const line = d3.line()
      .x(d => xScale(d.timeStamp))
      .y(d => yScale(d.bikeQty))

    const line2 = d3.line()
      .x(d => xScale(d.timeStamp))
      .y(d => yScale(d.modifiedBikeQty))

    svg.selectAll('*').remove() // Clear existing content

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', line)

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', line2)


    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', yScale(station.capacity))
      .attr('y2', yScale(station.capacity))
      .attr('stroke', 'green')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3,3') // Add dashes to the line

    Math.min(0, d3.min(data, d => d.bikeQty)) < 0 && (
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', yScale(0))
        .attr('y2', yScale(0))
        .attr('stroke', 'red')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3') // Add dashes to the line
    )
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
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

    // Mark specific quantities on the Y-axis
    const quantitiesToMark = [0, 10, 20, 30, 40, station.capacity, d3.max(data, d => d.bikeQty)]
    quantitiesToMark.forEach(quantity => {
      svg.append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', yScale(quantity))
        .attr('y2', yScale(quantity))
        .attr('stroke', 'gray')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '3,3') // Add dashes to the line

      svg.append('text')
        .attr('x', width + 5)
        .attr('y', yScale(quantity))
        .attr('dy', '0.3em')
        .style('fill', 'gray')
        .text(`${quantity}`)
    })


    svg.append('text')
      .attr('x', width)
      .attr('y', yScale(data[data.length - 1].bikeQty+15)) // Position at the end of the line
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('fill', 'steelblue')
      .text('Original Bike Quantity')

    svg.append('text')
      .attr('x', width)
      .attr('y', yScale(data[data.length - 1].modifiedBikeQty+15)) // Position at the end of the line
      .attr('dy', '-0.7em')
      .attr('text-anchor', 'end')
      .style('fill', 'black')
      .text('Modified Bike Quantity')

    // Add a legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 150},${margin.top - 20})`) // Adjust the positioning as needed

    // Add legend items
    const legendItems = [
      { label: 'Original Bike Quantity', color: 'steelblue' },
      { label: 'Modified Bike Quantity', color: 'black' }
      // Add more legend items if needed
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

  }, [data])

  return (
    <svg ref={svgRef} width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}></svg>
  )
}


export default LineChart
