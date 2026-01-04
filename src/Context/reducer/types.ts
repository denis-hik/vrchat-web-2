import {TResponsePreloadImages} from "../actions/images";
import {TWorld} from "../actions/worlds";

export type WingKeysType = "world" | "stack"
export type WingType = undefined | WingKeysType
export type TState = 'idle' | 'pending' | 'succeeded' | 'failed'

export type initGlobalSliceType = {
    wing:WingType
    images: {
        state: TState
        result?: TResponsePreloadImages
    },
    worlds: {
        state: TState
        result: TWorld[]
    }
}