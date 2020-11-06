import React from 'react'
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Home from "./components/pages/Home";
import BreakPage from "./components/breaks/BreakPage";
import {AdminHome} from "./components/admin/Home";

type Props = {
}

export const MetaSurfRouter = (props: Props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/breaks/:id"} component={BreakPage} />
                <Route path={"/admin"} component={AdminHome} />
                <Route path={"/"} children={<Home />} />
            </Switch>
        </BrowserRouter>
    )
}

