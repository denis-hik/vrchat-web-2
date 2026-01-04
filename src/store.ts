import {configureStore} from '@reduxjs/toolkit'
import globalSlice from "./Context/reducer/globalSlice";


export const store = configureStore({
    reducer: {
        global: globalSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// @ts-ignore
window.getStore = store.getState

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const dispatch = store.dispatch
