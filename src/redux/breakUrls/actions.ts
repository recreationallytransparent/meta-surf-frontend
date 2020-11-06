import {
    BreakDetailsWebsiteUrl,
    BreakUrlActionTypes,
    RECEIVE_PUT_URL,
    RECEIVE_SEARCH_BREAK_URLS_RESULT,
    SEARCH_BREAK_URLS
} from "./types";
import {ThunkDispatch} from "redux-thunk";
import {RootState, Services} from "../store";
import {AnyAction} from "redux";

export function searchingBreakUrls(term: string): BreakUrlActionTypes {
  return {
      type: SEARCH_BREAK_URLS,
      term
  }
}

export function receiveBreakUrlSearchResults(term: string, results: BreakDetailsWebsiteUrl[]): BreakUrlActionTypes {
    return {
        type: RECEIVE_SEARCH_BREAK_URLS_RESULT,
        term,
        results
    }
}

export function receivePutUrl(url: BreakDetailsWebsiteUrl): BreakUrlActionTypes {
    return {
        type: RECEIVE_PUT_URL,
        url
    }
}

export function searchBreakUrls(term: string) {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        dispatch(searchingBreakUrls(term))
        const result = await services.client.searchUrls(term)

        dispatch(receiveBreakUrlSearchResults(term, result.results))
    }
}

export function putBreakUrl(x: BreakDetailsWebsiteUrl) {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        const result = await services.client.putBreakUrl(x)

        dispatch(receivePutUrl(result))
    }
}