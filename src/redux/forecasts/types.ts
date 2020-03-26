export interface WaveDetails {
    swellHeightM: number,
    swellDirection: string,
    period: number
}

export interface WindDetails {
    windkph: number,
    windDirection: string,
    windState: string
}

export interface BreakDetails {
    breakId: string,
    dateTime: number,
    score: number,
    waveDetails: WaveDetails,
    windDetails: WindDetails,
    highTide: number
    lowTide: number
}

export interface BreakForecast {
    breakId: String,
    forecast: [BreakDetails]
}

export interface MetaForecast {
    forecasts: [string, BreakForecast][]
}

export interface ForecastState {
    forecasts: MetaForecast[],
    loading: boolean
}

export const GET_FORECAST = "GET_FORECAST"

export const RECEIVE_FORECAST = 'RECEIVE_FORECAST'

export interface GetForecast {
    type: typeof GET_FORECAST
    breakId: string
}

export interface ReceiveForecast {
    type: typeof RECEIVE_FORECAST
    forecast: MetaForecast
}

export type ForecastActionTypes = GetForecast | ReceiveForecast


