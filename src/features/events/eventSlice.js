import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../api/client";

const initialState = {
    status: 'idle',
    eventinfo: {
        publicScoreboard: false,
    },
    error: ''
}

export const fetchEventInfo = createAsyncThunk('event/fetchEventInfo', async (obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        let host = window.location.host;
        let eventTag = host.split('.')[0]

        const response = await apiClient.get(eventTag)
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

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        // Logs out a user
        setEventInfo: (state, action) => {
            state.eventinfo = action.payload.eventinfo
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(fetchEventInfo.pending, (state) => {
            state.status = "fetching"
        })
        builder.addCase(fetchEventInfo.fulfilled, (state, action) => {
            state.status = "idle"
            state.eventinfo = action.payload.eventinfo
        })
        builder.addCase(fetchEventInfo.rejected, (state, action) => {
            state.status = "idle"
        })
    }
})

export default eventSlice.reducer
export const { setEventInfo } = eventSlice.actions

