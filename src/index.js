import React from "react";
import ReactDOM from 'react-dom'
import {render} from "react-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";
import store from "./configureStore";

import App from "./components/App";
import reducers from "./reducers";



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.querySelector('#root')
);