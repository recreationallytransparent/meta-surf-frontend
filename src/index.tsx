import * as React from "react";
import * as ReactDOM from "react-dom";
import store from "./redux/store";
import { Provider } from "react-redux";

const Test = () => {

}


ReactDOM.render(
    <Provider store={store}>
    </Provider>,
    document.getElementById("root")
);