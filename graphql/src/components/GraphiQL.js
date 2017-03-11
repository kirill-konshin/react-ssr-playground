import React from "react";
import GraphiQL from "graphiql";
import "graphiql/graphiql.css";

function graphQLFetcher(graphQLParams) {
    return fetch('http://localhost:3030/graphql', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
}

export default () => (<GraphiQL fetcher={graphQLFetcher}/>);
