import React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {Provider} from "react-redux";
import "isomorphic-fetch";
import "es6-promise/auto";
import "./index.sass";

import createRouter from "./router";
import createStore from "./redux";

const mountNode = document.getElementById('app');
const store = createStore(window.__PRELOADED_STATE__);

const Root = () => (
    <Provider store={store}>
        {createRouter(browserHistory)}
    </Provider>
);

render((<Root/>), mountNode);

