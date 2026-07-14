import React from "react";
import {MeBlockStyled} from "./styled";

type MeBlockProps = {
    title: string;
    text: string;
};

export const MeBlock = ({title, text}: MeBlockProps) => {
    return (
        <MeBlockStyled>
            <h2>{title}</h2>
            <p>
                {text}
            </p>
            <div className={"tag-list"}>
                <span className={"tag"}>VRChat</span>
                <span className={"tag"}>Worlds</span>
                <span className={"tag"}>Avatars</span>
                <span className={"tag"}>Design</span>
            </div>
        </MeBlockStyled>
    );
};
