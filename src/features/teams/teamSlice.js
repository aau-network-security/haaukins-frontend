import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    status: 'idle',
    loggedInTeam: {},
    loggedIn: false,
    statusCode: 200,
    error: ''
}

export const signupTeam = createAsyncThunk('team/signup', async (team, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('teams/signup', team) 
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

// Login api request
export const loginTeam = createAsyncThunk('team/login', async (reqData, { rejectWithValue }) => {
    try {
        const response = await apiClient.post('teams/login', reqData)
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

export const fetchTeam = createAsyncThunk('team/fetchTeam', async (obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.get('teams/self')
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

export const configureLab = createAsyncThunk('team/configureLab', async (reqData, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.post('labs', reqData)
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

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        // Logs out a user
        logoutTeam: (state) => {
            state.loggedIn = false
            state.loggedInTeam = {}
            localStorage.removeItem('token');
        },
        setLoggedInTeam: (state, action) => {
            state.loggedInTeam = action.payload.teaminfo
            state.loggedIn = true
        }
    },
    extraReducers: (builder) => {
        // Delete user
        builder.addCase(signupTeam.pending, (state) => {
            state.status = 'signup'
        })
        builder.addCase(signupTeam.fulfilled, (state, action) => {
            state.status = ''
            state.loggedIn = true
            state.loggedInTeam = action.payload.teaminfo
            localStorage.setItem('token', action.payload.token)      
            state.error = ''
        })
        builder.addCase(signupTeam.rejected, (state, action) => {
            state.status = ''
            state.error = action.payload
        })

        // Login
        builder.addCase(loginTeam.pending, (state) => {
            state.status = 'logging in'
        })
        builder.addCase(loginTeam.fulfilled, (state, action) => {
            state.status = ''
            state.loggedIn = true
            state.loggedInTeam = action.payload.teaminfo
            localStorage.setItem('token', action.payload.token)
            state.error = ''
        })
        builder.addCase(loginTeam.rejected, (state, action) => {
            state.status = ''
            state.loggedIn = false
            state.error = action.payload
        })

        // fetchTeam
        builder.addCase(fetchTeam.fulfilled, (state, action) => {
            state.loggedInTeam = action.payload.teaminfo
        })
    }
})

export default teamSlice.reducer
export const { logoutTeam, setLoggedInTeam } = teamSlice.actions

