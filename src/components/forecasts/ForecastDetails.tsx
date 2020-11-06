import React from 'react'
import {BreakDetails} from "../../redux/forecasts/types";
import {createStyles, Grid, GridList, GridListTile, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            // backgroundColor: theme.palette.background.paper,
        },
        gridList: {
            flexWrap: 'nowrap',
            // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
            transform: 'translateZ(0)',
        },
    }),
);


type Props = {
    details: BreakDetails[]
}

export const ForecastDetails = (props: Props) => {
    const classes = useStyles()
    return (
        <Grid item container xs={12} className={classes.root}>
            <Grid item xs={1}>
                <Typography>time</Typography>
                <Typography>score</Typography>
                <Typography>swell height</Typography>
                <Typography>swell direction</Typography>
                <Typography>swell period</Typography>
                <Typography>wind kph</Typography>
                <Typography>wind direction</Typography>
                <Typography>wind state</Typography>
                <Typography>hightide</Typography>
                <Typography>lowtide</Typography>
            </Grid>
            <Grid item xs={11}>
                <GridList cols={8} className={classes.gridList}>
                    {props.details.map(x => (
                        <GridListTile key={x.dateTime}>
                            <Typography>{x.dateTime}</Typography>
                            <Typography>{x.score}</Typography>
                            <Typography>{x.waveDetails.swellHeightM}</Typography>
                            <Typography>{x.waveDetails.swellDirection}</Typography>
                            <Typography>{x.waveDetails.period}</Typography>
                            <Typography>{x.windDetails.windkph || 'null'}</Typography>
                            <Typography>{x.windDetails.windDirection}</Typography>
                            <Typography>{x.windDetails.windState}</Typography>
                            <Typography>{x.highTide}</Typography>
                            <Typography>{x.lowTide}</Typography>
                        </GridListTile>
                    ))}
                </GridList>
            </Grid>
        </Grid>
    )
}