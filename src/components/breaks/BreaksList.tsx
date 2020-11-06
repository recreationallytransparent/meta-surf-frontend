import React, {useState} from 'react'
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {Break, Break as BreakType} from "../../redux/breaks/types";
import {createStyles, Grid, makeStyles, TextField, Theme} from "@material-ui/core";
import {BreakCard} from "./BreakCard";
import {selectBreak} from "../../redux/breaks/actions";
import {Autocomplete} from "@material-ui/lab";
import {useLocation} from "react-router";


type StateProps = {
    breaks: BreakType[],
    loading: boolean
}

type DispatchProps = {
    selectBreak: (b: BreakType) => void
}

type PassedProps = {}

type Props = StateProps & DispatchProps & PassedProps

function renderBreak(b: Break) {
    return (
        <Grid key={b.id} item sm={4} xs={12}>
            <BreakCard break={b}/>
        </Grid>
    )
}

const breakMatches = (q: string) => (b: BreakType): boolean => {
    return b.name.indexOf(q) >= 0 || b.country.indexOf(q) >= 0 || b.region.indexOf(q) >= 0
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    searchWrapper: {
        width: 300
    }
}))

const BreaksList = (props: Props) => {
    const location = useLocation()
    const classes = useStyles()
    const [refineString, setRefineString] = useState(new URLSearchParams(location.search).get('break') || '')

    if (props.loading) return <p>loading</p>

    const availableBreaks = props.breaks.filter(breakMatches(refineString))
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>

                <Grid container justify={"center"}>
                    <Grid item className={classes.searchWrapper}>
                        <Autocomplete options={availableBreaks}
                                      getOptionLabel={(b: BreakType) => b.name}
                                      onInputChange={(e, v: string) => setRefineString(v)}
                                      renderInput={(params) => <TextField {...params} label={'Search'}/>}

                        />
                    </Grid>
                </Grid>
            </Grid>
            {availableBreaks.map(renderBreak)}
        </Grid>
    )
}


const mapState = (rootState: RootState, passedProps: PassedProps): StateProps & PassedProps => {
    return {
        ...passedProps,
        breaks: rootState.breaks.breaks,
        loading: rootState.breaks.loading
    }
}

const mapDispatch = {
    selectBreak
}

export default connect(mapState, mapDispatch)(BreaksList)
