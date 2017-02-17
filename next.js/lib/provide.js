import React from "react";
import {connect, Provider} from "react-redux";

let memoizedStore;

const initStore = (makeStore, isServer, initialState) => {

    // Always make a new store if server
    if (isServer && typeof window === 'undefined') {
        return makeStore(initialState);
    }

    // Memoize store if client
    if (!memoizedStore) {
        memoizedStore = makeStore(initialState);
    }

    return memoizedStore

};

export default (createStore, ...connectArgs) => {

    return (Cmp) => {

        // Since provide should always be after connect we connect here
        const ConnectedCmp = connect(...connectArgs)(Cmp);

        const WrappedCmp = ({initialState, isServer, store, ...props}) => {

            if (!store || !store.dispatch) {
                store = initStore(createStore, isServer, initialState);
                //console.log('4. WrappedCmp.render created new store with initial state', initialState);
            } else {
                //console.log('4. WrappedCmp.render picked up existing store');
            }

            return (
                <Provider store={store}>
                    <ConnectedCmp {...props}/>
                </Provider>
            );

        };

        WrappedCmp.getInitialProps = async(dialog) => {

            const isServer = !!dialog.req;
            const store = initStore(createStore, isServer);

            // console.log('1. WrappedCmp.getInitialProps wrapper creates the store');

            let initialProps = {};

            if (Cmp.getInitialProps) {
                initialProps = (await Cmp.getInitialProps.call(Cmp, {...dialog, isServer, store})) || {};
            }

            // console.log('3. WrappedCmp.getInitialProps has store state', store.getState());

            return {
                store,
                isServer,
                initialState: store.getState(),
                ...initialProps
            };

        };

        return WrappedCmp;

    };

};
