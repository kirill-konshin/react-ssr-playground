import path from "path";
import Express from "express";
import webpack from "webpack";
import Server from "webpack-dev-server";
import createRouter from "./src/router";
import createStore from "./src/redux/createStore";
import config from "./webpack.config";
import {createExpressMiddleware, createWebpackMiddleware, skipRequireExtensions} from "react-router-redux-middleware";

skipRequireExtensions();

const port = process.env.PORT || 3000;

function isDevServer() {
    return process.env.NODE_ENV !== 'production';
}

const options = {
    createRouter: createRouter,
    createStore: createStore,
    initialState: {
        foo: Date.now() // pre-populate something right here
    },
    initialStateKey: '__PRELOADED_STATE__',
    mountNode: '<div id="app"></div>',
    mountNodeTemplate: (html) => `<div id="app">${html}</div>`,
    templatePath: path.join(config.output.path, 'index.html'),
    outputPath: config.output.path,
    debug: true
};

if (isDevServer()) {

    const compiler = webpack(config);
    const middleware = createWebpackMiddleware(compiler, config);

    config.devServer.setup = function(app) {
        app.use(middleware(options));
    };

    new Server(compiler, config.devServer).listen(port, '0.0.0.0', listen);

} else {

    const app = Express();

    app.use(createExpressMiddleware(options));
    app.use(Express.static(config.output.path));

    app.listen(port, listen);

}

function listen(err) {
    if (err) throw err;
    console.log('Listening %s', port);
}

