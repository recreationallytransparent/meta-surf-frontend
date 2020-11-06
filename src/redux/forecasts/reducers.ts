import {ForecastActionTypes, ForecastState, GET_FORECAST, RECEIVE_FORECAST} from "./types";
import produce from "immer";

const initialState: ForecastState = {
    forecasts: {},
    loading: false
}

export function forecastsReducer(state = initialState, action: ForecastActionTypes): ForecastState {
    switch(action.type) {
        case GET_FORECAST:
            return produce(state, draft => {
                draft.loading = true
                return draft
            })
        case RECEIVE_FORECAST:
            return produce(state, draft => {
                draft.forecasts[action.breakId] = action.forecast
                draft.loading = false
                return draft
            })
        default:
            return state
    }
}