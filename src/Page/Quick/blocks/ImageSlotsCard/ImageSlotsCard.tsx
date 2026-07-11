import React from "react";
import {QuickImageSlot} from "../../types";
import {ImageSlotsCardStyled} from "./styled";
import {ImageSlotLink} from "./components/ImageSlotLink/ImageSlotLink";

type ImageSlotsCardProps = {
    title: string;
    text: string;
    slots: QuickImageSlot[];
};

export const ImageSlotsCard = ({title, text, slots}: ImageSlotsCardProps) => {
    return (
        <ImageSlotsCardStyled>
            <h2>{title}</h2>
            <p>
                {text}
            </p>
            <div className={"image-grid"}>
                {slots.map((slot) => (
                    <ImageSlotLink slot={slot} key={slot.title} />
                ))}
            </div>
        </ImageSlotsCardStyled>
    );
};
