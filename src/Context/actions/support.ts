import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../store/store";
import {initGlobalSliceType, TSupportProduct} from "../reducer/types";
import env from "../../env";

type TCheckPayload = {
    license_key: string
}

type TCheckResponse = {
    status: string,
    result: {
        name: string,
        image: string,
        id: string
    }
}

type TSendPayload = {
    license_key: string,
    name: string,
    description: string
}

type TSendResponse = {
    status: string,
    result: {
        sent: boolean,
        product: {
            id: string,
            name: string,
            image: string
        }
    }
}

const getErrorMessage = (error: unknown, fallback: string) => {
    if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.response?.data?.error;
        if (typeof message === "string" && message.length > 0)
            return message;
    }

    if (error instanceof Error && error.message)
        return error.message;

    return fallback;
}

export const checkSupportKey = createAsyncThunk<TSupportProduct, TCheckPayload, {state: RootState, rejectValue: string}>(
    "support/checkKey",
    async (payload, {rejectWithValue}) => {
        try {
            const response = await axios.get<TCheckResponse>(`${env.host}/support/check-key`, {
                params: {
                    license_key: payload.license_key
                }
            });

            return {
                id: response.data.result.id,
                name: response.data.result.name,
                image: response.data.result.image,
                key: payload.license_key
            };
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "License key not found"));
        }
    }
)

export const sendSupportRequest = createAsyncThunk<TSendResponse["result"], TSendPayload, {state: RootState, rejectValue: string}>(
    "support/send",
    async (payload, {rejectWithValue}) => {
        try {
            const response = await axios.post<TSendResponse>(`${env.host}/support/send`, payload);
            return response.data.result;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error, "Failed to send support request"));
        }
    }
)

export const ext = (builder: ActionReducerMapBuilder<initGlobalSliceType>) => {
    return builder
        .addCase(checkSupportKey.pending, (state) => {
            state.support.checkState = "pending";
            state.support.error = undefined;
            state.support.sent = false;
        })
        .addCase(checkSupportKey.fulfilled, (state, action) => {
            state.support.checkState = "succeeded";
            state.support.product = action.payload;
            state.support.error = undefined;
        })
        .addCase(checkSupportKey.rejected, (state, action) => {
            state.support.checkState = "failed";
            state.support.product = undefined;
            state.support.error = action.payload || "License key not found";
        })
        .addCase(sendSupportRequest.pending, (state) => {
            state.support.sendState = "pending";
            state.support.error = undefined;
            state.support.sent = false;
        })
        .addCase(sendSupportRequest.fulfilled, (state, action) => {
            state.support.sendState = "succeeded";
            state.support.sent = action.payload.sent;
            state.support.error = undefined;

            if (state.support.product) {
                state.support.product = {
                    ...state.support.product,
                    id: action.payload.product.id,
                    name: action.payload.product.name,
                    image: action.payload.product.image
                };
            }
        })
        .addCase(sendSupportRequest.rejected, (state, action) => {
            state.support.sendState = "failed";
            state.support.sent = false;
            state.support.error = action.payload || "Failed to send support request";
        });
}
