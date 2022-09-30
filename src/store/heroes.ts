import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import HeroModel from "../model/Hero.model";

interface HeroesState {
    heroes: Array<HeroModel>,
    loading: boolean
}

const defaultHeroesState: HeroesState = {
    heroes: [],
    loading: false
}

export const heroSlice = createSlice(
    {
        name: 'heroes',
        initialState: defaultHeroesState,
        reducers: {
            setHeroes: (state, action: PayloadAction<HeroModel[]>) => {
                return { ...state, heroes: action.payload }
            },
            startLoading: (state) => {
                return { ...state, loading: true }
            },
            stopLoading: (state) => {
                return { ...state, loading: false }
            }
        },
    }
)

export const { setHeroes, startLoading, stopLoading } = heroSlice.actions

export default heroSlice.reducer
