import {TImageData, TLink, TStack, TWorld, WingType} from "./reducer/types";
import {RootState} from "../store/store";

export const wingSelector = (root: RootState): WingType => root.global.wing

export const worldsSelector = (root: RootState): TWorld[] => root.global.worlds.result

export const stacksSelector = (root: RootState): TStack[] => root.global.stack

export const linksSelector = (root: RootState): TLink[] => root.global.links

export const loadingSelector = (root: RootState): boolean => root.global.loading

export const imageCurrentSelector = (root: RootState):TImageData => root.global.image