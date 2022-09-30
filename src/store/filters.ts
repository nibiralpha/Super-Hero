import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import SupportedObjectKeys from '../Components/Filter/filterInterface';
import FilterModel from "../model/Filter.model";

interface FilterAction {
    payload: SupportedObjectKeys
    type: String
}

const initialFilter: FilterModel = {
    name: '',
    gender: '',
    alignment: '',
    powerStat: '',
    intelligence: '0,100',
    speed: '0,100',
    power: '0,100',
    durability: '0,100'
}

export const filterSlice = createSlice(
    {
        name: 'filters',
        initialState: initialFilter,
        reducers: {
            updateFilterData: (state, action: FilterAction) => {
                return { ...state, ...action.payload }
            },
            setDefaultFilter: (state, action: PayloadAction<FilterModel>) => {
                return { ...state, ...action.payload }
            },
            clearFilter: (state) => {
                return { ...state, ...initialFilter }
            }
        },
    }
)

export const { updateFilterData, setDefaultFilter, clearFilter } = filterSlice.actions

export default filterSlice.reducer
