import { configureStore } from "@reduxjs/toolkit";
import teamReducer from '../features/teams/teamSlice'
import eventReducer from '../features/events/eventSlice'
import challengeReducer from '../features/challenges/challengeSlice'
import orgReducer from '../features/organizations/organizationSlice'
import agentReducer from '../features/agents/agentSlice'
import genericReducer from '../features/generic/genericSlice'


const store = configureStore({
    reducer: {
        team: teamReducer,
        event: eventReducer,
        challenge: challengeReducer,
        org: orgReducer,
        agent: agentReducer,
        generic: genericReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: {ignoredActionPaths: ['payload.config', 'payload.request']}}),
})

export default store