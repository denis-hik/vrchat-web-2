import {useCallback, useEffect, useState} from "react";
import {LayeredParallaxBackground} from "../../Components/public/BachgroundParalax/BackgroundParalax";
import GlassSurface from "../../Components/public/GlassSurface/GlassSurface";
import {SupportPageStyled} from "./styled";
import {BodyForm} from "./BodyForm/BodyForm";

const image = {
    base: "",
    overlay: ""
};

export const SupportPage = () => {
    const [requestMotion, setRequestMotion] = useState<null | (() => Promise<boolean>)>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleMotion = useCallback(async () => {
        if (!requestMotion)
            return;

        const ok = await requestMotion();
        if (!ok) {
            alert("Motion failed.");
        }
        setRequestMotion(null);
    }, [requestMotion]);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setIsOpen(true);
        }, 40);

        return () => window.clearTimeout(timer);
    }, []);

    return (
        <SupportPageStyled open={isOpen}>
            <LayeredParallaxBackground
                overlayImageSrc={image.overlay}
                baseImageSrc={image.base}
                maxOffset={20}
                overlaySize={"cover"}
                overlayWidth={"120%"}
                overlayHeight={"120%"}
                overlayPosition={"center"}
                backgroundColor={"transparent"}
                onRequestGyroPermission={(e) => setRequestMotion(() => e)}
            />

            <div
                className={"support-backdrop"}
                onClick={requestMotion ? handleMotion : undefined}
            />

            <div className={"support-modal"}>
                <GlassSurface
                    fallbackOnly={true}
                    borderRadius={28}
                    blur={16}
                    brightness={70}
                    opacity={0.18}
                    backgroundOpacity={0.12}
                    saturation={1.25}
                >
                    <BodyForm />
                </GlassSurface>
            </div>
        </SupportPageStyled>
    );
};
