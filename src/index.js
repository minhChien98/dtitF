import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//store
import { createStore, applyMiddleware, compose } from 'redux';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {mySaga} from './actions/index';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

ReactDOM.render(
                <Provider store = {store}>
                    <App />
                </Provider>, 
                document.getElementById('root')
            );

sagaMiddleware.run(mySaga);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
