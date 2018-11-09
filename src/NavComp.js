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
  state = { width: window.innerWidth }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }
  
  render() {
    console.log(this.state.width)
    return (
      <div className={this.state.width > 900 ? "sticky-top" : undefined}>
        <Navbar color="light" light expand="sm" style={{ color: "blue", padding: 0, height:50 }}>
        
          <NavbarBrand className='ml-5' style={{ color: "blue" }}>
            <h2>Lakewood Rentals</h2>
          </NavbarBrand>

          <Nav className="ml-5 nav-fill w-100" navbar style={{ color: "blue" }}>
            <NavItem>
            <Link to='/' style={{ fontWeight: "bold", color: "blue", paddingLeft:300 }}>
                <h5>Rentals</h5>
            </Link>
            </NavItem>
            <NavItem className="ml-5">
            <Link to='/add-rental' style={{ fontWeight: "bold", color: "blue", margin: 1}}>
             
                <h5>List a Property</h5>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}