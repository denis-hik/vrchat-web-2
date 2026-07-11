import GlassSurface from "../../public/GlassSurface/GlassSurface";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import DecryptedText from "../../public/DecryptedText/DecryptedText";
import {HeaderStyled} from "./styled";
import logo from "../../../media/logo.png";
import logoLoading from "../../../media/logo-loading.gif";
import logoV from "../../../media/VRChat_logo.png";
import {useSelector} from "react-redux";
import {wingSelector} from "../../../Context/selectors";
import {useAppDispatch} from "../../../store/hooks";
import {setWing} from "../../../Context/reducer/globalSlice";
import useLoading from "./hooks/useLoading";
import {useLocation, useNavigate} from "react-router-dom";

const QUICK_EXIT_CLASS = "quick-page-exit";
const QUICK_EXIT_DELAY = 460;

export const Header = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const quickExitTimer = useRef<number | undefined>(undefined);

    const wing = useSelector(wingSelector);

    const loading = useLoading()

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
        if (location.pathname === "/quick") {
            document.documentElement.classList.add(QUICK_EXIT_CLASS);
            window.clearTimeout(quickExitTimer.current);

            quickExitTimer.current = window.setTimeout(() => {
                document.documentElement.classList.remove(QUICK_EXIT_CLASS);
                navigate("/");
            }, QUICK_EXIT_DELAY);

            return;
        }

        window.open("https://vrchat.com/home/user/usr_cb88a031-8fae-4dd9-bbd2-8178636e2ee9", "_blank")
    }, [location.pathname, navigate])

    useEffect(() => {
        document.documentElement.classList.remove(QUICK_EXIT_CLASS);

        return () => {
            window.clearTimeout(quickExitTimer.current);
            document.documentElement.classList.remove(QUICK_EXIT_CLASS);
        };
    }, [location.pathname])

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
