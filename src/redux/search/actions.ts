import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import environment from '../../environment'
import {RECEIVE_SEARCH, REQUEST_SEARCH, RequestSearch, SearchActionTypes, SearchResults} from "./types";

export function requestSearch(query: string): RequestSearch {
    return {
        type: REQUEST_SEARCH,
        query
    }
}

export function receiveSearch(results: SearchResults): SearchActionTypes{
    return {
        type: RECEIVE_SEARCH,
        results
    }
}

export function doSearch(query: string) {
    return function(dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        dispatch(requestSearch(query))

        environment.client.search(query)
            .then((json: SearchResults) => json ? dispatch(receiveSearch(json)) : {})
    }
}