import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initGlobalSliceType, WingType} from "./types";

import {ext as preloadImgesEXT} from "../actions/images";
import {ext as getWorldsEXT} from "../actions/worlds";

const globalSliceInitialState: initGlobalSliceType = {
    wing: undefined,
    images: {
        state: "idle"
    },
    worlds: {
        state: "idle",
        result: []
    }
}

const globalSlice = createSlice({
    name: 'global',
    initialState: globalSliceInitialState,
    reducers: {
        clear: (state) => ({...globalSliceInitialState}),
        setWing(state,action: PayloadAction<WingType>){
            state.wing = state.wing === action.payload ? undefined : action.payload;
        }
    },
    extraReducers: (builder) => {
        preloadImgesEXT(builder)
        getWorldsEXT(builder)
    },
})

export const {clear,setWing} = globalSlice.actions
export default globalSlice.reducer