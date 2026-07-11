import {Language, QuickTranslation} from "./types";
import avatarAndImage from "../../media/quick/avatar-and.png";
import mountainRoomImage from "../../media/quick/mountain-room.png";
import reflectionDragonOutfitImage from "../../media/quick/reflection-dragon-outfit.png";

const avatarUrl = "https://vrchat.com/home/avatar/avtr_9214895c-30b4-461a-9e31-b11516913fab";
const mountainRoomUrl = "https://vrchat.com/home/world/wrld_19283481-2419-47c9-91aa-5f4977e0dbb3/info";
const reflectionDragonOutfitUrl = "https://jinxxy.com/denis_hik/yQHX1";

export const translations: Record<Language, QuickTranslation> = {
    ru: {
        languageLabel: "Язык",
        status: "13к часов онлайн",
        lead: "VRChat-креатор с фокусом на атмосферные миры, аватары, визуальный стиль и интерактивные веб-страницы.",
        website: "Сайт",
        aboutTitle: "Обо мне",
        aboutText: "Создаю визуальные проекты вокруг VRChat: миры, аватары, образы, промо-страницы и детали, которые помогают работе выглядеть цельно и запоминаться.",
        stats: [
            {title: "VR", text: "основная среда"},
            {title: "3D", text: "аватары и миры"},
            {title: "Web", text: "презентации и эффекты"},
        ],
        imagesTitle: "Работы",
        imagesText: "Короткая витрина ключевых направлений: аватар, мир и товар для VRChat.",
        imageSlots: [
            {title: "Аватар AND", image: avatarAndImage, url: avatarUrl},
            {title: "Мир Mountain Room", image: mountainRoomImage, url: mountainRoomUrl},
            {title: "Товар: Reflection Dragon Outfit", image: reflectionDragonOutfitImage, imagePosition: "left center", url: reflectionDragonOutfitUrl},
        ],
    },
    en: {
        languageLabel: "Language",
        status: "13k hours online",
        lead: "VRChat creator focused on atmospheric worlds, avatars, visual style, and interactive web pages.",
        website: "Website",
        aboutTitle: "About me",
        aboutText: "I create visual projects around VRChat: worlds, avatars, outfits, promo pages, and details that make the work feel complete and memorable.",
        stats: [
            {title: "VR", text: "main space"},
            {title: "3D", text: "avatars and worlds"},
            {title: "Web", text: "presentations and effects"},
        ],
        imagesTitle: "Works",
        imagesText: "A compact showcase of the main directions: avatar, world, and VRChat product.",
        imageSlots: [
            {title: "Avatar AND", image: avatarAndImage, url: avatarUrl},
            {title: "World Mountain Room", image: mountainRoomImage, url: mountainRoomUrl},
            {title: "Product: Reflection Dragon Outfit", image: reflectionDragonOutfitImage, imagePosition: "left center", url: reflectionDragonOutfitUrl},
        ],
    },
};
