import React from "react";
import {render} from "react-dom";
import {browserHistory, Router} from "react-router";
import {createStore} from "redux";
import {Provider} from "react-redux";

import rootReducer from "./redux/reducer";
import {routes} from "./routes";

window.webappStart = () => {

  const initialState = window.__PRELOADED_STATE__;
  const store = createStore(rootReducer, initialState);

  render(
    <Provider store={store}>
      <Router history={browserHistory}>{routes}</Router>
    </Provider>,
    document.querySelector(".js-content")
  );

};
