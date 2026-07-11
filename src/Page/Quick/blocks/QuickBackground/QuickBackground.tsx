import React from "react";
import {LayeredParallaxBackground} from "../../../../Components/public/BachgroundParalax/BackgroundParalax";
import backgroundBase from "../../../../media/start/MountainsSky.png";
import backgroundOverlay from "../../../../media/start/MountainsBase.png";
import {QuickBackgroundStyled} from "./styled";

export const QuickBackground = () => {
    return (
        <QuickBackgroundStyled>
            <LayeredParallaxBackground
                baseImageSrc={backgroundBase}
                overlayImageSrc={backgroundOverlay}
                maxOffset={20}
                overlaySize={"cover"}
                overlayWidth={"120%"}
                overlayHeight={"120%"}
                overlayPosition={"center"}
                backgroundColor={"transparent"}
            />
        </QuickBackgroundStyled>
    );
};
