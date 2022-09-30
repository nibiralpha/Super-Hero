import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import HeroModel from "../model/Hero.model";

export const teamSlice = createSlice({
    name: 'team',
    initialState: [],
    reducers: {
        setTeam: (state: any, action: PayloadAction<HeroModel[]>) => {
            action.payload.map((hero: HeroModel) => {
                state.push(hero)
            })
        },
        addToTeam: (state: any, action: PayloadAction<HeroModel>) => {
            // return { ...state, heroes: action.payload }
            state.push(action.payload)
        },
        removeFromTeam: (state: any, action: PayloadAction<HeroModel>) => {
            let findIndex = state.findIndex((state: any) => state.id == action.payload.id);
            state.splice(findIndex, 1);
        }
    },
})

export const { addToTeam, removeFromTeam, setTeam } = teamSlice.actions

export default teamSlice.reducer
