import fetch from 'cross-fetch'
import {BreakForecast, ForecastActionTypes, GET_FORECAST, MetaForecast, RECEIVE_FORECAST} from "./types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import environment from '../../environment'
import {RootState, Services} from "../store";
import {getCountryRegions, receiveCountryRegions} from "../countryRegions/actions";

export function getForecast(breakId: string): ForecastActionTypes  {
    return {
        type: GET_FORECAST,
        breakId: breakId
    }
}

export function receiveForecast(breakId: string, forecast: MetaForecast): ForecastActionTypes {
    return {
        type: RECEIVE_FORECAST,
        breakId,
        forecast
    }
}

export function fetchForecast(breakId: string) {
    return async (
        dispatch: ThunkDispatch<RootState, Services, AnyAction>,
        getState: () => RootState,
        services: Services
    ) => {
        dispatch(getForecast(breakId))
        const forecast = await services.client.getForecastsClient().getForecast(breakId)
        if (!forecast) console.error('Could not find forecast for break ', breakId)
        else dispatch(receiveForecast(breakId, forecast))
    }
}