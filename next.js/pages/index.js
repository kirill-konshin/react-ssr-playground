import React from "react";
import Link from "next/link";
import withRedux from "next-redux-wrapper";
import {makeStore} from "../lib/store";
import Layout from "../components/Layout";

class Page extends React.Component {

    static getInitialProps({store, isServer, pathname, query}) {

        // console.log('2. Page.getInitialProps uses the store to dispatch things, pathname', pathname, 'query', query);

        // If it's a server, then all async actions must be done before return or return a promise
        if (isServer) {

            return new Promise((res) => {
                setTimeout(() => {
                    store.dispatch({type: 'TICK', payload: 'server'});
                    res({custom: 'custom from server'});
                }, 200);
            });

        }

        // If it's a client, then it does not matter because client can be progressively rendered
        store.dispatch({type: 'TICK', payload: 'client'});

        return {custom: 'custom'};

    }

    render() {
        // console.log('5. Page.render');
        return (
            <Layout title="Index">
                <h2>Index</h2>
                <div>Redux status: {this.props.reduxStatus}</div>
                <div>Custom: {this.props.custom}</div>
                <Link href="/other"><a>Navigate</a></Link>
            </Layout>

        )
    }

}

Page = withRedux(makeStore, state => state)(Page);

export default Page;