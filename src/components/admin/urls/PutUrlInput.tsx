import React, {FormEvent, useState} from 'react'
import {BreakDetailsWebsiteUrl} from "../../../redux/breakUrls/types";
import {Button, Grid, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

type Props = {
    updating?: BreakDetailsWebsiteUrl
    onSubmit: (b: BreakDetailsWebsiteUrl) => void
}

export const PutUrlInput = (props: Props) => {
    const [breakId, setBreakId] = useState(props.updating?.breakId || '')
    const [domain, setDomain] = useState(props.updating?.domain || '')
    const [extendedForecastUrl, setExtendedForecastUrl] = useState(props.updating?.extendedForecastUrl || '')
    const [infoUrl, setInfoUrl] = useState(props.updating?.infoUrl || '')
    const [forecastsUrl, setForecastsUrl] = useState(props.updating?.forecastsUrl || '')
    const [errorStrings, setErrors] = useState([] as string[])

    const getErrors = (x: BreakDetailsWebsiteUrl): string[] => {
        return [['breakId', x.breakId], ['domain', x.domain], ['infoUrl', x.infoUrl], ['forecastsUrl', x.forecastsUrl], ['extendedForecastsUrl', x.extendedForecastUrl]]
            .filter(x => x[1].length === 0)
            .map(x => `${x[0]} cannot be empty`)
    }

    const validateAndSubmit = (e: FormEvent) => {
        e.preventDefault()

        console.log('validate and submit: ', breakId, domain, extendedForecastUrl, infoUrl)

        const x: BreakDetailsWebsiteUrl = {breakId, domain, extendedForecastUrl, infoUrl, forecastsUrl}
        const errors = getErrors(x)

        if (errors.length > 0) setErrors(errors)
        else props.onSubmit(x)
    }


    return (
        <>
        {
            errorStrings.length > 0
                ? <Grid container>
                    {errorStrings.map(s => <Grid key={s} item xs={12}><Alert severity={"error"}>{s}</Alert></Grid>)}
                </Grid>
                : null
        }
        <form onSubmit={validateAndSubmit}>
            <div>
                <TextField label={"Break Id"} value={breakId} onChange={e => setBreakId(e.target.value)} variant={"outlined"} size={"small"} />
                <TextField label={"Domain"} value={domain} onChange={e => setDomain(e.target.value)} variant={"outlined"} size={"small"} />
                <TextField label={"Info url"} value={infoUrl} onChange={e => setInfoUrl(e.target.value)} variant={"outlined"} size={"small"} />
                <TextField label={"Forecasts Url"} value={forecastsUrl} onChange={e => setForecastsUrl(e.target.value)} variant={"outlined"} size={"small"} />
                <TextField label={"Extended Forecasts Url"} value={extendedForecastUrl} onChange={e => setExtendedForecastUrl(e.target.value)} variant={"outlined"} size={"small"} />
            </div>
            <Button type={"submit"}>Submit</Button>
        </form>
            </>
    )
}