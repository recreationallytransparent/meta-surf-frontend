import {combineReducers, createStore} from "redux";
import {forecastsReducer} from "./forecasts/reducers";
import {breaksReducer} from "./breaks/reducers";

export const rootReducer = combineReducers({forecastsReducer, breaksReducer})

export default createStore(rootReducer)