import {RECEIVE_SEARCH, REQUEST_SEARCH, SearchActionTypes, SearchResults} from "./types";

export type SearchState = {
    results?: SearchResults,
    searching: boolean
}

const initialState: SearchState = {
    searching: false
}

export function searchReducer(state = initialState, action: SearchActionTypes): SearchState{
    switch(action.type) {
        case REQUEST_SEARCH:
            return Object.assign({}, {searching: true}, state)
        case RECEIVE_SEARCH:
            return {searching: false, results: action.results}
        default:
            return state
    }
}