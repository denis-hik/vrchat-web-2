export type Language = "ru" | "en";

export type QuickStat = {
    title: string;
    text: string;
};

export type QuickImageSlot = {
    title: string;
    image?: string;
    imagePosition?: string;
};

export type QuickTranslation = {
    languageLabel: string;
    status: string;
    lead: string;
    website: string;
    aboutTitle: string;
    aboutText: string;
    stats: QuickStat[];
    imagesTitle: string;
    imagesText: string;
    imageSlots: QuickImageSlot[];
};
