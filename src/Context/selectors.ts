import {TImageData, TLink, TStack, TSupportProduct, TWorld, WingType} from "./reducer/types";
import {RootState} from "../store/store";

export const wingSelector = (root: RootState): WingType => root.global.wing

export const worldsSelector = (root: RootState): TWorld[] => root.global.worlds.result

export const stacksSelector = (root: RootState): TStack[] => root.global.stack

export const linksSelector = (root: RootState): TLink[] => root.global.links

export const loadingSelector = (root: RootState): boolean => root.global.loading

export const imageCurrentSelector = (root: RootState):TImageData => root.global.image

export const supportProductSelector = (root: RootState): TSupportProduct | undefined => root.global.support.product

export const supportCheckStateSelector = (root: RootState) => root.global.support.checkState

export const supportSendStateSelector = (root: RootState) => root.global.support.sendState

export const supportErrorSelector = (root: RootState) => root.global.support.error

export const supportSentSelector = (root: RootState) => root.global.support.sent
