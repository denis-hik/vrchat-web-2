import {initGlobalSliceType} from "./types";

import quest from "../../media/stack/01_Meta-Quest-Pro.jpg.png";
import vive from "../../media/stack/He536b68c4c0d48acb0ffe73378829104A.jpg.png";
import base from "../../media/stack/1_95_.png";
import gumroad from "../../media/links/gumroad.svg";

export const globalSliceInitialState: initGlobalSliceType = {
    wing: undefined,
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
       url: "https://jinxxy.com/denis_hik"
    },{
       icon: gumroad,
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
