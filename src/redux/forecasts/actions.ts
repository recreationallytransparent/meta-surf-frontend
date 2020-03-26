import fetch from 'cross-fetch'
import {ForecastActionTypes, GET_FORECAST, MetaForecast, RECEIVE_FORECAST} from "./types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import environment from '../../environment'

export function getForecast(breakId: string): ForecastActionTypes  {
    return {
        type: GET_FORECAST,
        breakId: breakId
    }
}

export function receiveForecast(breakId: string, json: object): ForecastActionTypes {
    console.log('receive forecast: ', breakId, json)

    const forecast = {} as MetaForecast
    return {
        type: RECEIVE_FORECAST,
        forecast
    }
}

export function fetchBreak(breakId: string) {
    return function(dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        dispatch(getForecast(breakId))

        environment.client.break(breakId)
            .then((json: object) => dispatch(receiveForecast(breakId, json)))
    }
}