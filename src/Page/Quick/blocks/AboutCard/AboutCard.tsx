import React from "react";
import {AboutCardStyled} from "./styled";

type AboutCardProps = {
    title: string;
    text: string;
};

export const AboutCard = ({title, text}: AboutCardProps) => {
    return (
        <AboutCardStyled>
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
        </AboutCardStyled>
    );
};
