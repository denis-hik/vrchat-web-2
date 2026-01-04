import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import axios from "axios";
import {initGlobalSliceType} from "../reducer/types";

export type TWorld = {
    name: string,
    image: string
    visits: number
    likes: number
}

type TResponse = {
    result: TWorld[]
}

type TPayload = undefined

export const getWorlds = createAsyncThunk<TResponse, TPayload,{state: RootState}>(
    "getWorlds",
    async (payload,{dispatch,fulfillWithValue}):Promise<TResponse> => {
        const response = await axios.get<TResponse>(`https://request.denishik.ru/vrchat/worlds/author`)
        return fulfillWithValue(response.data)
    }
)

export const ext = (builder: ActionReducerMapBuilder<initGlobalSliceType>) => {
    return builder
        .addCase(getWorlds.pending, (state, action) => {
            state.worlds.state = "pending"
        })
        .addCase(getWorlds.fulfilled, (state, action) => {
            state.worlds.state = "succeeded"
            state.worlds.result = action.payload.result;
        })
        .addCase(getWorlds.rejected, (state, action) => {
            state.worlds.state = "failed"
        })
}