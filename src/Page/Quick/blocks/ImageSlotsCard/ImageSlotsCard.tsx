import React from "react";
import {QuickImageSlot} from "../../types";
import {ImageSlotsCardStyled} from "./styled";
import {ImageSlotLink} from "./components/ImageSlotLink/ImageSlotLink";

type ImageSlotsCardProps = {
    title: string;
    text: string;
    slots: QuickImageSlot[];
    slotTitles: Record<string, string>;
};

export const ImageSlotsCard = ({title, text, slots, slotTitles}: ImageSlotsCardProps) => {
    return (
        <ImageSlotsCardStyled>
            <h2>{title}</h2>
            <p>
                {text}
            </p>
            <div className={"image-grid"}>
                {slots.map((slot) => (
                    <ImageSlotLink slot={slot} title={slotTitles[slot.id]} key={slot.id} />
                ))}
            </div>
        </ImageSlotsCardStyled>
    );
};
