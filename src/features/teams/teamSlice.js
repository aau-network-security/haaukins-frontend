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
        console.log("adding team: ", team)
        const response = await apiClient.post('teams', team)        
        console.log(response)
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
    }
})

export default teamSlice.reducer
export const { logoutTeam, setLoggedInTeam } = teamSlice.actions

