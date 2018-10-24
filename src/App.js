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

import RentalsList from "./RentalsList";
import AddRental from './AddRental'

class App extends Component {
  render() {
    return (
      <div>
        <NavComp />
        <Switch>
          <Route exact path="/" component={RentalsList} />
          <Route path="/add-rental" component={AddRental} />
        </Switch>
      </div>
    );
  }
}

export default App;
