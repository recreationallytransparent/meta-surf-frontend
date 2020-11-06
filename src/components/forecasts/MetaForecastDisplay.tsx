import React from 'react'
import {MetaForecast} from "../../redux/forecasts/types";
import {Grid, Typography} from "@material-ui/core";
import {BreakForecastDisplay} from "./BreakForecastDisplay";

type Props = {
    metaForecast: MetaForecast
}

export const MetaForecastDisplay = (props: Props) => {
    const x = props.metaForecast
    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant={"h6"}>Forecasts</Typography>
            </Grid>
            {x.forecasts.map(z => <BreakForecastDisplay key={z[0]} forecast={z} />)}
        </Grid>
    )
}