import React, {useState} from 'react'
import {BreakDetailsWebsiteUrl} from "../../../redux/breakUrls/types";
import {connect} from "react-redux";
import {RootState} from "../../../redux/store";
import {doSearch} from "../../../redux/search/actions";
import {useHistory, useLocation} from "react-router";
import {Grid, TextField, Typography} from "@material-ui/core";
import {Break as BreakType} from "../../../redux/breaks/types";
import {Autocomplete} from "@material-ui/lab";
import SearchInput from "../../form/SearchInput";
import _ from 'lodash'
import {putBreakUrl, searchBreakUrls, searchingBreakUrls} from "../../../redux/breakUrls/actions";
import {BreakDetailsWebsiteUrlDisplay} from "./BreakDetailsWebsiteUrl";
import {PutUrlInput} from "./PutUrlInput";

type StateProps = {
    termResults: Record<string, BreakDetailsWebsiteUrl[]>
    putUrlResult?: BreakDetailsWebsiteUrl
}

type DispatchProps = {
    search: (term: string) => void
    putUrl: (x: BreakDetailsWebsiteUrl) => void
}

type Props = StateProps & DispatchProps

const SearchUrls = (props: Props) => {
    const location = useLocation()
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState(new URLSearchParams(location.search).get('q') || '')
    const [refineString, setRefineString] = useState(new URLSearchParams(location.search).get('r') || '')

    React.useEffect(() => {props.search(searchTerm)}, [searchTerm, props.search, props.putUrlResult])

    const onTermChange = (s: string) => {
        setSearchTerm(s)
        history.push({
            pathname: location.pathname,
            search: '?q=' + s
        })
    }

    const results = props.termResults[searchTerm] || []
    const refinedResults = refineString.length > 0
        ? results.filter(x => x.breakId.indexOf(refineString) >= 0 || x.domain.indexOf(refineString) >= 0)
        : results

    console.log('results: ', results)
    return (
        <Grid container>
            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography>Search for urls</Typography>
                </Grid>
                <SearchInput handleChange={onTermChange} value={searchTerm}/>
            </Grid>

            <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography>Add +</Typography>
                </Grid>
                <Grid item xs={12}>
                    <PutUrlInput onSubmit={props.putUrl}/>
                </Grid>
            </Grid>

            {results.length > 0 ? <Grid item container xs={12}>
                <Grid item xs={12}>
                    <Typography>Search for urls</Typography>
                </Grid>
                <Autocomplete options={results}
                              getOptionLabel={(u: BreakDetailsWebsiteUrl) => u.breakId + ' - ' + u.domain}
                              onInputChange={(e, v: string) => setRefineString(v)}
                              renderInput={(params) => <TextField {...params} label={'Refine'}/>}

                />
                <Grid container item xs={12}>
                    {refinedResults.map(x => (
                        <Grid item xs={12} md={6} lg={4}  key={x.breakId + x.domain}>
                            <BreakDetailsWebsiteUrlDisplay breakUrl={x} />
                        </Grid>
                    ))}
                </Grid>
            </Grid> : null}
        </Grid>
    )
}

const mapState = (root: RootState): StateProps => {
    return {
        termResults: root.breakUrls.termResults,
        putUrlResult: root.breakUrls.putUrlResult
    }
}

const mapDispatch = {
    search: searchBreakUrls,
    putUrl: putBreakUrl
}

export default connect(mapState, mapDispatch)(SearchUrls)

