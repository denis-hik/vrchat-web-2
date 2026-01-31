import GlassSurface from "../../public/GlassSurface/GlassSurface";
import React, {useCallback, useMemo, useState} from "react";
import DecryptedText from "../../public/DecryptedText/DecryptedText";
import {HeaderStyled} from "./styled";
import logo from "../../../media/logo.png";
import logoLoading from "../../../media/logo-loading.gif";
import logoV from "../../../media/VRChat_logo.png";
import {useSelector} from "react-redux";
import {loadingSelector, wingSelector} from "../../../Context/selectors";
import {useAppDispatch} from "../../../store/hooks";
import {setWing} from "../../../Context/reducer/globalSlice";


export const Header = () => {
    const dispatch = useAppDispatch();

    const wing = useSelector(wingSelector);
    const loading = useSelector(loadingSelector);

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

    return (
        <HeaderStyled className={(active ? 'active' : '') + (show ? " hide" :'')}>
            <GlassSurface
                mixBlendMode={"difference"}
                borderRadius={24}
                id={"panel-glass"}
                fallbackOnly
            >
                <div className={"logo"}>
                    <img src={loading ? logoLoading : logo} onClick={onStart} />
                </div>
                <div className={"back"} onClick={onStart}>
                    Back
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