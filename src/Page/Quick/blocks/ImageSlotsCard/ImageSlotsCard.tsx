import React from "react";
import {QuickImageSlot} from "../../types";
import {ImageSlotsCardStyled} from "./styled";

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
                    <div className={"image-slot"} key={slot.title}>
                        {slot.image && <img src={slot.image} alt={slot.title} style={{objectPosition: slot.imagePosition}} />}
                        <span>{slot.title}</span>
                    </div>
                ))}
            </div>
        </ImageSlotsCardStyled>
    );
};
