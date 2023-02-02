import { configureStore } from "@reduxjs/toolkit";
import teamReducer from '../features/teams/teamSlice'
import eventReducer from '../features/events/eventSlice'
import exerciseReducer from '../features/exercises/exerciseSlice'
import orgReducer from '../features/organizations/organizationSlice'
import agentReducer from '../features/agents/agentSlice'
import genericReducer from '../features/generic/genericSlice'


const store = configureStore({
    reducer: {
        team: teamReducer,
        event: eventReducer,
        exercise: exerciseReducer,
        org: orgReducer,
        agent: agentReducer,
        generic: genericReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: {ignoredActionPaths: ['payload.config', 'payload.request']}}),
})

export default store