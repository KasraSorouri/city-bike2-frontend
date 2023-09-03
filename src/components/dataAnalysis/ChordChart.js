import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

import { Typography } from '@mui/material'

import dataAnalysisService from '../../services/dataAnalysis'

const ChordChart = ({ sid }) => {
  const [data, setData] = useState([])
  console.log('chord * sid',sid)
  // Get Data
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await dataAnalysisService.getDestinationData(sid)
      setData(fetchedData.slice(0,19))
    }
    getData()
  }, [])

  const svgRef = useRef()

  // Chord Chart
  useEffect(() => {
    if (data.length === 0) return

    // Dimantions
    const svg = d3.select(svgRef.current)
    const width = +svg.attr('width')
    const height = width
    const margin = { top: 10, right: 10, bottom: 10, left: 10 }

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const innerRadius = Math.min(innerWidth, innerHeight) * 0.5 - 50
    const outerRadius = innerRadius + 6

    svg.selectAll('*').remove() // Clear existing content

    const names = Array.from(d3.union(data.flatMap(d => [d.source, d.target])))
    const index = new Map(names.map((name, i) => [name, i]))
    const matrix = Array.from(index, () => new Array(names.length).fill(0))
    for (const { source, target, value } of data)
      matrix[index.get(source)][index.get(target)] += value

    const chord = d3.chordDirected().padAngle(12 / innerRadius).sortSubgroups(d3.descending).sortChords(d3.descending)

    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius)

    const ribbon = d3.ribbonArrow().radius(innerRadius - 0.5).padAngle(1 / innerRadius)

    const colors = d3.schemeCategory10

    const chords = chord(matrix)
    const formatValue = x => `${x.toFixed(0)}`

    svg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr('style', 'width: 100%; height: auto; font: 10px sans-serif;')

    svg
      .append('path')
      .attr('fill', 'none')
      .attr('d', d3.arc()({ outerRadius, startAngle: 0, endAngle: 2 * Math.PI }))

    svg
      .selectAll('text.chord-label')
      .data(chords)
      .enter()
      .append('text')
      .attr('class', 'chord-label')
      .attr('dy', -10)
      .attr('text-anchor', 'middle') // Center-align the text
      .attr('transform', d => `rotate(${(d.source.startAngle + d.source.endAngle) * 90 / Math.PI - 90}) translate(${innerRadius + 26})`) // Position the labels
      .text(d => names[d.source.index])

    svg
      .selectAll('path.ribbon')
      .data(chords)
      .enter()
      .append('path')
      .attr('class', 'ribbon')
      .attr('d', ribbon)
      .attr('fill', d => colors[d.source.index])
      .style('mix-blend-mode', 'multiply')
      .append('title')
      .text(d => `${names[d.source.index]} owes ${names[d.target.index]} ${formatValue(d.source.value)}`)

    const groupG = svg.selectAll('g.group').data(chords.groups).enter().append('g').attr('class', 'group')

    groupG
      .append('path')
      .attr('class', 'arc')
      .attr('d', arc)
      .attr('fill', (_, i) => colors[i])
      .attr('stroke', '#fff')

    groupG
      .append('text')
      .attr('class', 'group-label')
      .attr('dy', 5) // Adjust vertical position
      .attr('text-anchor', 'middle')
      .append('textPath')
      .attr('startOffset', d => (d.startAngle + d.endAngle) / 2 * outerRadius)
      .attr('xlink:href', (d, i) => `#group-label-path-${i}`) // Create unique IDs for text paths
      .text((d, i) => names[i])

    groupG
      .append('text')
      .attr('dy', -3)
      .append('textPath')
      .attr('startOffset', d => d.startAngle * outerRadius)
      .text((d, i) => names[i])

    groupG
      .append('title')
      .text((d, i) => `${names[i]} owes ${formatValue(d3.sum(matrix[i]))} is owed ${formatValue(d3.sum(matrix, row => row[i]))}`)

  }, [data])

  return (
    <div>
      <Typography>Chord Chart for Popular Paths</Typography>
      <svg ref={svgRef} width='1000' />
    </div>
  )
}

export default ChordChart
