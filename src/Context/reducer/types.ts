import {TResponsePreloadImages} from "../actions/images";

export type WingKeysType = "world" | "stack"
export type WingType = undefined | WingKeysType
export type TState = 'idle' | 'pending' | 'succeeded' | 'failed'

export type TWorld = {
    name: string,
    image: string
    visits: number
    likes: number
}

export type TLink = {
    icon: string
    url: string
}

export type TStack = {
    image: string,
    name: string,
}

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
    links: TLink[],
    stack: TStack[]
}