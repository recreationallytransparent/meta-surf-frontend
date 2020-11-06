import React from 'react'
import SearchUrls from "./urls/SearchUrls";
import {Grid} from "@material-ui/core";

type Props = {}
export const AdminHome = (props: Props) => {
    return (
        <Grid container>
            <h1>admin home</h1>
            <Grid xs={12} item container justify={"center"} >
                <SearchUrls />
            </Grid>
        </Grid>

    )
}