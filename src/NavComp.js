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
  DropdownItem, Container
} from "reactstrap";

import RentalsList from './RentalsList'

export default class NavComp extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
        <div className="container-fluid">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" style={{color:'blue'}}>Lakewood Rentals</NavbarBrand>
          
          
            <Nav className="ml-5 nav-fill w-100" navbar>
              <NavItem>
                <NavLink href="/" style={{fontWeight:'bold', color:'blue'}}>Rentals</NavLink>
              </NavItem>
              <NavItem className="ml-5">
                <NavLink href="/add-rental" style={{fontWeight:'bold', color:'blue'}}>
                  Add a Listing
                </NavLink>
              </NavItem>
            </Nav>
          
        </Navbar>

        
        </div>
    )
  }
}
