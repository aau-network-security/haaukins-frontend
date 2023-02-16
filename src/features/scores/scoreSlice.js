import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import apiClient from "../../api/client"

const initialState = {
    status: 'idle',
    scores: [],
    tableData: [],
    challengesList: [],
    chartSeries: [],
    statusCode: 200,
    error: ''
}

export const fetchScores = createAsyncThunk('score/fetchScores', async (obj, { rejectWithValue }) => {
    try {
        let host = window.location.host;
        let eventTag = host.split('.')[0]
        const response = await apiClient.get('scores/' + eventTag)
        response.data.chartSeries = []
        response.data.teamsScore.forEach((element, index) => {
            console.log(element)
            if (index < 10) {
                element.inChart = true
                response.data.chartSeries.push({name: element.teamName, data: element.teamScoreTimeline, type: 'line'})
                console.log(typeof element.solves)
            }  
        })
        response.data.tableData = response.data.teamsScore
        console.log("dataseries", response.data.chartSeries)
        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        return rejectWithValue(error)
    }
})

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        }
    },
    extraReducers: (builder) => {
        // Delete user
        builder.addCase(fetchScores.pending, (state) => {
            state.status = 'fetching scores'
        })
        builder.addCase(fetchScores.fulfilled, (state, action) => {
            state.status = ''
            state.scores = action.payload.teamsScore
            state.tableData = action.payload.tableData
            state.challengesList = action.payload.challengesList
            state.chartSeries = action.payload.chartSeries
            state.error = ''
        })
        builder.addCase(fetchScores.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })
    }
})

export default scoreSlice.reducer
export const { setTableData } = scoreSlice.actions
