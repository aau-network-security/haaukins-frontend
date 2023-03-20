import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// TODO Make the switches for ingraph checks work
// TODO Add search function and maybe pagination?
function ScoreGraph() {
  const activeChartSeries = useSelector((state) => state.score.activeChartSeries)
  
  const options = {
    legend: {
      // Try 'horizontal'
      orient: 'vertical',
      right: 10,
      top: 'center',
      selectedMode: false,
    },
    xAxis: {
      type: 'time',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: 'inside',
        filterMode: 'none',
        start: 0,
        end: 100
      },
      {
        start: 0,
        end: 10,
        handleSize: '80%'
      }
    ],
    series: activeChartSeries,
    tooltip: {
      trigger: 'axis',
    },
  }
  return (
    <ReactECharts style={{height: "100%"}} option={options} notMerge={true}/>
  )
}

export default ScoreGraph