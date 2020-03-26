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

export interface BreaksState {
    breaks: Break[],
    loading: boolean
}

export const GET_BREAK = "GET_BREAK"
export const RECEIVE_BREAK = "RECEIVE_BREAK"

export interface GetBreak {
    type: typeof GET_BREAK,
    breakId: string
}

export interface ReceiveBreak {
    type: typeof RECEIVE_BREAK
    break: Break
}

export type BreakActionTypes = GetBreak | ReceiveBreak


