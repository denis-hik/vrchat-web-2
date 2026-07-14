import React from "react";
import {QuickStat} from "../../types";
import {HintBlockStyled} from "./styled";

type HintBlockProps = {
    stats: QuickStat[];
};

export const HintBlock = ({stats}: HintBlockProps) => {
    return (
        <HintBlockStyled>
            {stats.map((stat) => (
                <div className={"stat"} key={stat.title}>
                    <strong>{stat.title}</strong>
                    <span>{stat.text}</span>
                </div>
            ))}
        </HintBlockStyled>
    );
};
