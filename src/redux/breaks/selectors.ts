import {createSelector} from "reselect";
import {BreaksState} from "./reducers";
import {Break} from "./types";

const getBreaks = (state: BreaksState) => state.breaks
export const getBreakById = (state: BreaksState, id: string): Break | undefined => {
    return state.breaks.find(x => x.id === id)
}