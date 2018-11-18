import "bootstrap/dist/css/bootstrap.css";
import "react-virtualized/styles.css"; // only needs to be imported once
import './index.css'

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import { Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rentalsReducer from "./reducers";

import App from "./App";
import history from "./history";

const store = createStore(rentalsReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
