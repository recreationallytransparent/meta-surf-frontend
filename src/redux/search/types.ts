import {Break} from "../breaks/types";

export const REQUEST_SEARCH = "REQUEST_SEARCH"
export const RECEIVE_SEARCH = "RECEIVE_SEARCH"

export interface SearchResults {
    query: String
    breaks: Break[]
}

export interface RequestSearch {
    type: typeof REQUEST_SEARCH
    query: String
}

export interface ReceiveSearch {
    type: typeof RECEIVE_SEARCH
    results: SearchResults
}

export type SearchActionTypes = RequestSearch | ReceiveSearch