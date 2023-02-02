import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../api/client"

const initialState = {
    loading: false,
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

const exerciseSlice = createSlice({
    name: 'exercise',
    initialState,
    reducers: {
        setSelectedExercise: (state, action) => {
            state.selectedExercise = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchExercises.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchExercises.fulfilled, (state, action) => {
            state.loading = false
            state.categories = action.payload.eventExercises.categories
            state.error = ''
        })
        builder.addCase(fetchExercises.rejected, (state, action) => {
            state.loading = false
            state.categories = []
            state.error = action.payload.data.status
            state.statusCode = action.payload.status
        })
    }
})

export default exerciseSlice.reducer
export const { setSelectedExercise } = exerciseSlice.actions