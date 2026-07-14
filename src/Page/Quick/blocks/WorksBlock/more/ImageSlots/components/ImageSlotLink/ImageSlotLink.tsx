import React from "react";
import {QuickImageSlot} from "../../../../../../types";
import {ImageSlotLinkStyled} from "./styled";

type ImageSlotLinkProps = {
    slot: QuickImageSlot;
    title: string;
    onContextMenu: (event: React.MouseEvent, url: string) => void;
    onOpen?: () => void;
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

export const ImageSlotLink = ({slot, title, onContextMenu, onOpen}: ImageSlotLinkProps) => {
    const handleClick = (event: React.MouseEvent) => {
        if (event.button !== 0) {
            return;
        }

        if (onOpen) {
            onOpen();
            return;
        }

        if (slot.url) {
            window.open(slot.url, "_blank", "noopener,noreferrer");
        }
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        if (event.button !== 2) {
            return;
        }

        if (onOpen) {
            return;
        }

        if (!slot.url) {
            return;
        }

        onContextMenu(event, slot.url);
    };

    const content = (
        <>
            <ImageSlotImage image={slot.image} imagePosition={slot.imagePosition} alt={slot.id} />
            <span>{title}</span>
        </>
    );

    if (!slot.url && !onOpen) {
        return (
            <ImageSlotLinkStyled as={"div"}>
                {content}
            </ImageSlotLinkStyled>
        );
    }

    return (
        <ImageSlotLinkStyled
            type={"button"}
            $clickable={true}
            onClick={handleClick}
            onContextMenu={handleContextMenu}
            onMouseDown={handleMouseDown}
        >
            {content}
        </ImageSlotLinkStyled>
    );
};
