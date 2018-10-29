import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router} from 'react-router-dom';
import { Provider } from 'react-redux' 
import { createStore, applyMiddleware  } from 'redux'
import rootReducer from './reducers';
import logger from 'redux-logger';
import AppContainer from './AppContainer';
import history from "./history";

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

ReactDOM.render(<Provider store={store}><Router history={history}><AppContainer /></Router></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
