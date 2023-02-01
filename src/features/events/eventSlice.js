import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'idle',
    eventinfo: {},
    error: ''
}

const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        // Logs out a user
        setEventInfo: (state, action) => {
            state.eventinfo = action.payload.eventinfo
        }
    }
})

export default eventSlice.reducer
export const { setEventInfo } = eventSlice.actions

