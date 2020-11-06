import React, {useEffect} from 'react'
import {match, RouteChildrenProps, useParams, useRouteMatch} from "react-router";
import {Break} from "../../redux/breaks/types";
import {connect} from "react-redux";
import {RootState} from "../../redux/store";
import {fetchForecast} from "../../redux/forecasts/actions";
import {MetaForecast} from "../../redux/forecasts/types";
import {getBreakById} from "../../redux/breaks/selectors";
import {fetchBreakFromCache} from "../../redux/breaks/actions";
import {BreakInfo} from "./BreakInfo";
import {MetaForecastDisplay} from "../forecasts/MetaForecastDisplay";

type ParamsProps = {
    id: string
}

type DispatchProps = {
    getForecast: (breakId: string) => void
    getBreak: (breakId: string) => void
}

type StateProps = {
    break?: Break,
    forecast?: MetaForecast
    loading: boolean
}

type Props = ParamsProps & DispatchProps & StateProps

const BreakPage = (props: Props) => {
    const params = useParams<ParamsProps>()
    const id = params.id
    const forecast = props.forecast,
        surfBreak = props.break

    useEffect(() => {
        props.getForecast(id)
        props.getBreak(id)
    }, [id])

    console.log('render break page: ', props, params)

    return (
        <div>
            <p>hi</p>
            <p>break page: {id}</p>
            {surfBreak ? <BreakInfo break={surfBreak} /> : null}

            {props.loading ? <p>loading</p> : null}

            {forecast ? <MetaForecastDisplay metaForecast={forecast} /> : null}
        </div>
    )
}

const mapDispatch = {
    getForecast:(breakId: string) => fetchForecast(breakId),
    getBreak: (breakId: string) => fetchBreakFromCache(breakId)
}

const mapState = (state: RootState, params: RouteChildrenProps<ParamsProps>) => {
    console.log('map state = ', state, params)
    const id = params.match?.params.id;
    if (id === undefined) {
        throw Error('404?')
    }
    return {
        break: getBreakById(state.breaks, id),
        forecast: state.forecasts.forecasts[id],
        loading: state.forecasts.loading
    }
}

export default connect(mapState, mapDispatch)(BreakPage)



