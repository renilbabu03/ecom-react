import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import store from './redux/store'
import { persistor } from './redux/store';

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
