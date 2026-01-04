import {useSelector} from "react-redux";
import {wingSelector} from "../../../../Context/selectors";
import {WorldsItemContent} from "./worlds/worlds";
import {WingsContentStyled} from "./styled";
import {WingType} from "../../../../Context/reducer/types";
import React from "react";
import {StackItemContent} from "./stack/stack";

type TWingsContentItem = {
    type: WingType
}

export const WingsContentItem: React.FC<TWingsContentItem> = ({type}) => {

    const wing = useSelector(wingSelector)

    return (
        <WingsContentStyled className={`${wing !== undefined && type === wing ? "active" : ""}`}>
            {(wing === "world" && type === wing) && <WorldsItemContent />}
            {(wing === "stack" && type === wing) && <StackItemContent />}
        </WingsContentStyled>
    )
}