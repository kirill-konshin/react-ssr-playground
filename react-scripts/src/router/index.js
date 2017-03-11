import React from "react";
import {Router, Route} from "react-router";
import NotFound from '../components/NotFound';
import App from '../components/App';

export default function(history) {

    return <Router history={history}>
        <Route path='/' component={App}/>
        <Route path='*' component={NotFound}/>
    </Router>;

}