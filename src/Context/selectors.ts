import {WingType} from "./reducer/types";
import {RootState} from "../store";
import {TWorld} from "./actions/worlds";

export const wingSelector = (root: RootState): WingType => root.global.wing

export const worldsSelector = (root: RootState): TWorld[] => root.global.worlds.result