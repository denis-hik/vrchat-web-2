import React, {createContext, useEffect, useRef} from 'react';
import {useAppDispatch} from "../store/hooks";

import staff from "../media/staff/staff.gif";
import staffReverse from "../media/staff/staff-reverse.gif";
import {getWorlds} from "./actions/worlds";
import {preloadAll, preloadPair} from "../Page/suplly/preloadImage";
import {TImageData, WingKeysType} from "./reducer/types";
import world from "../media/worlds/new/Worlds.gif";
import worldR from "../media/worlds/new/World-revert.gif";
import sky from "../media/start/MountainsSky.png";
import base from "../media/start/MountainsBase.png";
import {useSelector} from "react-redux";
import {imageCurrentSelector, wingSelector} from "./selectors";
import {setCurrentImage, setLoading} from "./reducer/globalSlice";

const dataImages: Record<WingKeysType | "unset", TImageData> = {
    world: {
        id: "world",
        base: "",
        overlay: world,
        revert: {
            base: "",
            overlay: worldR,
            delay: 2500
        }
    },
    stack: {
        id: "stack",
        base: "",
        overlay: staff,
        revert: {
            base: "",
            overlay: staffReverse,
            delay: 3000,
        }
    },
    unset: {
        id: "undefined",
        base: sky,
        overlay: base
    }
}

export const pageContext = createContext<{}>({});

type TImageCacheRef = React.MutableRefObject<Map<string, string>>
type TObjectUrlsRef = React.MutableRefObject<string[]>

const isWindowsChromeBrowser = () => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
        return false

    const userAgentData = (navigator as Navigator & {
        userAgentData?: {
            platform?: string
        }
    }).userAgentData
    const platform = userAgentData?.platform || navigator.platform || ""
    const userAgent = navigator.userAgent || ""
    const isWindows = /Win/i.test(platform) || /Windows/i.test(userAgent)
    const isChrome = /Chrome/i.test(userAgent) && !/Edg|OPR|YaBrowser/i.test(userAgent)

    return isWindows && isChrome
}

const loadImageSource = async (
    src: string | undefined,
    shouldCacheImages: boolean,
    imageCache: TImageCacheRef,
    objectUrls: TObjectUrlsRef
) => {
    if (!src)
        return ""

    if (!shouldCacheImages)
        return src

    const cached = imageCache.current.get(src)
    if (cached)
        return cached

    try {
        const response = await fetch(src)
        if (!response.ok)
            return src
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)

        imageCache.current.set(src, objectUrl)
        objectUrls.current.push(objectUrl)

        return objectUrl
    } catch {
        return src
    }
}

const resolvePair = async (
    data: { base: string; overlay: string },
    shouldCacheImages: boolean,
    imageCache: TImageCacheRef,
    objectUrls: TObjectUrlsRef
) => {
    const [base, overlay] = await Promise.all([
        loadImageSource(data.base, shouldCacheImages, imageCache, objectUrls),
        loadImageSource(data.overlay, shouldCacheImages, imageCache, objectUrls)
    ])

    return {
        base,
        overlay
    }
}

const resolveImageData = async (
    data: TImageData,
    shouldCacheImages: boolean,
    imageCache: TImageCacheRef,
    objectUrls: TObjectUrlsRef
): Promise<TImageData> => {
    const resolved = await resolvePair(data, shouldCacheImages, imageCache, objectUrls)

    const [revert, opacity] = await Promise.all([
        data.revert ? resolvePair(data.revert, shouldCacheImages, imageCache, objectUrls).then((pair) => ({
            ...pair,
            delay: data.revert!.delay
        })) : Promise.resolve(undefined),
        data.opacity ? resolvePair(data.opacity, shouldCacheImages, imageCache, objectUrls).then((pair) => ({
            ...pair,
            delay: data.opacity!.delay
        })) : Promise.resolve(undefined)
    ])

    return {
        id: data.id,
        base: resolved.base,
        overlay: resolved.overlay,
        ...(revert ? {revert} : {}),
        ...(opacity ? {opacity} : {})
    }
}

const PageContextProvider:React.FC<{children:any}> = ({children}) => {
    const dispatch = useAppDispatch()

    const timer = useRef<NodeJS.Timeout | null>(null);
    const imageCache = useRef<Map<string, string>>(new Map())
    const objectUrls = useRef<string[]>([])
    const shouldCacheImages = useRef(isWindowsChromeBrowser())

    const wing = useSelector(wingSelector)
    const image = useSelector(imageCurrentSelector)

    useEffect(() => {
        const run = async () => {
            if (String(wing) === image.id)
                return

            const next = await resolveImageData(
                wing ? dataImages[wing] : dataImages.unset,
                shouldCacheImages.current,
                imageCache,
                objectUrls
            )
            if (!!image?.revert) {
                if (timer.current)
                    clearTimeout(timer.current)

                dispatch(setLoading(true))
                await preloadPair({
                    base: image.revert.base,
                    overlay: image.revert.overlay
                })
                dispatch(setCurrentImage({
                    id: next.id,
                    base: image.revert.base,
                    overlay: image.revert.overlay
                }))
                dispatch(setLoading(false))

                timer.current = timer.current = setTimeout(async () => {
                    await preloadPair(next)
                    dispatch(setCurrentImage(next))
                }, image.revert.delay)

                return
            }

            dispatch(setLoading(true))
            await preloadPair(next)
            dispatch(setCurrentImage(next))
            dispatch(setLoading(false))

            if (next?.opacity !== undefined) {
                if (timer.current)
                    clearTimeout(timer.current)

                timer.current = setTimeout(async () => {
                    if (next?.opacity !== undefined) {
                        dispatch(setLoading(true))
                        await preloadPair({
                            base: next.opacity.base,
                            overlay: next.opacity.overlay,
                        })
                        dispatch(setCurrentImage({
                            id: next.id,
                            base: next.opacity.base,
                            overlay: next.opacity.overlay,
                            revert: next?.revert,
                        }))
                        dispatch(setLoading(false))
                    }
                }, next.opacity.delay)
            }
        }

        run()

        return () => {
            if (timer.current)
                clearTimeout(timer.current)
        }
    }, [dispatch, image.id, image.revert, wing])

    useEffect(() => {
        const objectUrlsRef = objectUrls
        const imageCacheRef = imageCache

        const startRun = async () => {
            let list = []
            const keys = Object.keys(dataImages) as Array<WingKeysType | "unset">

            for (const key of keys) {
                const item = await resolveImageData(
                    dataImages[key],
                    shouldCacheImages.current,
                    imageCache,
                    objectUrls
                )
                list.push(item)
                if (!!item?.revert)
                    list.push(item.revert)
                if (!!item?.opacity)
                    list.push(item.opacity)
            }

            await preloadAll(list)
        }

        startRun()

        return () => {
            objectUrlsRef.current.forEach((item) => URL.revokeObjectURL(item))
            objectUrlsRef.current = []
            imageCacheRef.current.clear()
        }
    }, []);

    useEffect(() => {
        dispatch(getWorlds())
    },[dispatch])

    return (
        <pageContext.Provider value={{}}>
            {children}
        </pageContext.Provider>
    );
};
export default PageContextProvider


