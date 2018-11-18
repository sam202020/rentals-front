import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default class NavComp extends Component {
  state = { width: window.innerWidth };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    return (
      <div className={this.state.width > 900 ? "sticky-top" : undefined} style={{borderBottom: '.5px solid gray'}}>
        <Navbar
          color="light"
          light
          expand="sm"
          style={{ color: "blue", padding: 0, height: 50 }}
        >
          <span className="navbar-brand ml-5">
          
            <Link to="/" style={{ fontWeight: "bold", color: "blue",display:'flex', flexDirection:'row' }}>
            <FontAwesomeIcon icon={faHome} className='mt-2 mr-2'/>
              <h2>Lakewood Rentals</h2>{" "}
              
            </Link>
          </span>

          <Nav className="ml-5 nav-fill w-100" navbar style={{ color: "blue" }}>
            <NavItem>
              <Link
                to="/"
                style={{ fontWeight: "bold", color: "blue", paddingLeft: 250 }}
              >
                <h5>Find a Rental</h5>
              </Link>
            </NavItem>
            <NavItem className="ml-5">
              <Link
                to="/add-rental"
                style={{ fontWeight: "bold", color: "blue", margin: 1 }}
              >
                <h5>List a Property</h5>
              </Link>
            </NavItem>
            <NavItem className="ml-5">
              <Link
                to="/user"
                style={{ fontWeight: "bold", color: "blue", margin: 1 }}
              >
                <h5>My Account</h5>
              </Link>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
