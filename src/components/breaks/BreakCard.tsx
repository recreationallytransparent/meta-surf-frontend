import React from 'react'
import {Break as BreakType} from "../../redux/breaks/types";
import {Paper} from "@material-ui/core";
import {Link} from "react-router-dom";

export const BreakCard = (props: {break: BreakType}) => {
    return (
        <Paper>
            <Link to={"/breaks/" + props.break.id}>{props.break.name}</Link>
            <p>{props.break.region}, {props.break.country}</p>
        </Paper>
    )
}