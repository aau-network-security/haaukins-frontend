import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    status: "idle",
    categories: [],
    selectedExercise: {
        name: "",
        tag: "",
        parentTag: "",
        points: 0,
        solved: false,
        solves: [],
        description: "",
    },
    error: ''
}
// TODO: change to async like other reducers
export const fetchExercises = createAsyncThunk('exercise/fetchExercises', async (obj, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.get('exercises')
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

export const solveExercise = createAsyncThunk('exercise/solveExercise', async (exercise, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.post('exercises/solve', exercise)
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

export const startExercise = createAsyncThunk('exercise/startExercise', async (exercise, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        let reqParam = exercise.parentTag
        if (exercise.replaces !== "") {
            reqParam += "?replaces=" + exercise.replaces
        }
        const response = await apiClient.put('exercises/start/' + reqParam)
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

export const stopExercise = createAsyncThunk('exercise/stopExercise', async (exercise, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.put('exercises/stop/' + exercise.parentTag)
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

export const resetExercise = createAsyncThunk('exercise/resetExercise', async (exercise, {rejectWithValue}) => {
    try {
        apiClient.defaults.headers.Authorization = localStorage.getItem('token')
        const response = await apiClient.put('exercises/reset/' + exercise.parentTag)
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

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        setSelectedExercise: (state, action) => {
            state.selectedExercise = action.payload
        }
    },
    extraReducers: (builder) => {
        // Fetching exercises
        builder.addCase(fetchExercises.pending, (state) => {
            state.status = "fetching"
        })
        builder.addCase(fetchExercises.fulfilled, (state, action) => {
            state.status = "idle"
            state.categories = action.payload.eventExercises.categories
            state.error = ''
        })
        builder.addCase(fetchExercises.rejected, (state, action) => {
            state.status = "idle"
            state.categories = []
            state.error = action.payload.data.status
            state.statusCode = action.payload.status
        })

        // Starting exercise
        builder.addCase(startExercise.pending, (state) => {
            state.status = "starting/stopping"
        })
        builder.addCase(startExercise.fulfilled, (state) => {
            state.status = "idle"
        })
        builder.addCase(startExercise.rejected, (state) => {
            state.status = "idle"
        })

        // Stopping exercise
        builder.addCase(stopExercise.pending, (state) => {
            state.status = "starting/stopping"
        })
        builder.addCase(stopExercise.fulfilled, (state) => {
            state.status = "idle"
        })
        builder.addCase(stopExercise.rejected, (state) => {
            state.status = "idle"
        })

        // Resetting exercise
        builder.addCase(resetExercise.pending, (state) => {
            state.status = "resetting"
        })
        builder.addCase(resetExercise.fulfilled, (state) => {
            state.status = "idle"
        })
        builder.addCase(resetExercise.rejected, (state) => {
            state.status = "idle"
        })
    }
})

export default exerciseSlice.reducer
export const { setSelectedExercise } = exerciseSlice.actions