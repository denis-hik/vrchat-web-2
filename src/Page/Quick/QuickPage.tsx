import React from "react";
import {QuickPageStyled} from "./styled";
import {QuickBackground} from "./blocks/QuickBackground/QuickBackground";
import {QuickContent} from "./blocks/QuickContent/QuickContent";

const QuickPage = () => {
    return (
        <QuickPageStyled>
            <QuickBackground />
            <QuickContent />
        </QuickPageStyled>
    );
};

export default QuickPage;
