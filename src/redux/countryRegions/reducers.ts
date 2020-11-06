import {Country, CountryRegions, Region} from "./types";
import {
    CLEAR_SELECTION,
    CountryRegionsActionType,
    GET_COUNTRY_REGIONS,
    RECEIVE_COUNTRY_REGIONS,
    SELECT_COUNTRY,
    SELECT_REGION
} from "./actions";
import produce from 'immer'
import _ from 'lodash'
import { createSelector } from 'reselect'

export interface CountryRegionsState {
    countryRegionMap: Record<string, CountryRegions>
    selectedCountry?: Country
    selectedRegion?: Region
    loading: boolean
}

const initialCountryRegionsState: CountryRegionsState = {
    countryRegionMap: {},
    loading: false
}

const getSelectedCountry = (state: CountryRegionsState) => state.selectedCountry
const getCountryRegionsMap = (state: CountryRegionsState) => state.countryRegionMap
export const getSelectableRegions = createSelector([getSelectedCountry, getCountryRegionsMap], (selectedCountry, regionsMap) => {
    if (selectedCountry) return regionsMap[selectedCountry.id].regions
    return []
})

export function countryRegionsReducer(state = initialCountryRegionsState, action: CountryRegionsActionType): CountryRegionsState {
    switch(action.type) {
        case GET_COUNTRY_REGIONS:
            return produce(state, draft => {
                draft.loading = true
                return draft
            })
        case RECEIVE_COUNTRY_REGIONS:
            return produce(state, draft => {
                draft.countryRegionMap = _.reduce(action.countryRegions, (hashMap: Record<string, CountryRegions>, countryRegion: CountryRegions) => {
                    hashMap[countryRegion.country.id] = countryRegion
                    return hashMap
                }, {} as Record<string, CountryRegions>)
                return draft
            })

        case SELECT_COUNTRY:
            return produce(state, draft => {
                const countryRegions: CountryRegions | undefined  = draft.countryRegionMap[action.country.id]
                if (countryRegions) {
                    draft.selectedCountry = countryRegions.country
                }
                return draft
            })

        case SELECT_REGION:
            return produce(state, draft => {
                if (draft.selectedCountry && draft.countryRegionMap[draft.selectedCountry.id]) {
                    draft.selectedRegion = draft.countryRegionMap[draft.selectedCountry.id].regions.find(x => x.id === action.region.id)
                }
                return draft
            })

        case CLEAR_SELECTION:
            return produce(state, draft => {
                draft.selectedCountry = undefined
                draft.selectedRegion = undefined
                return draft
            })
        default:
            return state
    }
}