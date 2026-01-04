import GlassSurface from "../../../Components/public/GlassSurface/GlassSurface";
import React from "react";
import {MotionStyled} from "./styled";
import {BsFillFileEarmarkPlayFill} from "react-icons/bs"

interface MotionProps {
    onClick?: () => void;
}

export const Motion: React.FC<MotionProps> = ({onClick}) => {

    return (
        <MotionStyled onClick={onClick}>
            <GlassSurface
                mixBlendMode={"difference"}
                borderRadius={24}
                fallbackOnly
            >
                {/*// @ts-ignore*/}
                <BsFillFileEarmarkPlayFill/>
            </GlassSurface>
        </MotionStyled>
    )
}