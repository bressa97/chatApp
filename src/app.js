import React, { Component } from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import ChatUI from './components/ChatUi';
//import LoginUI from './components/LoginUI';
import rootReducer from './reducers';
import { fetchMessages, checkUserExists } from './actions';


const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        //thunkMiddleware,
        loggerMiddleware
    )
);

const LoginOrChat = connect(
    (state) => ({
        authorized: true
    })
)(({ authorized, dispatch }) => {
    if (authorized) {
        return (<ChatUI />);
    }else{
        dispatch(checkUserExists());
        return (<LoginUI />);
    }
});

module.exports = class App extends Component {
    render() {
        return (
            <Provider store={store}>
               <LoginOrChat />
            </Provider>
        );
    }
}
