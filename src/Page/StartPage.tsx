import {LayeredParallaxBackground} from "../Components/public/BachgroundParalax/BackgroundParalax";
import {useCallback, useState} from "react";
import {Motion} from "./Components/Motion/Motion";
import {Label} from "./Components/Label/LabelStartPage";
import PageContextProvider from "../Context/context";
import {StartPageStyled} from "./styled";
import {useSelector} from "react-redux";
import {imageCurrentSelector} from "../Context/selectors";


const StartPage = () => {
    const image = useSelector(imageCurrentSelector)

    const [requestMotion, setRequestMotion] = useState<null | (() => Promise<boolean>)>(null);

    const handleMotion = useCallback(async () => {
        if (requestMotion) {
            const ok = await requestMotion();
            if (!ok) {
                alert("Motion failed.");
            }
            setRequestMotion(null);
        }
    }, [requestMotion])


    return (
        <PageContextProvider>
            <StartPageStyled className={`scrl`}>
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
                <Label />
                {!!requestMotion && <Motion onClick={handleMotion}/>}
            </StartPageStyled>
        </PageContextProvider>
    )
}
export default StartPage