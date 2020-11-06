export interface Break {
    id: string,
    slug: string,
    name: string,
    region: string,
    country: string,
    lngLat: [number, number],
    style: string,
    bestSwell: string,
    bestWind: string
}

export interface BreaksResponse {
    breaks: Break[]
}



export const GET_BREAK = "GET_BREAK"
export const RECEIVE_BREAKS = "RECEIVE_BREAKS"
export const SELECT_BREAK = "SELECT_BREAK"

export interface GetBreak {
    type: typeof GET_BREAK,
    breakId: string
}

export interface ReceiveBreak {
    type: typeof RECEIVE_BREAKS
    breaks: Break[]
}

export interface SelectBreak {
    type: typeof SELECT_BREAK,
    break: Break
}

export type BreakActionTypes = GetBreak | ReceiveBreak | SelectBreak


