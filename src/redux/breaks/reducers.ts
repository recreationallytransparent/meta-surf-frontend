import {Break, BreakActionTypes, GET_BREAK, RECEIVE_BREAKS, SELECT_BREAK} from "./types";
import produce from "immer";

export interface BreaksState {
    breaks: Break[],
    selectedBreak?: Break
    loading: boolean
}

const initialState: BreaksState = {
    breaks: [],
    loading: false
}

export function breaksReducer(state = initialState, action: BreakActionTypes): BreaksState {
    switch(action.type) {
        case GET_BREAK:
            return Object.assign({}, {loading: true}, state)
        case RECEIVE_BREAKS:
            const breaks = action.breaks
            return {loading: false, breaks}
        case SELECT_BREAK:
            return produce(state, draft => {
                draft.selectedBreak = action.break
                return draft
            })
        default:
            return state
    }
}