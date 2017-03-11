import express from "express";
import bodyParser from "body-parser";
import {graphqlExpress} from "graphql-server-express";
import myGraphQLSchema from "./schema";

const PORT = 3030;
const app = express();

app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        return res.status(204).send('');
    }

    next();

});

// app.options("/*", function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     res.sendStatus(200);
// });

app.use('/graphql', bodyParser.json(), graphqlExpress({schema: myGraphQLSchema}));

app.listen(PORT);