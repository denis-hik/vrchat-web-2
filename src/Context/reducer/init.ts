import {initGlobalSliceType} from "./types";

import quest from "../../media/stack/01_Meta-Quest-Pro.jpg.png";
import vive from "../../media/stack/He536b68c4c0d48acb0ffe73378829104A.jpg.png";
import base from "../../media/stack/1_95_.png";
import gumroad from "../../media/links/gumroad.svg";
import {Language} from "./types";

const LANGUAGE_STORAGE_KEY = "quick-language";

export const saveLanguage = (language: Language) => {
    if (typeof window === "undefined")
        return;

    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

const isLanguage = (value: string | null): value is Language => {
    return value === "ru" || value === "en";
};

const getInitialLanguage = (): Language => {
    if (typeof window !== "undefined") {
        const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

        if (isLanguage(savedLanguage))
            return savedLanguage;
    }

    if (typeof navigator === "undefined")
        return "en";

    return navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
};

export const globalSliceInitialState: initGlobalSliceType = {
    wing: undefined,
    language: getInitialLanguage(),
    loading: false,
    image: {
        id: "",
        base: "",
        overlay: ""
    },
    worlds: {
        state: "idle",
        result: []
    },
    links: [{
       icon: "JinxXy",
       label: "JinxXy",
       url: "https://jinxxy.com/denis_hik"
    },{
       icon: gumroad,
       label: "Gumroad",
       url: "https://denishik.gumroad.com"
    }],
    stack: [{
        image: quest,
        name: "Quest Pro"
    },{
        image: vive,
        name: "VIVE Tracker"
    },{
        image: base,
        name: "VIVE Stations"
    }],
    support: {
        checkState: "idle",
        sendState: "idle",
        sent: false
    }
}
