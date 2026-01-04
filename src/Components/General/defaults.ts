import React from "react";
import StartPage from "../../Page/StartPage";
import {GooeyNavItem} from "../public/GooeyNav/GooeyNav";
// import {EquinePage} from "../../Page/Equine/Components/EquinePage";
// import {ProgrammingPage} from "../../Page/Programming/ProgrammingPage";
// import {ProjectPage} from "../../Page/Projects/Components/ProjectPage";
// import {ExperiencePage} from "../../Page/Experience/ExperiencePage";

type TRoute = {
    path: string;
    component: React.FC;
} & Omit<GooeyNavItem, "href">

export const routes: TRoute[] = [{
    path: "*",
    label: "Start",
    headerSmall: true,
    component: StartPage
},
//     {
//     path: "/programming",
//     label: "Programming",
//     component: ProgrammingPage
// },{
//     path: "/equine",
//     label: "Horse riding",
//     component: EquinePage
// },{
//     path: "/projects",
//     label: "Projects",
//     component: ProjectPage
// },{
//     path: "/experience",
//     label: "Experience",
//     hiddenNavBar: true,
//     component: ExperiencePage
// }
]