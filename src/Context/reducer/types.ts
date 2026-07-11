export type WingKeysType = "world" | "stack"
export type WingType = undefined | WingKeysType
export type TState = 'idle' | 'pending' | 'succeeded' | 'failed'
export type Language = "ru" | "en"

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

export type TSupportProduct = {
    id: string,
    name: string,
    image: string,
    key: string
}

export type TSupportState = {
    checkState: TState,
    sendState: TState,
    product?: TSupportProduct,
    sent: boolean,
    error?: string
}

export type initGlobalSliceType = {
    wing:WingType
    language: Language
    loading: boolean
    image:TImageData
    worlds: {
        state: TState
        result: TWorld[]
    }
    links: TLink[],
    stack: TStack[]
    support: TSupportState
}
