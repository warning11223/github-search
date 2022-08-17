import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {RootState} from "../index";

const LOC_STOR = 'fav';

export interface IState {
    favourites: string[]
}

const initialState: IState = {
    favourites: JSON.parse(localStorage.getItem(LOC_STOR) ?? '[]'),
}

export const githubSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addToFavourites: (state, action: PayloadAction<string>) => {
            state.favourites.push(action.payload);
            localStorage.setItem(LOC_STOR, JSON.stringify(state.favourites));
        },
        removeFromFavourites: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter(item => item !== action.payload);
            localStorage.setItem(LOC_STOR, JSON.stringify(state.favourites));
        }
    },
})

export const { addToFavourites, removeFromFavourites } = githubSlice.actions;

export const githubSelector = (state: RootState) => state.githubSlice;

export default githubSlice.reducer;