import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { fetchRentals } from "./actions";
import Auth from "./Auth/Auth";

import NavComp from "./NavComp";
import ScrollControl from "./ScrollControl";
import RentalsList from "./RentalsList";
import AddRental from "./AddRental";
import Payment from "./Payment";
import Register from "./UserComponents/Register";
import Callback from './Auth/Callback'

import CssBaseline from "@material-ui/core/CssBaseline";

const mapStateToProps = state => {
  const { rentals, rentalPortions, groupCounter } = state;
  return {
    rentals,
    rentalPortions,
    groupCounter
  };
};

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  componentDidMount() {
    this.props.fetchRentals();
  }

  render() {
    const { rentals, rentalPortions, groupCounter } = this.props;
    return (
      <div style={{ cursor: "context-menu" }}>
        <CssBaseline />
        <NavComp className="sticky-top" auth={auth} />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => (
              <ScrollControl
                {...routerProps}
                auth={auth}
                rentals={rentals}
                rentalPortions={rentalPortions}
                groupCounter={groupCounter}
                component={<RentalsList />}
              />
            )}
          />
          <Route
            path="/add-rental"
            render={routerProps => <AddRental auth={auth} {...routerProps} />}
          />
          <Route
            path="/sign-up"
            render={routerProps => <Payment auth={auth} {...routerProps} />}
          />
          <Route
            path="/user"
            render={routerProps => <Register auth={auth} {...routerProps} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRentals }
  )(App)
);
