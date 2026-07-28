import {WingsStyled} from "./styled";
import GlassSurface from "../../../Components/public/GlassSurface/GlassSurface";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../../store/hooks";
import {setWing} from "../../../Context/reducer/globalSlice";
import BlurText from "../../../Components/public/BlurText";
import {wingSelector} from "../../../Context/selectors";
import {WingsContentItem} from "./content/content";
import {BottomItemContent} from "./content/links/links";

export const Wings = () => {
    const dispatch = useAppDispatch();

    const wing = useSelector(wingSelector)

    const onClick = useCallback((e: React.MouseEvent) => {
        if (e.target instanceof HTMLDivElement) {
            dispatch(setWing(e.target.className.includes("wing-r")
                ? "world"
                : e.target.className.includes("wing-l") ? "stack" : undefined))
        }
    }, [dispatch])

    return (
        <WingsStyled selected={wing !== undefined}>
            <GlassSurface
                propsDiv={{onClick}}
                mixBlendMode={"difference"}
                borderRadius={24}
                id={"wing-l"}
                className={`wings wing-l ${wing === "stack" ? "selected" : ""}`}
                fallbackOnly
            >
                <BlurText
                   className={"label"}
                   text={"VR"}
                   animateBy={"words"}
                />
                <WingsContentItem type={"stack"} />
            </GlassSurface>
            <GlassSurface
                propsDiv={{onClick}}
                mixBlendMode={"difference"}
                borderRadius={24}
                id={"wing-r"}
                fallbackOnly
                className={`wings wing-r ${wing === "world" ? "selected" : ""}`}
            >
                <BlurText
                    className={"label"}
                    text={"Worlds"}
                    animateBy={"words"}
                />
                <WingsContentItem type={"world"} />
            </GlassSurface>
            <div className={`wing-b ${wing !== undefined ? "selected" : ""}`}>
                <GlassSurface
                    mixBlendMode={"difference"}
                    borderRadius={24}
                    id={"wing-b"}
                    fallbackOnly
                >
                    <BottomItemContent />
                </GlassSurface>
            </div>
        </WingsStyled>
    )
}
