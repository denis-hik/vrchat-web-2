import React from "react";
import {QuickStat} from "../../types";
import {StatsGridStyled} from "./styled";

type StatsGridProps = {
    stats: QuickStat[];
};

export const StatsGrid = ({stats}: StatsGridProps) => {
    return (
        <StatsGridStyled>
            {stats.map((stat) => (
                <div className={"stat"} key={stat.title}>
                    <strong>{stat.title}</strong>
                    <span>{stat.text}</span>
                </div>
            ))}
        </StatsGridStyled>
    );
};
