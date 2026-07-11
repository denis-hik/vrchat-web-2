import {Language, QuickTranslation} from "./types";

export const translations: Record<Language, QuickTranslation> = {
    ru: {
        languageLabel: "Язык",
        status: "13к часов онлайн",
        trustRank: "Проверенный",
        lead: "VRChat-креатор с фокусом на атмосферные миры, аватары, визуальный стиль и интерактивные веб-страницы.",
        website: "Сайт",
        aboutTitle: "Обо мне",
        aboutText: "Создаю визуальные проекты вокруг VRChat: миры, аватары, образы, промо-страницы и детали, которые помогают работе выглядеть цельно и запоминаться.",
        stats: [
            {title: "VR", text: "основная среда"},
            {title: "3D", text: "аватары и миры"},
            {title: "Web", text: "презентации и эффекты"},
        ],
    },
    en: {
        languageLabel: "Language",
        status: "13k hours online",
        trustRank: "Trusted User",
        lead: "VRChat creator focused on atmospheric worlds, avatars, visual style, and interactive web pages.",
        website: "Website",
        aboutTitle: "About me",
        aboutText: "I create visual projects around VRChat: worlds, avatars, outfits, promo pages, and details that make the work feel complete and memorable.",
        stats: [
            {title: "VR", text: "main space"},
            {title: "3D", text: "avatars and worlds"},
            {title: "Web", text: "presentations and effects"},
        ],
    },
};
