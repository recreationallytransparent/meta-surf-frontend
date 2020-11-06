import React from 'react'
import {BreakForecast, BreakForecastSource} from "../../redux/forecasts/types";
import {Grid, Typography} from "@material-ui/core";
import {ForecastDetails} from "./ForecastDetails";

type Props = {
    forecast: BreakForecastSource
}

export const BreakForecastDisplay = (props: Props) => {
    const source = props.forecast[0]
    const forecast = props.forecast[1]
    return (
        <Grid item container xs={12}>
            <Grid item xs={1}>
                <Typography variant="subtitle1">{source}</Typography>
            </Grid>
            <Grid item xs={11}>
                <ForecastDetails details={forecast.forecast} />
            </Grid>
        </Grid>
    )
}