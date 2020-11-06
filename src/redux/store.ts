import {AnyAction, applyMiddleware, combineReducers, createStore, Middleware, Store} from "redux";
import {forecastsReducer} from "./forecasts/reducers";
import {breaksReducer, BreaksState} from "./breaks/reducers";
import logger from 'redux-logger'
import {searchReducer, SearchState} from "./search/reducers";
import {ForecastState} from "./forecasts/types";
import thunkMiddleware from 'redux-thunk';
import {countryRegionsReducer, CountryRegionsState} from "./countryRegions/reducers";
import {Client} from "../client/BackendClient";
import {breakUrlsReducer, BreakUrlState} from "./breakUrls/reducers";

export type RootState = {
    forecasts: ForecastState,
    breaks: BreaksState,
    search: SearchState,
    countryRegions: CountryRegionsState,
    breakUrls: BreakUrlState
}

export const rootReducer = combineReducers<RootState>({
    forecasts: forecastsReducer,
    breaks: breaksReducer,
    search: searchReducer,
    countryRegions: countryRegionsReducer,
    breakUrls: breakUrlsReducer
})

export type Services = {
    client: Client
}

export interface MetaSurfStore extends Store<RootState, AnyAction> {

}

export function getStore(client: Client): MetaSurfStore {
    const middlewares: Middleware[] = [
        logger,
        thunkMiddleware.withExtraArgument({client})
    ]
    return createStore(rootReducer, applyMiddleware(...middlewares))
}
