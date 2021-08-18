import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from "./Redux/ReduxStore";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//Connecting store via react-redux and BrowserRouter
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);