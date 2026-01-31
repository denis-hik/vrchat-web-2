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

const PageContextProvider:React.FC<{children:any}> = ({children}) => {
    const dispatch = useAppDispatch()

    const timer = useRef<NodeJS.Timeout | null>(null);

    const wing = useSelector(wingSelector)
    const image = useSelector(imageCurrentSelector)

    useEffect(() => {
        const run = async () => {
            if (String(wing) === image.id)
                return

            const next = wing ? dataImages[wing] : dataImages.unset
            if (!!image?.revert) {
                if (timer.current)
                    clearTimeout(timer.current)

                dispatch(setLoading(true))
                await new Promise((r) => setTimeout(r, 3000))
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
    }, [wing])

    useEffect(() => {
        const startRun = async () => {
            let list = []
            const keys = Object.keys(dataImages)

            for (const key in keys) {
                const item:  TImageData = dataImages[key as keyof Record<WingKeysType | "unset", TImageData>]
                list.push(item)
                if (!!item?.revert)
                    list.push(item.revert)
                if (!!item?.opacity)
                    list.push(item.opacity)
            }

            await preloadAll(list)
        }

        startRun()
    }, []);

    useEffect(() => {
        dispatch(getWorlds())
    },[])

    return (
        <pageContext.Provider value={{}}>
            {children}
        </pageContext.Provider>
    );
};
export default PageContextProvider


