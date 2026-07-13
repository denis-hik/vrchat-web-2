import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {languageSelector} from "../../../../Context/selectors";
import {worksCopy, worksSlots} from "../../works";
import {ImageSlotsCard} from "../ImageSlotsCard/ImageSlotsCard";

type WorksCardProps = {
    onLinkContextMenu: (event: React.MouseEvent, url: string) => void;
};

export const WorksCard = ({onLinkContextMenu}: WorksCardProps) => {
    const language = useSelector(languageSelector);
    const works = useMemo(() => worksCopy[language], [language]);

    return (
        <ImageSlotsCard title={works.title} text={works.text} slots={worksSlots} slotTitles={works.slotTitles} onLinkContextMenu={onLinkContextMenu} />
    );
};
