import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../store";
import {initGlobalSliceType} from "../reducer/types";

type TResponse = { url: string; ok: boolean; reason?: "timeout" | "error" };
type TPayload = {
    urls: string[],
    opts?: { timeoutMs?: number; crossOrigin?: "" | "anonymous" | "use-credentials" }
}

export type TResponsePreloadImages = TResponse[]
export const preloadImages = createAsyncThunk<TResponse[], TPayload,{state: RootState}>(
    "preloadImages",
    async ({opts = {}, urls},{dispatch,fulfillWithValue}):Promise<TResponse[]> => {
        const { timeoutMs = 20000, crossOrigin } = opts;

        // @ts-ignore
        const unique = [...new Set(urls)].filter(Boolean);

        return fulfillWithValue(Promise.all(
            unique.map(
                (url) =>
                    new Promise<TResponse>((resolve) => {
                        const img = new Image();

                        if (crossOrigin !== undefined) img.crossOrigin = crossOrigin;

                        const t = window.setTimeout(
                            () => resolve({ url, ok: false, reason: "timeout" }),
                            timeoutMs
                        );

                        img.onload = () => {
                            window.clearTimeout(t);
                            resolve({ url, ok: true });
                        };

                        img.onerror = () => {
                            window.clearTimeout(t);
                            resolve({ url, ok: false, reason: "error" });
                        };

                        img.src = url;
                    })
            )
        ));

    }
);

export const ext = (builder: ActionReducerMapBuilder<initGlobalSliceType>) => {
    return builder
        .addCase(preloadImages.pending, (state, action) => {
            state.images.state = "pending"
        })
        .addCase(preloadImages.fulfilled, (state, action) => {
            state.images.state = "succeeded"
            state.images.result = action.payload;
        })
        .addCase(preloadImages.rejected, (state, action) => {
            state.images.state = "failed"
        })
}
