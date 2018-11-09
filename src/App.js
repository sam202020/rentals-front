import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import NavComp from "./NavComp";
import { Switch, Route, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { fetchRentals } from "./actions";

import ScrollControl from "./ScrollControl";
import RentalsList from "./RentalsList";
import AddRental from "./AddRental";
import { withRouter } from "react-router";

class App extends Component {
  state = {
    rentals: []
  };
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.fetchRentals();
  }

  handleFetchRentals = () => {
    Axios.get("http://localhost:3001/rentals")
      .then(response => {
        this.setState({ rentals: response.data, loading: false });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { match, location, history } = this.props;
    const { rentals, rentalPortions, groupCounter } = this.props;
    return (
      <div style={{cursor: 'context-menu'}}>
        <NavComp className='sticky-top'/>
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
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rentals: state.rentals,
    rentalPortions: state.rentalPortions,
    fetchingRentals: state.fetchingRentals,
    fetchedRentals: state.fetchedRentals,
    addingRental: state.addingRental,
    addedRental: state.addedRental,
    groupCounter: state.groupCounter
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRentals }
  )(App)
);
