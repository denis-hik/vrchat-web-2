import {Language, QuickImageSlot} from "./types";
import avatarAndImage from "../../media/quick/avatar-and.png";
import mountainRoomImage from "../../media/quick/mountain-room.png";
import reflectionDragonOutfitImage from "../../media/quick/reflection-dragon-outfit.png";

const avatarUrl = "https://vrchat.com/home/avatar/avtr_9214895c-30b4-461a-9e31-b11516913fab";
const mountainRoomUrl = "https://vrchat.com/home/world/wrld_19283481-2419-47c9-91aa-5f4977e0dbb3/info";
const reflectionDragonOutfitUrl = "https://jinxxy.com/denis_hik/yQHX1";

export const worksSlots: QuickImageSlot[] = [
    {id: "avatar-and", image: avatarAndImage, url: avatarUrl},
    {id: "mountain-room", image: mountainRoomImage, url: mountainRoomUrl},
    {id: "reflection-dragon-outfit", image: reflectionDragonOutfitImage, imagePosition: "left center", url: reflectionDragonOutfitUrl},
];

export const worksCopy: Record<Language, {title: string; text: string; slotTitles: Record<string, string>}> = {
    ru: {
        title: "Работы",
        text: "Короткая витрина ключевых направлений: аватар, мир и товар для VRChat.",
        slotTitles: {
            "avatar-and": "Аватар AND",
            "mountain-room": "Мир Mountain Room",
            "reflection-dragon-outfit": "Товар: Reflection Dragon Outfit",
        },
    },
    en: {
        title: "Works",
        text: "A compact showcase of the main directions: avatar, world, and VRChat product.",
        slotTitles: {
            "avatar-and": "Avatar AND",
            "mountain-room": "World Mountain Room",
            "reflection-dragon-outfit": "Product: Reflection Dragon Outfit",
        },
    },
};
