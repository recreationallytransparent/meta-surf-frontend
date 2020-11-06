import fetch from 'cross-fetch'
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import environment from '../../environment'
import {Break, BreakActionTypes, GET_BREAK, RECEIVE_BREAKS, SELECT_BREAK} from "./types";
import {GET_COUNTRY_REGIONS} from "../countryRegions/actions";
import {RootState, Services} from "../store";
import {getBreakById} from "./selectors";

export function getBreak(breakId: string): BreakActionTypes  {
    return {
        type: GET_BREAK,
        breakId: breakId
    }
}

export function receiveBreaks(breaks: Break[]): BreakActionTypes {
    return {
        type: RECEIVE_BREAKS,
        breaks
    }
}

export function  selectBreak(b: Break): BreakActionTypes {
    return {type: SELECT_BREAK, break: b}
}

// export function fetchBreak(breakId: string) {
//     return function(dispatch: ThunkDispatch<{}, {}, AnyAction>) {
//         dispatch(getBreak(breakId))
//
//         environment.client.break(breakId)
//             .then((json: Break | null) => json ? dispatch(receiveBreak(breakId, json)) : {})
//     }
// }

export function fetchBreaksForCountryRegion(countryName: string, regionName: string): ThunkAction<Promise<Break[]>, RootState, Services, AnyAction> {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        const breaks = await services.client.breaksByCountryRegion(countryName, regionName)
        dispatch(receiveBreaks(breaks))
        return breaks
    }
}

export function fetchBreakFromCache(breakId: string) {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        let b = getBreakById(getState().breaks, breakId)
        if (b === undefined) {
            b = await services.client.break(breakId)
        }
        if(b) dispatch(receiveBreaks([b]))
    }
}
