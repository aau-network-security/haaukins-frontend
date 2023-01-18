import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    scrolledToTop: true,
}

const genericSlice = createSlice({
    name: 'generic',
    initialState,
    reducers: {
        setScrolledToTop: (state, action) => {
            state.scrolledToTop = action.payload
        }
    }
})

export default genericSlice.reducer
export const { setScrolledToTop } = genericSlice.actions

