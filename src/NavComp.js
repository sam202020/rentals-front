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

import RentalsList from "./RentalsList";
import { connect } from 'react-redux';
import { locationChange } from './actions'

import { Link } from 'react-router-dom';

export default class NavComp extends Component {
  
  render() {
    return (
      <div className="container-fluid">
        <Navbar color="light" light expand="lg">
        <Link to='/'>
          <NavbarBrand style={{ color: "blue" }}>
            Lakewood Rentals
          </NavbarBrand></Link>

          <Nav className="ml-5 nav-fill w-100" navbar>
            <NavItem>
            <Link to='/' style={{ fontWeight: "bold", color: "blue" }}>
              
                Rentals
            </Link>
            </NavItem>
            <NavItem className="ml-5">
            <Link to='/add-rental' style={{ fontWeight: "bold", color: "blue" }}>
             
                Add a Listing
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}