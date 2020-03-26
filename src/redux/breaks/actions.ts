import fetch from 'cross-fetch'
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import environment from '../../environment'
import {BreakActionTypes, GET_BREAK, RECEIVE_BREAK} from "./types";

export function getBreak(breakId: string): BreakActionTypes  {
    return {
        type: GET_BREAK,
        breakId: breakId
    }
}

export function receiveBreak(breakId: string, json: object): BreakActionTypes {
    console.log('receivebreak: ', breakId, json)
    const b = {
        id: "",
        slug: '',
        name: '',
        region: '',
        country :'',
        lngLat: [0.0, 0.0] as [number, number],
        style: '',
        bestSwell: '',
        bestWind: ''
    }
    return {
        type: RECEIVE_BREAK,
        break: b
    }
}

export function fetchBreak(breakId: string) {
    return function(dispatch: ThunkDispatch<{}, {}, AnyAction>) {
        dispatch(getBreak(breakId))

        environment.client.break(breakId)
            .then((json: object) => dispatch(receiveBreak(breakId, json)))
    }
}