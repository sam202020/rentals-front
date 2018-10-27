import React, { Component } from "react";
import logo from "./logo.svg";
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
import Axios from 'axios'

import RentalsList from "./RentalsList";
import AddRental from './AddRental'

class App extends Component {

  handleFetchRentals = () => {
    Axios
      .get('http://localhost:3001')
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error(err)
      })
  }

  handleSubmitRental = (type, location, bedrooms, baths, wePay, phone, comments, imageURL, price, email) => {
    
    Axios
      .post('http://localhost:3001', { type, location, bedrooms, baths, wePay, phone, comments, imageURL, price, email })
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <NavComp />
        <Switch>
          <Route exact path="/" component={RentalsList} fetchRentals={this.handleFetchRentals}/>
          <Route path="/add-rental" render={(routerProps) => (
    <AddRental {...routerProps} addRental={this.handleSubmitRental} />
  )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
