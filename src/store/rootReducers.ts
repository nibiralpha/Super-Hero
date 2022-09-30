import { combineReducers } from '@reduxjs/toolkit'
import teamReducer from './teams'
import heroReducer from './heroes'
import filterReducer from './filters'

const rootReducer = combineReducers(
    {
        teams: teamReducer,
        hero: heroReducer,
        filter: filterReducer
    }
)

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer