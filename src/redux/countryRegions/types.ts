export interface Country {
    id: string
    name: string
}
export interface Region {
    id: string
    name: string
}
export interface CountryRegions {
    country: Country
    regions: Region[]
}
export interface CountryRegionsResponse {
    countryRegions: CountryRegions[]
}
