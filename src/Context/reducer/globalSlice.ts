import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TImageData, WingType} from "./types";
import {globalSliceInitialState} from "./init";

import {ext as getWorldsEXT} from "../actions/worlds";
import {ext as supportEXT} from "../actions/support";

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
        },
        resetSupport(state) {
            state.support = {
                checkState: "idle",
                sendState: "idle",
                sent: false
            };
        }

    },
    extraReducers: (builder) => {
        getWorldsEXT(builder)
        supportEXT(builder)
    },
})

export const {clear,setWing,setCurrentImage,setLoading,resetSupport} = globalSlice.actions
export default globalSlice.reducer
