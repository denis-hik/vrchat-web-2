import React, {useCallback, useEffect, useState} from "react";
import {createPortal} from "react-dom";
import {ImagePreviewDialogStyled} from "./styled";

export type PreviewDialogImage = {
    src: string;
    alt?: string;
};

type ImagePreviewDialogProps = {
    open: boolean;
    title: string;
    listImages: PreviewDialogImage[];
    buttonHeader?: {
        label: string;
        url: string;
    };
    onClose: () => void;
    onExited?: () => void;
};

const animationDuration = 220;

export const ImagePreviewDialog = ({open, title, listImages, buttonHeader, onClose, onExited}: ImagePreviewDialogProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(open);
    const [isVisible, setIsVisible] = useState(false);
    const [carouselHeight, setCarouselHeight] = useState<number>();
    const hasMultipleImages = listImages.length > 1;
    const activeImage = listImages[activeIndex] ?? listImages[0];

    const showPrevious = useCallback(() => {
        setActiveIndex((index) => (index === 0 ? listImages.length - 1 : index - 1));
    }, [listImages.length]);

    const showNext = useCallback(() => {
        setActiveIndex((index) => (index + 1) % listImages.length);
    }, [listImages.length]);

    const updateCarouselHeight = useCallback((image: HTMLImageElement) => {
        const panelWidth = image.closest(".dialog-panel")?.clientWidth ?? image.clientWidth;
        const maxHeight = Math.max(window.innerHeight - 176, 260);
        const imageRatioHeight = panelWidth * (image.naturalHeight / image.naturalWidth);

        setCarouselHeight(Math.min(imageRatioHeight, maxHeight));
    }, []);

    const handleHeaderButtonClick = useCallback(() => {
        if (buttonHeader) {
            window.open(buttonHeader.url, "_blank", "noopener,noreferrer");
        }
    }, [buttonHeader]);

    useEffect(() => {
        if (open) {
            setIsMounted(true);
            const animationFrameId = window.requestAnimationFrame(() => {
                setIsVisible(true);
            });

            return () => {
                window.cancelAnimationFrame(animationFrameId);
            };
        }

        setIsVisible(false);

        if (!isMounted) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setIsMounted(false);
            onExited?.();
        }, animationDuration);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isMounted, onExited, open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }

            if (event.key === "ArrowLeft" && hasMultipleImages) {
                showPrevious();
            }

            if (event.key === "ArrowRight" && hasMultipleImages) {
                showNext();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [hasMultipleImages, onClose, open, showNext, showPrevious]);

    useEffect(() => {
        if (activeIndex > listImages.length - 1) {
            setActiveIndex(0);
        }
    }, [activeIndex, listImages.length]);

    useEffect(() => {
        if (open) {
            setActiveIndex(0);
            setCarouselHeight(undefined);
        }
    }, [open, title]);

    if (!isMounted || !activeImage) {
        return null;
    }

    const dialog = (
        <ImagePreviewDialogStyled
            role={"dialog"}
            aria-modal={"true"}
            aria-label={title}
            $visible={isVisible}
            onMouseDown={onClose}
        >
            <div className={"dialog-panel"} onMouseDown={(event) => event.stopPropagation()}>
                <div className={"dialog-header"}>
                    <h3>{title}</h3>
                    <div className={"header-actions"}>
                        {buttonHeader && (
                            <button type={"button"} className={"header-link"} onClick={handleHeaderButtonClick}>
                                {buttonHeader.label}
                            </button>
                        )}
                        <button type={"button"} className={"icon-button"} onClick={onClose} aria-label={"Close"}>
                            X
                        </button>
                    </div>
                </div>

                <div className={"carousel"} style={carouselHeight ? {height: carouselHeight} : undefined}>
                    {hasMultipleImages && (
                        <button type={"button"} className={"carousel-button prev"} onClick={showPrevious} aria-label={"Previous image"}>
                            {"<"}
                        </button>
                    )}

                    <img src={activeImage.src} alt={activeImage.alt ?? `${title} ${activeIndex + 1}`} onLoad={(event) => updateCarouselHeight(event.currentTarget)} />

                    {hasMultipleImages && (
                        <button type={"button"} className={"carousel-button next"} onClick={showNext} aria-label={"Next image"}>
                            {">"}
                        </button>
                    )}
                </div>

                <div className={"carousel-footer"}>
                    <span>
                        {activeIndex + 1} / {listImages.length}
                    </span>
                </div>
            </div>
        </ImagePreviewDialogStyled>
    );

    if (typeof document === "undefined") {
        return dialog;
    }

    return createPortal(dialog, document.body);
};
