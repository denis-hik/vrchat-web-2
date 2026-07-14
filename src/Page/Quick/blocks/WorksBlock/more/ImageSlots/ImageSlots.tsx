import React from "react";
import {QuickImageSlot} from "../../../../types";
import {ImageSlotsStyled} from "./styled";
import {ImageSlotLink} from "./components/ImageSlotLink/ImageSlotLink";

type ImageSlotsProps = {
    title: string;
    text: string;
    slots: QuickImageSlot[];
    slotTitles: Record<string, string>;
    onLinkContextMenu: (event: React.MouseEvent, url: string) => void;
    onAvatarAndOpen: () => void;
    onMountainRoomOpen: () => void;
};

export const ImageSlots = ({title, text, slots, slotTitles, onLinkContextMenu, onAvatarAndOpen, onMountainRoomOpen}: ImageSlotsProps) => {
    const getSlotOpenHandler = (slotId: string) => {
        if (slotId === "avatar-and") {
            return onAvatarAndOpen;
        }

        if (slotId === "mountain-room") {
            return onMountainRoomOpen;
        }

        return undefined;
    };

    return (
        <ImageSlotsStyled>
            <h2>{title}</h2>
            <p>
                {text}
            </p>
            <div className={"image-grid"}>
                {slots.map((slot) => (
                    <ImageSlotLink
                        slot={slot}
                        title={slotTitles[slot.id]}
                        onContextMenu={onLinkContextMenu}
                        onOpen={getSlotOpenHandler(slot.id)}
                        key={slot.id}
                    />
                ))}
            </div>
        </ImageSlotsStyled>
    );
};
