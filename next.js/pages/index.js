import React from "react";
import {connect} from "react-redux";
import Link from "next/link";
import {makeStore} from "../lib/store";
import provide from "../lib/provide";
import Layout from "../components/Layout";

class Page extends React.Component {

    static getInitialProps({store, isServer, pathname, query}) {

        // console.log('2. Page.getInitialProps uses the store to dispatch things, pathname', pathname, 'query', query);

        // If it's a server, then all async actions must be done before return or return a promise
        if (isServer) {

            return new Promise((res) => {
                setTimeout(() => {
                    store.dispatch({type: 'TICK', payload: 'server'});
                    res();
                }, 200);
            });

        }

        // If it's a client, then it does not matter because client can be progressively rendered
        store.dispatch({type: 'TICK', payload: 'client'});

    }

    render() {
        // console.log('5. Page.render');
        return (
            <Layout title="Index">
                <h2>Index</h2>
                <div>Redux status: {this.props.reduxStatus}</div>
                <Link href="/other"><a>Navigate</a></Link>
            </Layout>

        )
    }

}

Page = connect(state => state)(Page);
Page = provide(makeStore)(Page); // note that provide should be last

export default Page;