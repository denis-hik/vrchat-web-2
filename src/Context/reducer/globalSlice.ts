import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TImageData, WingType} from "./types";
import {globalSliceInitialState} from "./init";

import {ext as getWorldsEXT} from "../actions/worlds";

const globalSlice = createSlice({
    name: 'global',
    initialState: globalSliceInitialState,
    reducers: {
        clear: (state) => ({...globalSliceInitialState}),
        setWing(state,action: PayloadAction<WingType>){
            state.wing = state.wing === action.payload ? undefined : action.payload;
        },
        setCurrentImage(state,action: PayloadAction<TImageData>){
            state.image = action.payload;
        },
        setLoading(state,action: PayloadAction<boolean>){
            state.loading = action.payload;
        }

    },
    extraReducers: (builder) => {
        getWorldsEXT(builder)
    },
})

export const {clear,setWing,setCurrentImage,setLoading} = globalSlice.actions
export default globalSlice.reducer