import {Break} from "../redux/forecasts/types";
import urljoin from 'url-join'

class BackendClient {
    baseUrl: string
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    break(breakId: string): Promise<Break | null> {
        return fetch(urljoin([this.baseUrl, 'break', breakId]))
            .then(response => {
                console.log(response)
                return null
            })
    }
}

export default BackendClient