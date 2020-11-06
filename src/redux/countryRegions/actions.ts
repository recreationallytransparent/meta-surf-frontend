import {Country, CountryRegions, CountryRegionsResponse, Region} from "./types";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState, Services} from "../store";
import {AnyAction} from "redux";
import {Break} from "../breaks/types";
import {receiveBreaks} from "../breaks/actions";

export const GET_COUNTRY_REGIONS = "GET_COUNTRY_REGIONS"
export const RECEIVE_COUNTRY_REGIONS = "RECEIVE_COUNTRY_REGIONS"
export const SELECT_COUNTRY = "SELECT_COUNTRY"
export const SELECT_REGION = "SELECT_REGION"
export const CLEAR_SELECTION = "CLEAR_SELECTION"

export interface GetCountryRegions {
    type: typeof GET_COUNTRY_REGIONS
}

export interface ReceiveCountryRegions {
    type: typeof RECEIVE_COUNTRY_REGIONS
    countryRegions: CountryRegions[]
}

export interface SelectCountry {
    type: typeof SELECT_COUNTRY
    country: Country
}

export interface SelectRegion {
    type: typeof SELECT_REGION
    region: Region
}

export interface ClearSelection {
    type: typeof CLEAR_SELECTION
}

export type CountryRegionsActionType = GetCountryRegions | ReceiveCountryRegions | SelectCountry | SelectRegion | ClearSelection

export function receiveCountryRegions(countryRegions: CountryRegions[]): CountryRegionsActionType {
    return {type: RECEIVE_COUNTRY_REGIONS, countryRegions }
}

export function getCountryRegions(): CountryRegionsActionType {
    return {type: GET_COUNTRY_REGIONS}
}

export function selectCountry(country: Country): CountryRegionsActionType {
    return {type: SELECT_COUNTRY, country}
}


export function clearCountryRegionsSelection(): CountryRegionsActionType {
    return {type: CLEAR_SELECTION}
}

// export function fetchCountryRegions(): ThunkFunction<CountryRegions[]> {
//     return async (
//         dispatch: ThunkDispatch<RootState, Services, AnyAction>,
//         getState: () => RootState,
//         services: Services
//     ) => {
//         dispatch(getCountryRegions())
//         const countryRegions = await services.client.getCountryRegions()
//         dispatch(receiveCountryRegions(countryRegions))
//         return countryRegions
//     }
// }

export function fetchCountryRegions(): ThunkAction<Promise<CountryRegionsResponse>, RootState, Services, AnyAction> {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        dispatch(getCountryRegions())
        const countryRegions = await services.client.getCountryRegions()
        dispatch(receiveCountryRegions(countryRegions.countryRegions))
        return countryRegions
    }
}

export function selectRegion(region: Region): ThunkAction<Promise<Break[]>, RootState, Services, AnyAction> {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        dispatch({type: SELECT_REGION, region})
        const selectedCountry = getState().countryRegions.selectedCountry

        if (!selectedCountry) throw Error('no selected country')

        const breaks: Break[] = await services.client.breaksByCountryRegion(selectedCountry.name, region.name)

        dispatch(receiveBreaks(breaks))

        return breaks
    }
}
