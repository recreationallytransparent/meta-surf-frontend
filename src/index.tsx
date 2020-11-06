import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import {Provider} from "react-redux";
import {getStore} from "./redux/store";
import BackendClient from "./client/BackendClient";

const client = new BackendClient("http://localhost:8080")
const store = getStore(client)

const Root = () => <Provider store={store}>
        <App />
</Provider>

ReactDOM.render(
    <Root />,
    document.getElementById("root")
);