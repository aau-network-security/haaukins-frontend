import React from 'react'
import ReactECharts from 'echarts-for-react';
import { useSelector } from 'react-redux';
// TODO Make the switches for ingraph checks work
// TODO Add search function and maybe pagination?
function ScoreGraph() {
  const chartSeries = useSelector((state) => state.score.chartSeries)
  // const challengesList = [
  //   { name: "Challenge1", tag: "challenge-1" },
  //   { name: "Challenge2", tag: "challenge-1" },
  //   { name: "Challenge3", tag: "challenge-1" },
  //   { name: "Challenge4", tag: "challenge-1" },
  //   { name: "Challenge5", tag: "challenge-1" },
  //   { name: "Challenge60123123", tag: "challenge-1" },
  //   { name: "Challenge60123123", tag: "challenge-1" },
  //   { name: "Challenge60123123", tag: "challenge-1" },
  //   { name: "Challenge60123123", tag: "challenge-1" },
  // ];
  // const teams = [
  //   {
  //     teamName: "team1",
  //     inChart: true,
  //     score: 1000,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: true, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: true, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team2",
  //     inChart: true,
  //     score: 999,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 2 },
  //       { name: "Challenge2", tag: "challenge-2", solved: true, rank: 1 },
  //       { name: "Challenge3", tag: "challenge-3", solved: true, rank: 2 },
  //       { name: "Challenge4", tag: "challenge-4", solved: false, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: true, rank: 3 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team3",
  //     inChart: true,
  //     score: 998,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: true, rank: 10 },
  //       { name: "Challenge2", tag: "challenge-2", solved: true, rank: 10 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 1 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: false, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  //   {
  //     teamName: "team4",
  //     inChart: true,
  //     score: 997,
  //     solveStatus: [
  //       { name: "Challenge1", tag: "challenge-1", solved: false, rank: 1 },
  //       { name: "Challenge2", tag: "challenge-2", solved: false, rank: 2 },
  //       { name: "Challenge3", tag: "challenge-3", solved: false, rank: 1 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 2 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //       { name: "Challenge4", tag: "challenge-4", solved: true, rank: 3 },
  //       { name: "Challenge5", tag: "challenge-5", solved: false, rank: 1 },
  //       { name: "Challenge6", tag: "challenge-6", solved: true, rank: 10 },
  //     ],
  //   },
  // ]

  // const testData = [
  //   ["2018-08-15T10:04:01.339Z",820], 
  //   ["2018-08-15T11:04:01.339Z", 1000], 
  //   ["2018-08-15T12:04:01.339Z", 1200], 
  //   ["2018-08-15T13:04:01.339Z", 1400], 
  //   ["2018-08-15T14:04:01.339Z", 1600], 
  //   ["2018-08-15T15:04:01.339Z", 820], 
  //   ["2018-08-15T16:04:01.339Z", 820]
  // ]
  // const testData2 = [
  //   ["2018-08-15T10:05:01.339Z", 300], 
  //   ["2018-08-15T11:04:01.339Z", 450], 
  //   ["2018-08-15T12:07:01.339Z", 700], 
  //   ["2018-08-15T13:08:01.339Z", 750], 
  //   ["2018-08-15T14:09:01.339Z", 900], 
  //   ["2018-08-15T15:10:01.339Z", 1200], 
  //   ["2018-08-15T16:11:01.339Z", 2200]
  // ]
  const options = {
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
    series: chartSeries,
    tooltip: {
      trigger: 'axis',
    },
  };
  return (
    <ReactECharts style={{height: "100%"}} option={options} />
  )
}

export default ScoreGraph