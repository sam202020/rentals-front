import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Button,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  NavLink
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import SignOut from "./UserComponents/SignOut";

export default class NavComp extends Component {
  state = { width: window.innerWidth, collapsed: true };

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    if (this.state.width >= 1150) {
      return (
        <div
          className={this.state.width > 900 ? "sticky-top" : undefined}
          style={{ borderBottom: "1px solid gainsboro" }}
        >
          <Navbar
            color="light"
            light
            expand="xs"
            style={{ color: "blue", padding: 0, height: 50 }}
          >
            <span className="navbar-brand ml-5">
              <Link
                to="/"
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <FontAwesomeIcon icon={faHome} className="mt-2 mr-2" />
                <h2>Lakewood Rentals</h2>{" "}
              </Link>
            </span>

            <Nav
              className="ml-5 nav-fill w-100"
              navbar
              style={{ color: "blue" }}
            >
              <NavItem>
                <Link
                  to="/"
                  style={{
                    fontWeight: "bold",
                    color: "blue",
                    paddingLeft: 250
                  }}
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
              {this.props.user && (
                <>
                  <NavItem className="ml-5">
                    <Link
                      to="/user"
                      style={{ fontWeight: "bold", color: "blue", margin: 1 }}
                    >
                      <h5>My Account</h5>
                    </Link>
                  </NavItem>
                  <SignOut />
                </>
              )}
              {!this.props.user && (
                <NavItem className="ml-5">
                  <Link
                    to="/signin"
                    style={{ fontWeight: "bold", color: "white", margin: 1 }}
                  >
                    <Button color="primary" className="mt-3">
                      Sign In / Register
                    </Button>
                  </Link>
                </NavItem>
              )}
            </Nav>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div style={{ borderBottom: "1px solid gainsboro" }}>
          <Navbar color="faded" light>
            <span className="navbar-brand">
              {" "}
              <Link
                to="/"
                style={{
                  fontWeight: "bold",
                  color: "blue",
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <FontAwesomeIcon icon={faHome} className="mt-2 mr-2" />
                <h2>Lakewood Rentals</h2>{" "}
              </Link>
            </span>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink href="/add-rental">
                    <Button color="primary">
                      <h5>List a Property for Rent</h5>
                    </Button>
                  </NavLink>
                </NavItem>
                {this.props.user && (
                  <NavItem className="mt-2">
                    <NavLink href="/user">
                      <Button color="secondary">
                        <h6>My Account</h6>
                      </Button>
                    </NavLink>
                  </NavItem>
                )}
                {!this.props.user ? (
                  <NavItem>
                    <NavLink href="/signin">
                      <Button color="secondary">
                        <h6>Sign In / Register</h6>
                      </Button>
                    </NavLink>
                  </NavItem>
                ) : (
                  <SignOut />
                )}
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
}
