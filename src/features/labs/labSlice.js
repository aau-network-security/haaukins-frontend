import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    status: 'idle',
    hosts: [],
    statusCode: 200,
    error: ''
}

export const fetchHosts = createAsyncThunk('lab/fetchHosts', async (obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.get('labs/hosts')
        if (typeof response.data.labHosts === "undefined") {
            response.data.labHosts = []
        }
        return response.data
    }
    catch (err) {
        if (!err.response) {
            throw err
        }
        let error = { axiosMessage: err.message, axiosCode: err.code, apiError: err.response.data, apiStatusCode: err.response.status}
        console.log(error)
        return rejectWithValue(error)
    }
})

const labSlice = createSlice({
    name: 'lab',
    initialState,
    extraReducers: (builder) => {
        // Fetching exercises
        builder.addCase(fetchHosts.pending, (state) => {
            state.status = "fetching"
        })
        builder.addCase(fetchHosts.fulfilled, (state, action) => {
            state.status = "idle"
            state.hosts = action.payload.labHosts
            state.error = ''
        })
        builder.addCase(fetchHosts.rejected, (state, action) => {
            state.status = "idle"
            state.hosts = []
            state.error = action.payload.data.status
            state.statusCode = action.payload.status
        })    
    }
})

export default labSlice.reducer
//export const { setSelectedExercise } = labSlice.actions