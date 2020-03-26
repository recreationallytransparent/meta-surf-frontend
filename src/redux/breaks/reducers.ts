import {BreakActionTypes, BreaksState, GET_BREAK, RECEIVE_BREAK} from "./types";

const initialState: BreaksState = {
    breaks: [],
    loading: false
}

export function breaksReducer(state = initialState, action: BreakActionTypes): BreaksState {
    switch(action.type) {
        case GET_BREAK:
            return Object.assign({}, {loading: true}, state)
        case RECEIVE_BREAK:
            const breaks = state.breaks.concat([action.break])
            return {loading: false, breaks}
        default:
            return state
    }
}