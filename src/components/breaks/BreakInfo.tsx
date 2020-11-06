import React from 'react'
import {Break} from "../../redux/breaks/types";

type Props = {
    break: Break
}

export const BreakInfo = (props: Props) => {
    return (
        <div>
            <p>name: {props.break.name}</p>
            <p>id: {props.break.id} </p>
            <p>slug: {props.break.slug}</p>
            <p>region: {props.break.region}</p>
            <p>country: {props.break.country}</p>
            <p>lngLat: {props.break.lngLat}</p>
            <p>style: {props.break.style}</p>
            <p>bestSwell: {props.break.bestSwell}</p>
            <p>bestWind: {props.break.bestWind}</p>
        </div>
    )
}