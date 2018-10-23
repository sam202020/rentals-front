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

import RentalsList from './rentalslist'

class App extends Component {
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
                  <NavLink href="/components/" style={{fontWeight:'bold', color:'blue'}}>Rentals</NavLink>
                </NavItem>
                <NavItem className="ml-5">
                  <NavLink href="https://github.com/reactstrap/reactstrap" style={{fontWeight:'bold', color:'blue'}}>
                    For Sale
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle className="ml-5" nav caret style={{fontWeight:'bold', color:'blue'}}>
                    Add a Listing
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Rental</DropdownItem>
                    <DropdownItem>For Sale</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            
          </Navbar>

          <RentalsList />
          </div>
    );
  }
}

export default App;
