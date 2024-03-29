import { configureStore } from "@reduxjs/toolkit";
import teamReducer from '../features/teams/teamSlice'
import scoreReducer from '../features/scores/scoreSlice'
import eventReducer from '../features/events/eventSlice'
import exerciseReducer from '../features/exercises/exerciseSlice'
import genericReducer from '../features/generic/genericSlice'
import labReducer from '../features/labs/labSlice'


const store = configureStore({
    reducer: {
        team: teamReducer,
        score: scoreReducer,
        event: eventReducer,
        exercise: exerciseReducer,
        generic: genericReducer,
        lab: labReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: {ignoredActionPaths: ['payload.config', 'payload.request']}}),
})

export default store