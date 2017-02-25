import fs from "fs";
import path from "path";
import Express from "express";
import React from "react";
import {Provider} from "react-redux";
import {renderToString} from "react-dom/server";
import {match, RouterContext, createMemoryHistory} from "react-router";
import webpack from "webpack";
import Server from "webpack-dev-server";
import createRoutes from "./src/router";
import createStore from "./src/redux/createStore";
import config from "./webpack.config";

[
    '.css',
    '.less',
    '.sass',
    '.ttf',
    '.woff',
    '.woff2',
    '.svg',
    '.eot',
    '.gif',
    '.jpg',
    '.jpeg',
    '.png'
].forEach(function(ext) {
    require.extensions[ext] = function() {};
});

const port = process.env.PORT || 3000;

function isDevServer() {
    return process.env.NODE_ENV !== 'production';
}

if (isDevServer()) {

    const MemoryFileSystem = require('memory-fs');
    const compiler = webpack(config);

    compiler.outputFileSystem = new MemoryFileSystem();

    config.devServer.serverSideRender = true;
    config.devServer.index = 'nonexistent.html';
    config.devServer.historyApiFallback = false;
    config.devServer.contentBase = './src';
    config.devServer.setup = function(app) {
        app.use(handleRender({fs: compiler.outputFileSystem}));
    };

    new Server(compiler, config.devServer).listen(port, '0.0.0.0', listen);

} else {

    const app = Express();

    app.use(handleRender({fs}));
    app.use(Express.static(config.output.path));

    app.listen(port, listen);

}

function listen(err) {

    if (err) throw err;
    console.log('Listening %s', port);

}

function sendError(res, code, e) {
    res.status(code).send(`<h1>${code} Error</h1><pre>${e.stack || e.message || e}</pre>`);
}

function handleRender(options) {

    const history = createMemoryHistory();
    const routes = createRoutes(history);

    return function(req, res, next) {

        const store = createStore({
            foo: Date.now() // pre-populate something right here
        });

        const location = history.createLocation(req.url);

        if (options.fs.existsSync(path.join(config.output.path, location.pathname)) &&
            location.pathname !== '/' &&
            location.pathname !== '/index.html'
        ) {
            console.log('Static', location.pathname);
            return next();
        }

        match({routes, location}, (error, redirectLocation, renderProps) => {

            console.log('Rendering', location.pathname + location.search);

            if (redirectLocation) {
                return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
            }

            if (error) {
                return sendError(res, 502, error);
            }

            if (renderProps === null) {
                return sendError(res, 404, renderFullPage('', store.getState(), options));
            }

            (new Promise((resolve) => {

                const {location, params} = renderProps;

                const Cmp = renderProps.components[renderProps.components.length - 1].WrappedComponent;

                if (!Cmp || !Cmp.getInitialProps) {
                    return resolve([Cmp]);
                }

                resolve(Promise.all([Cmp, Cmp.getInitialProps({location, params, store, history})]));

            })).then(([Cmp, fetchedData]) => {

                // console.log('Fetched data', fetchedData);
                // console.log('Store state before rendering', store.getState());

                const html = renderToString(<Provider store={store}><RouterContext {...renderProps}/></Provider>);

                res.status(Cmp && !Cmp.notFound ? 200 : 404);
                res.send(renderFullPage(html, store.getState(), options));

            }).catch(sendError.bind(null, res, 500));

        });

    };

}

function renderFullPage(html, preloadedState, options) {

    const template = path.join(config.output.path, 'index.html');

    //TODO Better handler
    if (!options.fs.existsSync(template)) throw new Error('Index does not exist yet, please wait for the build to finish.');

    return options.fs
        .readFileSync(template)
        .toString()
        .replace(
            `<div id="app"></div>`,
            `<div id="app">${html}</div>`
        )
        .replace(
            'window.__PRELOADED_STATE__ = undefined;',
            'window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState) + ';'
        );

}
