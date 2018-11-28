import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { fetchRentals, saveCurrentUser } from "./actions";
import Axios from 'axios'

import NavComp from "./NavComp";
import ScrollControl from "./ScrollControl";
import RentalsList from "./RentalsList";
import AddRental from "./AddRental";
import Payment from "./Payment";
import EditRental from "./EditRental";
import UserDashboard from "./UserComponents/UserDashboard";
import firebase from "firebase/app";
import FirebaseLogin from "./UserComponents/FirebaseLogin";
import CssBaseline from "@material-ui/core/CssBaseline";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN
} = process.env;

const config = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN
};

firebase.initializeApp(config);

const mapStateToProps = state => {
  const { user, rentals, rentalPortions, groupCounter } = state;
  return {
    user,
    rentals,
    rentalPortions,
    groupCounter
  };
};

class App extends Component {
  state = {
    isSignedIn: false,
  };

  componentDidMount() {
    this.props.fetchRentals();
    this.unlisten = this.props.history.listen((location, action) => {
      if (location.pathname === "/") this.props.fetchRentals();
    });
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
      if (user) this.props.saveCurrentUser(user.displayName);
      else this.props.saveCurrentUser(null);
      this.setState({ isSignedIn: !!user });
    });
  }

  componentWillUnmount() {
    this.unlisten();
    this.unregisterAuthObserver();
  }

  render() {
    const { rentals, rentalPortions, groupCounter } = this.props;

    return (
      <div style={{ cursor: "context-menu" }}>
        <CssBaseline />
        <NavComp
          className="sticky-top"
          user={this.state.isSignedIn}
          username={this.props.user}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => (
              <ScrollControl
                {...routerProps}
                rentals={rentals}
                rentalPortions={rentalPortions}
                groupCounter={groupCounter}
                component={<RentalsList />}
              />
            )}
          />
          <Route
            path="/add-rental"
            render={routerProps => <AddRental {...routerProps} />}
          />
          <Route
            path="/edit-rental/:id"
            render={routerProps => <EditRental {...routerProps} />}
          />
          <Route
            path="/sign-up"
            render={routerProps => <Payment {...routerProps} />}
          />
          <Route
            path="/user"
            render={routerProps => <UserDashboard {...routerProps} />}
          />
          <Route
            path="/signin"
            render={routerProps => <FirebaseLogin {...routerProps} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRentals, saveCurrentUser }
  )(App)
);
