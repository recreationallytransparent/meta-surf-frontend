import {BreakDetailsWebsiteUrl, BreakUrlActionTypes, RECEIVE_SEARCH_BREAK_URLS_RESULT} from "./types";
import {BreakActionTypes} from "../breaks/types";
import produce from "immer";

export interface BreakUrlState  {
    termResults: Record<string, BreakDetailsWebsiteUrl[]>
    putUrlResult?: BreakDetailsWebsiteUrl
}

export const initialBreakUrlState: BreakUrlState = {
    termResults: {}
}

export function breakUrlsReducer(state: BreakUrlState = initialBreakUrlState, action: BreakUrlActionTypes): BreakUrlState {
    switch(action.type) {
        case RECEIVE_SEARCH_BREAK_URLS_RESULT:
            return produce(state, draft => {
                draft.termResults[action.term] = action.results
                return draft
            })
        default:
            return state;
    }
}