import React from "react";
import {Router, Route} from "react-router";
import NotFound from '../app/NotFound';

function def(promise) {
    return promise.then(cmp => cmp.default);
}

export default function(history) {

    return <Router history={history}>
        <Route path='/' getComponent={() => def(import('../app/App'))}/>
        <Route path='*' component={NotFound}/>
    </Router>;

}