import {ForecastActionTypes, ForecastState, GET_FORECAST, RECEIVE_FORECAST} from "./types";

const initialState: ForecastState = {
    forecasts: [],
    loading: false
}

export function forecastsReducer(state = initialState, action: ForecastActionTypes): ForecastState {
    switch(action.type) {
        case GET_FORECAST:
            return Object.assign({}, {loading: true}, state)
        case RECEIVE_FORECAST:
            const forecasts = state.forecasts.concat([action.forecast])
            return {loading: false, forecasts}
        default:
            return state
    }
}