import {BreakForecast, MetaForecast} from "../redux/forecasts/types";
import urljoin from "url-join";
import {Break} from "../redux/breaks/types";
export interface ForecastsClient {
    getForecast(breakId: string): Promise<MetaForecast | undefined>
}

export class ForecastsClientImpl implements ForecastsClient {
    private readonly baseurl: string
    constructor(baseUrl: string) {
        this.baseurl = baseUrl
    }

    getForecast(breakId: string): Promise<MetaForecast | undefined> {
        const url = urljoin(this.baseurl, 'forecast', breakId)
        return fetch(url).then(response => {
            return response.json()
        })
    }
}