import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";

export const reducer = (state = {reduxStatus: 'init'}, action) => {
    switch (action.type) {
        case 'TICK':
            return {reduxStatus: action.payload};
        default:
            return state
    }
};

export const makeStore = (initialState) => {
    return createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
};

