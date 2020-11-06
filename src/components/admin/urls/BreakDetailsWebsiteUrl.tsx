import React from 'react'
import {BreakDetailsWebsiteUrl} from "../../../redux/breakUrls/types";
import {Grid, Typography} from "@material-ui/core";

type Props = {
    breakUrl: BreakDetailsWebsiteUrl
}

export const BreakDetailsWebsiteUrlDisplay = (props: Props) => {
    const b = props.breakUrl
    return (
        <Grid item container>
            <Grid item xs={6} md={4} lg={3}>
                <Typography>ID</Typography>
                <Typography>Domain</Typography>
                <Typography>Info Url</Typography>
                <Typography>Short term forecast url</Typography>
                <Typography>Long term forecast url</Typography>
            </Grid>

            <Grid item xs={6} md={8} lg={9}>
                <Typography>{b.breakId}</Typography>
                <Typography>{b.domain}</Typography>
                <Typography>{b.infoUrl}</Typography>
                <Typography>{b.forecastsUrl}</Typography>
                <Typography>{b.extendedForecastUrl}</Typography>
            </Grid>
        </Grid>
    )
}