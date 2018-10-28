import React, { Component } from "react";

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

import RentalsList from "./RentalsList";
import AddRental from "./AddRental";

class App extends Component {
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
    return (
      <div>
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

export default App;
