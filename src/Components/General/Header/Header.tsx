import GlassSurface from "../../public/GlassSurface/GlassSurface";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import DecryptedText from "../../public/DecryptedText/DecryptedText";
import {HeaderStyled} from "./styled";

import logo from "../../../media/logo.png";
import logoV from "../../../media/VRChat_logo.png";
import {useSelector} from "react-redux";
import {wingSelector} from "../../../Context/selectors";
import {useAppDispatch} from "../../../hooks/store/store";
import {setWing} from "../../../Context/reducer/globalSlice";


export const Header = () => {
    const dispatch = useAppDispatch();

    const wing = useSelector(wingSelector);

    const active = useMemo(() => {
        return wing !== undefined
    },[wing])

    const [show, setShow] = useState(false)

    const onStart = useCallback(() => {
        if (wing === undefined)
            return window.open("https://denishik.io", "_blank")

        dispatch(setWing(undefined))
    }, [wing])
    const onVrchat = useCallback(() => {
        window.open("https://vrchat.com/home/user/usr_cb88a031-8fae-4dd9-bbd2-8178636e2ee9", "_blank")
    }, [])

    // useEffect(() => {
    //     // const threshold = 0.9;
    //     const threshold = 1.2;
    //
    //     const onScroll = () => {
    //         const doc = document.documentElement;
    //
    //         const scrollTop = doc.scrollTop;
    //         const viewportH = window.innerHeight;
    //         const fullH = doc.scrollHeight;
    //
    //         const maxScroll = fullH - viewportH;
    //         if (maxScroll <= 0) return;
    //
    //         const progress = scrollTop / maxScroll;
    //
    //         setShow(progress >= threshold)
    //     };
    //
    //     onScroll();
    //     window.addEventListener("scroll", onScroll, { passive: true });
    //     return () => window.removeEventListener("scroll", onScroll);
    // }, []);

    return (
        <HeaderStyled className={(active ? 'active' : '') + (show ? " hide" :'')}>
            <GlassSurface
                mixBlendMode={"difference"}
                borderRadius={24}
                id={"panel-glass"}
                fallbackOnly
            >
                <div className={"logo"}>
                    <img src={logo} onClick={onStart} />
                </div>
                <div className={"text"}>
                    <DecryptedText
                        text={"Denis Hik"}
                        speed={100}
                        animateOn={"both"}
                        revealDirection={"center"}
                        maxIterations={20}
                    />
                </div>
                <div className={"logo1"}>
                    <img src={logoV} onClick={onVrchat} />
                </div>
            </GlassSurface>

        </HeaderStyled>
    )
}