import React, { Component } from 'react'
import App from './App'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import rootReducer from './reducers';

function getLocation(state) {
    return state;
  }  

const mapStateToProps = state => {
    return {
        locations: getLocation(state)
     }
}

const mapDispatchToProps = (dispatch) => {
    return {
     
      
    }
  }

const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

export default AppContainer;