import React, {useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {ImagePreviewDialog, PreviewDialogImage} from "../../../../Components/public/ImagePreviewDialog/ImagePreviewDialog";
import {languageSelector} from "../../../../Context/selectors";
import avatarAndImage from "../../../../media/quick/avatar-and.png";
import avatarAndPreview1 from "../../../../media/quick/avatar-and-preview-1.png";
import avatarAndPreview2 from "../../../../media/quick/avatar-and-preview-2.png";
import avatarAndPreview3 from "../../../../media/quick/avatar-and-preview-3.png";
import avatarAndPreview4 from "../../../../media/quick/avatar-and-preview-4.png";
import avatarAndPreview5 from "../../../../media/quick/avatar-and-preview-5.png";
import mountainRoomImage from "../../../../media/quick/mountain-room.png";
import mountainRoomPreview1 from "../../../../media/quick/mountain-room-preview-1.png";
import {mountainRoomUrl, worksCopy, worksSlots} from "../../works";
import {ImageSlots} from "./more/ImageSlots/ImageSlots";

type WorksBlockProps = {
    onLinkContextMenu: (event: React.MouseEvent, url: string) => void;
};

type ActivePreview = "avatar-and" | "mountain-room";

type PreviewConfig = {
    title: string;
    listImages: PreviewDialogImage[];
    buttonHeader?: {
        label: string;
        url: string;
    };
};

const avatarAndImages: PreviewDialogImage[] = [
    {src: avatarAndImage},
    {src: avatarAndPreview1},
    {src: avatarAndPreview2},
    {src: avatarAndPreview3},
    {src: avatarAndPreview4},
    {src: avatarAndPreview5},
];

const mountainRoomImages: PreviewDialogImage[] = [
    {src: mountainRoomImage},
    {src: mountainRoomPreview1},
];

export const WorksBlock = ({onLinkContextMenu}: WorksBlockProps) => {
    const language = useSelector(languageSelector);
    const works = useMemo(() => worksCopy[language], [language]);
    const [activePreview, setActivePreview] = useState<ActivePreview>();
    const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);

    const openAvatarAndDialog = useCallback(() => {
        setActivePreview("avatar-and");
        setIsPreviewDialogOpen(true);
    }, []);

    const openMountainRoomDialog = useCallback(() => {
        setActivePreview("mountain-room");
        setIsPreviewDialogOpen(true);
    }, []);

    const closePreviewDialog = useCallback(() => setIsPreviewDialogOpen(false), []);
    const clearPreviewDialog = useCallback(() => setActivePreview(undefined), []);

    const previewConfig = useMemo<PreviewConfig | undefined>(() => {
        if (activePreview === "avatar-and") {
            return {
                title: works.slotTitles["avatar-and"],
                listImages: avatarAndImages,
            };
        }

        if (activePreview === "mountain-room") {
            return {
                title: works.slotTitles["mountain-room"],
                listImages: mountainRoomImages,
                buttonHeader: {
                    label: works.previewDialog.more,
                    url: mountainRoomUrl,
                },
            };
        }

        return undefined;
    }, [activePreview, works.previewDialog.more, works.slotTitles]);

    return (
        <>
            <ImageSlots
                title={works.title}
                text={works.text}
                slots={worksSlots}
                slotTitles={works.slotTitles}
                onLinkContextMenu={onLinkContextMenu}
                onAvatarAndOpen={openAvatarAndDialog}
                onMountainRoomOpen={openMountainRoomDialog}
            />
            {previewConfig && (
                <ImagePreviewDialog
                    open={isPreviewDialogOpen}
                    title={previewConfig.title}
                    listImages={previewConfig.listImages}
                    buttonHeader={previewConfig.buttonHeader}
                    onClose={closePreviewDialog}
                    onExited={clearPreviewDialog}
                />
            )}
        </>
    );
};
