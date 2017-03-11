import path from "path";
import express from "express";
import striptags from "striptags";
import {createExpressMiddleware, skipRequireExtensions} from "react-router-redux-middleware";
import createRouter from "./src/router";
import createStore from "./src/redux";

const PORT = 3000;
const app = express();
const outputPath = path.join(process.cwd(), 'build');

skipRequireExtensions();

app.use(createExpressMiddleware({
    createRouter: (history) => (createRouter(history)),
    createStore: ({req, res}) => (createStore({
        foo: req.url + ':' + Date.now()
    })),
    initialStateKey: '__PRELOADED_STATE__',
    template: ({template, html, req}) => {

        template = template.replace(
            `<div id="root"></div>`,
            `<div id="root">${html}</div>`
        );

        const match = /<h1[^>]*>(.*?)<\/h1>/gi.exec(html);

        if (match) {
            const title = match[1];
            template = template.replace(
                /<title>.*?<\/title>/g,
                '<title>' + striptags(match[1]) + '</title>'
            );
        }

        return template;

    },
    templatePath: path.join(outputPath, 'index.html'),
    outputPath: outputPath,
    debug: true
}));

app.use(express.static(outputPath));

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log('Listening %s', PORT);
});