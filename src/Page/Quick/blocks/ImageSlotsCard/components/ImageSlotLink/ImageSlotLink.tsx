import React from "react";
import {QuickImageSlot} from "../../../../types";
import {ImageSlotLinkStyled} from "./styled";

type ImageSlotLinkProps = {
    slot: QuickImageSlot;
    title: string;
};

type ImageSlotImageProps = {
    image?: string;
    imagePosition?: string;
    alt: string;
};

const ImageSlotImage = React.memo(({image, imagePosition, alt}: ImageSlotImageProps) => {
    if (!image)
        return null;

    return <img src={image} alt={alt} style={{objectPosition: imagePosition}} />;
});

export const ImageSlotLink = ({slot, title}: ImageSlotLinkProps) => {
    const content = (
        <>
            <ImageSlotImage image={slot.image} imagePosition={slot.imagePosition} alt={slot.id} />
            <span>{title}</span>
        </>
    );

    if (!slot.url) {
        return (
            <ImageSlotLinkStyled as={"div"}>
                {content}
            </ImageSlotLinkStyled>
        );
    }

    return (
        <ImageSlotLinkStyled href={slot.url} target={"_blank"} rel={"noreferrer"}>
            {content}
        </ImageSlotLinkStyled>
    );
};
