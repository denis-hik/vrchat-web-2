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

export type TImageData= {
    id: string,
    base: string,
    overlay: string,
    opacity?: {
        base: string,
        overlay: string,
        delay: number
    },
    revert?: {
        base: string,
        overlay: string,
        delay: number
    }
}

export type initGlobalSliceType = {
    wing:WingType
    loading: boolean
    image:TImageData
    worlds: {
        state: TState
        result: TWorld[]
    }
    links: TLink[],
    stack: TStack[]
}