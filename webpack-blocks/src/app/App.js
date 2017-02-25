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
    static async getInitialProps({location, params, history, store}) {
        return await store.dispatch(barAction());
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