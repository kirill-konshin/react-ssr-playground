import "es6-promise";
import "isomorphic-fetch";

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

// import "./styles/styles.less";
import "./styles/styles.scss";

import createRouter from "./router";
import createStore from "./redux/createStore";

const rootEl = document.getElementById('app');
const store = createStore(window.__PRELOADED_STATE__);

render((<Provider store={store}>{createRouter()}</Provider>), rootEl);

if (module.hot) {
    module.hot.accept('./router', () => {
        const nextCreateRouter = require('./router').default;
        render((<Provider store={store}>{nextCreateRouter()}</Provider>), rootEl);
    });
}