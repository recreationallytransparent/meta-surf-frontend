export interface BreakDetailsWebsiteUrl{
    breakId: string,
    infoUrl: string,
    forecastsUrl: string,
    extendedForecastUrl: string,
    domain: string}
export interface BreakDetailsWebsiteUrlSearchResult {
    results: BreakDetailsWebsiteUrl[]
}

export const SEARCH_BREAK_URLS = 'SEARCH_BREAK_URLS'
export const RECEIVE_SEARCH_BREAK_URLS_RESULT = 'RECEIVE_SEARCH_BREAK_URLS_RESULT'
export const RECEIVE_PUT_URL = 'RECEIVE_PUT_URL'

export interface SearchBreakUrls {
    type: typeof SEARCH_BREAK_URLS
    term: string
}

export interface ReceiveBreakUrlSearchResults {
    type: typeof RECEIVE_SEARCH_BREAK_URLS_RESULT
    term: string
    results: BreakDetailsWebsiteUrl[]
}

export interface ReceivePutUrl {
    type: typeof RECEIVE_PUT_URL
    url: BreakDetailsWebsiteUrl
}

export type BreakUrlActionTypes = SearchBreakUrls | ReceiveBreakUrlSearchResults | ReceivePutUrl