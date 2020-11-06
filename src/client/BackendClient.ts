import {Break, BreaksResponse} from "../redux/breaks/types";
import urljoin from 'url-join'
import {SearchResults} from "../redux/search/types";
import {CountryRegionsResponse} from "../redux/countryRegions/types";
import {ForecastsClient, ForecastsClientImpl} from "./ForecastsClient";
import {BreakDetailsWebsiteUrl, BreakDetailsWebsiteUrlSearchResult} from "../redux/breakUrls/types";

export interface Client {
    break(breakId: string): Promise<Break | undefined>
    breaksByCountryRegion(countryName: string, regionName: string): Promise<Break[]>
    search(query: string): Promise<SearchResults>
    getCountryRegions(): Promise<CountryRegionsResponse>
    getForecastsClient(): ForecastsClient
    searchUrls(term: String): Promise<BreakDetailsWebsiteUrlSearchResult>
    putBreakUrl(url: BreakDetailsWebsiteUrl): Promise<BreakDetailsWebsiteUrl>
}

class BackendClient implements Client {
    baseUrl: string
    forecastsClient: ForecastsClient

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
        this.forecastsClient = new ForecastsClientImpl(baseUrl)
    }

    getForecastsClient(): ForecastsClient {
        return this.forecastsClient;
    }

    break(breakId: string): Promise<Break | undefined> {
        return fetch(urljoin([this.baseUrl, 'break', breakId]))
            .then(response => response.json())
            .then(response => {
                return response
            })
    }

    breaksByCountryRegion(countryName: string, regionName: string): Promise<Break[]> {
        return fetch(urljoin(this.baseUrl, "countryRegions", "breaks", "?countryName=" + countryName, "&regionName=" + regionName))
            .then(async response => {
                const breaksResponse: BreaksResponse = await response.json()
                return breaksResponse.breaks
            })
    }

    search(query: string): Promise<SearchResults> {
        const url = urljoin(this.baseUrl, 'search', '?q=' + query)
        console.log(url)
        return fetch(url)
            .then(async response => {
                console.log('search response: ', response)
                return (await response.json()) as SearchResults
            })
    }

    getCountryRegions(): Promise<CountryRegionsResponse> {
        return fetch(urljoin(this.baseUrl, 'countryRegions')).then(async response => {
            return (await response.json()) as CountryRegionsResponse
        }).catch(e => {
            console.error(e)
            throw e
        })
    }

    searchUrls(term: String): Promise<BreakDetailsWebsiteUrlSearchResult> {
        return fetch(urljoin(this.baseUrl, 'admin', 'break-urls', '?search=' + term)).then(response => response.json())
    }

    putBreakUrl(url: BreakDetailsWebsiteUrl): Promise<BreakDetailsWebsiteUrl> {
        return fetch(urljoin(this.baseUrl, 'admin', 'break-urls'), {
            method: 'POST',
            body: JSON.stringify(url)
        }).then(r => r.json())
    }
}

export default BackendClient