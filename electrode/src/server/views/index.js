import ReduxRouterEngine from "electrode-redux-router-engine";
import {routes} from "../../client/routes";
import {createStore} from "redux";
import rootReducer from "../../client/redux/reducer";

import "isomorphic-fetch";
import "bluebird";

function createReduxStore(req, {renderProps: {location, params}}) { // eslint-disable-line

  // console.log(req.url, location, params);

  return fetch('https://platform.ringcentral.com/restapi/v1.0').then(res => res.json()).then((json) => {

    const initialState = {
      checkBox: false,
      number: 999,
      page: (location.pathname === '/foo' ? 'FOO' : 'INDEX') + ':' + json.versionString
    };

    return createStore(rootReducer, initialState);

  });

}

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }
  return app.routesEngine.render(req);
};
