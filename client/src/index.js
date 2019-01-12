// Primary location to render the root component and the `redux` side of the application

import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

/**
 * The first argument to createStore() is all of the different reducers being used in the application
 * 
 * The second argument is the initial state of the application
 */
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// The provider tag is a react component that knows how to read changes from a redux store. Whenever the redux store changes, the provider will inform all its children components

/**
 * ReactDOM.render(foo, bar) takes two parameters
 * 
 * The first is the root component 
 * The second is where to render inside the DOM
 * 
 * select the root of the index.html
 */
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root'));