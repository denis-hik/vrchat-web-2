export type {Language} from "../../Context/reducer/types";

export type QuickStat = {
    title: string;
    text: string;
};

export type QuickImageSlot = {
    id: string;
    image?: string;
    imagePosition?: string;
    url?: string;
};

export type QuickTranslation = {
    languageLabel: string;
    status: string;
    trustRank: string;
    lead: string;
    website: string;
    aboutTitle: string;
    aboutText: string;
    stats: QuickStat[];
};
