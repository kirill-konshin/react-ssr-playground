import React from "react";
import {render} from "react-dom";
import {browserHistory as history, Router, Route} from "react-router";
import {ApolloProvider, ApolloClient, createNetworkInterface} from "react-apollo";
import App from "./components/App";
import GraphiQL from "./components/GraphiQL";
import "isomorphic-fetch";
import "./index.css";

const mountNode = document.getElementById('root');
const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://localhost:3030/graphql'
    }),
});

const Root = () => (
    <ApolloProvider client={client}>
        <Router history={history}>
            <Route path='/' component={App}/>
            <Route path='/graphiql' component={GraphiQL}/>
        </Router>
    </ApolloProvider>
);

render((<Root/>), mountNode);

if (module.hot) module.hot.accept();

