import {LayeredParallaxBackground} from "../Components/public/BachgroundParalax/BackgroundParalax";
import {useCallback, useEffect, useRef, useState} from "react";
import {Motion} from "./Components/Motion/Motion";
import {Label} from "./Components/Label/LabelStartPage";
import PageContextProvider from "../Context/context";
import {useSelector} from "react-redux";
import {wingSelector} from "../Context/selectors";
import {StartPageStyled} from "./styled";
import {WingKeysType} from "../Context/reducer/types";
import {preloadPair} from "./suplly/preloadImage";

import sky from "../media/start/MountainsSky.png";
import base from "../media/start/MountainsBase.png";
import staff from "../media/staff/staff.gif";
import staffReverse from "../media/staff/staff-reverse.gif";
import world from "../media/worlds/worlds.gif";
import worldA from "../media/worlds/alpha_world.png";
import worldR from "../media/worlds/worlds-reverse.gif";

import w1 from "../media/worlds/worlds/World-Home-Image-2022322f1_4_sta.file_1be8f78e-4b61-49d4-b26e-bd9903e992e3.1.png";
import {PhoneSupport} from "./Components/PhoneSupport/PhoneSupport";

type TWorldItem = {
    image: string,
    name: string,
    url: string,
}

type TImageData= {
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


const worldsData: TWorldItem[] = [{
    name: "MyHome",
    url: "https://vrchat.com/home/world/wrld_b485abbf-70d9-4566-9df4-eb42867e17f8/info",
    image: w1
}]

const dataImages: Record<WingKeysType | "unset", TImageData> = {
    world: {
        id: "world",
        base: "",
        overlay: world,
        revert: {
            base: "",
            overlay: worldR,
            delay: 3700
        },
        opacity: {
            base: worldsData[0].image,
            overlay: worldA,
            delay: 3700
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

const initImage:TImageData = {
    id: "",
    base: "",
    overlay: ""
}

const StartPage = () => {
    const timer = useRef<NodeJS.Timeout | null>(null);
    const wing = useSelector(wingSelector)

    const [image, setImage] = useState<TImageData>(initImage);

    const [requestMotion, setRequestMotion] = useState<null | (() => Promise<boolean>)>(null);

    const handleMotion = useCallback(async () => {
        if (requestMotion) {
            const ok = await requestMotion();
            if (!ok) {
                alert("Motion failed.");
            }
            setRequestMotion(null);
        }
    }, [requestMotion])

    useEffect(() => {
        const run = async () => {
            if (String(wing) === image.id)
                return

            const next = wing ? dataImages[wing] : dataImages.unset
            if (!!image?.revert) {
                if (timer.current)
                    clearTimeout(timer.current)

                await preloadPair({
                    base: image.revert.base,
                    overlay: image.revert.overlay
                })
                setImage({
                    id: next.id,
                    base: image.revert.base,
                    overlay: image.revert.overlay
                })

                timer.current = timer.current = setTimeout(async () => {
                    try {
                        await preloadPair(next);
                        setImage(next);
                    } catch {

                    }
                }, image.revert.delay)

                return
            }

            try {
                await preloadPair(next);
                setImage(next);
            } catch {
            }

            if (next?.opacity !== undefined) {
                if (timer.current)
                    clearTimeout(timer.current)

                timer.current = setTimeout(async () => {
                    if (next?.opacity !== undefined) {
                        try {
                            await preloadPair({
                                base: next.opacity.base,
                                overlay: next.opacity.overlay,
                            });
                            setImage({
                                id: next.id,
                                base: next.opacity.base,
                                overlay: next.opacity.overlay,
                                revert: next.revert,
                            })
                        } catch (e) {

                        }
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
            await preloadPair(dataImages.unset)
            setImage(dataImages.unset)
        }

        startRun()
    }, []);

    return (
        <PageContextProvider>
            <StartPageStyled className={`scrl`}>
                <LayeredParallaxBackground
                    overlayImageSrc={image.overlay}
                    baseImageSrc={image.base}
                    maxOffset={20}
                    overlaySize={"cover"}
                    overlayWidth={"120%"}
                    overlayHeight={"120%"}
                    overlayPosition={"center"}
                    backgroundColor={"transparent"}
                    onRequestGyroPermission={(e) => setRequestMotion(() => e)}
                />
                <Label />
                {!!requestMotion && <Motion onClick={handleMotion}/>}
            </StartPageStyled>
        </PageContextProvider>
    )
}
export default StartPage