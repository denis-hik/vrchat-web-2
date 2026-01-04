import React from "react";
import {LabelStartPageLabel} from "./styled";
import BlurText from "../../../Components/public/BlurText";
import {useSelector} from "react-redux";
import {wingSelector} from "../../../Context/selectors";

export const Label: React.FC<{}> = () => {

    const wing = useSelector(wingSelector)

    return (
        <LabelStartPageLabel active={wing === undefined}>
            <BlurText
                text={"Where Digital Reality Becomes Real"}
                delay={150}
                animateBy="words"
                direction="top"
            />
        </LabelStartPageLabel>
    )
}