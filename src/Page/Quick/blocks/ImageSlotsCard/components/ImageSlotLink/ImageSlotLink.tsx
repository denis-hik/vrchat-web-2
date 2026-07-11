import React from "react";
import {QuickImageSlot} from "../../../../types";
import {ImageSlotLinkStyled} from "./styled";

type ImageSlotLinkProps = {
    slot: QuickImageSlot;
};

export const ImageSlotLink = ({slot}: ImageSlotLinkProps) => {
    const content = (
        <>
            {slot.image && <img src={slot.image} alt={slot.title} style={{objectPosition: slot.imagePosition}} />}
            <span>{slot.title}</span>
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
