import React from "react";
import {Router, Route, browserHistory} from "react-router";
import NotFound from '../app/NotFound';

function def(promise) {
    return promise.then(cmp => cmp.default);
}

export default function createRouter(h = browserHistory) {

    return <Router history={h}>
        <Route path='/' getComponent={() => def(import('../app/App'))}/>
        <Route path='*' component={NotFound}/>
    </Router>;

}