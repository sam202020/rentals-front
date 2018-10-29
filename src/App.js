import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from "reactstrap";
import NavComp from "./NavComp";
import { Switch, Route, Redirect } from "react-router-dom";
import Axios from "axios";
import { connect } from "react-redux";
import { locationChange } from "./actions";

import RentalsList from "./RentalsList";
import AddRental from "./AddRental";
import { withRouter } from "react-router";

class App extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    rentals: []
  };

  componentDidMount() {
    this.handleFetchRentals();
  }

  handleFetchRentals = () => {
    Axios.get("http://localhost:3001/rentals")
      .then(response => {
        console.log(response);
        this.setState({ rentals: response.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  handleSubmitRental = (
    type,
    location,
    bedrooms,
    baths,
    wePay,
    phone,
    comments,
    imageURL,
    price,
    email
  ) => {
    Axios.post("http://localhost:3001", {
      type,
      location,
      bedrooms,
      baths,
      wePay,
      phone,
      comments,
      imageURL,
      price,
      email
    })
      .then(response => {
        console.log(response);
        return response.status;
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    const { match, location, history } = this.props;
    console.log(this.props);
    return (
      <div>
        You are now at {location.pathname}
        <NavComp />
        <Switch>
          <Route
            exact
            path="/"
            render={routerProps => (
              <RentalsList
                {...routerProps}
                fetchRentals={this.handleFetchRentals}
                rentals={this.state.rentals}
              />
            )}
          />
          <Route
            path="/add-rental"
            render={routerProps => (
              <AddRental {...routerProps} addRental={this.handleSubmitRental} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
