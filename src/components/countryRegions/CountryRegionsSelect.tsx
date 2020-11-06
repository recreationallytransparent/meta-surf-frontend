import React from 'react'
import {Country, CountryRegions, Region} from "../../redux/countryRegions/types";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {getSelectableRegions} from "../../redux/countryRegions/reducers";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {fetchCountryRegions, selectCountry, selectRegion} from "../../redux/countryRegions/actions";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField/TextField";
import {useHistory, useLocation} from "react-router";

type StateProps = {
    countryRegions: Record<string, CountryRegions>
    selectableRegions: Region[]
    selectedCountry: Country | undefined
    selectedRegion: Region | undefined
}

type DispatchProps = {
    selectCountry: (country: Country) => void,
    selectRegion: (region: Region) => void,
    fetchCountryRegions: () => void
}

type PassedProps = {

}

type Props = PassedProps & DispatchProps & StateProps


const mapState = (state: RootState): StateProps => {
    return {
        countryRegions: state.countryRegions.countryRegionMap,
        selectableRegions: getSelectableRegions(state.countryRegions),
        selectedCountry: state.countryRegions.selectedCountry,
        selectedRegion: state.countryRegions.selectedRegion
    }
}

const mapDispatch = {
    selectCountry,
    selectRegion,
    fetchCountryRegions
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        }
    })
)

type UrlParams = {
    country?: string,
    region?: string
}

const CountryRegionsSelect = (props: Props) => {
    if (Object.keys(props.countryRegions).length === 0) {
        props.fetchCountryRegions()
    }

    const history = useHistory()
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const params: UrlParams = {
        country: searchParams.get('country') || undefined,
        region: searchParams.get('region') || undefined
    }

    console.log('country regions select params: ', params)
    const paramsCountry = params.country
        ? Object.values(props.countryRegions).find(x => x.country.name === params.country)?.country
        : undefined

    const paramsRegion = params.region
        ? props.selectableRegions.find(r => r.name === params.region)
        : undefined

    if (paramsCountry && paramsCountry.id !== props.selectedCountry?.id) props.selectCountry(paramsCountry)
    if (paramsRegion && paramsRegion.id !== props.selectedRegion?.id) props.selectRegion(paramsRegion)

    const countryOptions = Object.values(props.countryRegions).map(c => c.country)

    const handleCountrySelect = (e: React.ChangeEvent<{}>, newValue: string | null) => {
        if (!newValue) return

        const country = Object.values(props.countryRegions).find(c => c.country.name === newValue)
        if (country) {
            props.selectCountry(country.country)
            history.push({
                pathname: location.pathname,
                search: '?country=' + country.country.name
            })
        }
    }

    const handleRegionSelect = (e: React.ChangeEvent<{}>, region: string| null) => {
        const selectedRegion = region && props.selectedCountry
            ? props.selectableRegions.find(r => r.name === region)
            : undefined

        if (selectedRegion && props.selectedCountry) {
            props.selectRegion(selectedRegion)
            history.push({
                pathname: location.pathname,
                search: '?country=' + props.selectedCountry.name + '&region=' + selectedRegion.name
            })
        }
    }

    const classes = useStyles()
    return (
        <>
            <FormControl className={classes.formControl}>
                <Autocomplete id={"select-country"}
                              value={paramsCountry?.name || ''}
                              onChange={handleCountrySelect}
                              openOnFocus
                              options={countryOptions.map(c => c.name)}
                              renderInput={params =>
                                  <TextField {...params} label="Country" margin="normal" />
                              }/>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Autocomplete id={"select-region"}
                              value={paramsRegion?.name || ''}
                              onChange={handleRegionSelect}
                              openOnFocus
                              options={props.selectableRegions.map(r => r.name)}
                              renderInput={params =>
                                  <TextField {...params} label="Region" margin="normal" />
                              } />
            </FormControl>
        </>
    )
}

export default connect(mapState, mapDispatch)(React.memo(React.memo(CountryRegionsSelect)))