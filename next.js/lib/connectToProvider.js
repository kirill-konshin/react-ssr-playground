import React from "react";
import {connect, Provider} from "react-redux";

let memoizedStore;

const initStore = (makeStore, initialState, isServer) => {

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

export default (createStore, ...args) => {

    return (Cmp) => {

        const getInitialProps = Cmp.getInitialProps;

        // this better be done here in order not to screw up everything because of wrong order
        // component has to be first connected then wrapped with this function, otherwise there will be no Provider
        const ConnectedCmp = connect(...args)(Cmp);

        const WrappedCmp = ({initialState, isServer, store, ...props}) => {

            if (!store || !store.dispatch) {
                store = initStore(createStore, initialState, isServer);
                console.log('4. WrappedCmp.render created new store with initial state', initialState);
            } else {
                console.log('4. WrappedCmp.render picked up existing store');
            }

            return (
                <Provider store={store}>
                    <ConnectedCmp {...props}/>
                </Provider>
            );

        };

        /**
         * @param dialog
         * @return {{store, isServer: boolean, initialState}}
         */
        WrappedCmp.getInitialProps = async (dialog) => {

            const isServer = !!dialog.req;
            const store = initStore(createStore, null, isServer);

            console.log('1. WrappedCmp.getInitialProps wrapper creates the store');

            await getInitialProps.call(Cmp, {...dialog, isServer, store});

            console.log('3. WrappedCmp.getInitialProps has store state', store.getState());

            return {
                store,
                isServer,
                initialState: store.getState()
            };

        };

        return WrappedCmp;

    };

};
