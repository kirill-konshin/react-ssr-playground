import React, {Component} from "react";
import {connect} from "react-redux";
import {barAction} from "../redux/actions";
import Helmet from "./Helmet";

@connect(state => state, {barAction})
export default class App extends Component {

    /**
     * This function is used for server-side rendering
     * @param location
     * @param params
     * @param history
     * @param store
     * @return {Promise}
     */
    static getInitialProps({location, params, history, store}) {
        const action = store.dispatch(barAction());
        return action.payload;
    };

    render() {
        const {foo, bar} = this.props;
        return (
            <div className="container">
                <Helmet title='Index'/>
                <h1>Foo {foo}, Bar {bar}</h1>
            </div>
        );
    }

}