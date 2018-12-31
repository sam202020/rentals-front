import React, { Fragment, Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Button,
  Container,
  Collapse,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

import UserSidebar from "./UserSidebar.js";
import Rental from "../Rental";
import UserControls from "./UserControls";

import axios from "axios";
import firebase from "firebase";

const mapStateToProps = state => {
  const { rentals, user } = state;
  return {
    rentals,
    user
  };
};

class UserDashboard extends Component {
  state = {
    alert: false
  };
  deleteRental = async rentalId => {
    const { user } = this.props;
    let id;
    if (user) {
      id = await firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          return idToken;
        })
        .catch(function(error) {
          console.error(error);
          return null;
        })
        .finally(function(idToken) {
          return idToken;
        });
    }
    axios
      .post(`https://rentals-api.azurewebsites.net/${rentalId}`, {
        user: id,
        listing: rentalId
      })
      .then(response => {
        this.setState({ alert: true });
      })
      .catch(err => console.error(err));
  };

  redirect = to => {
    this.setState({ redirect: true, to: to });
  };

  render() {
    if (this.state.redirect) return <Redirect push to={this.state.to} />;
    const user = firebase.auth().currentUser;
    let uid, userRentals, rentalsDisplay;

    if (user != null) {
      uid = user.uid;
    }
    if (uid)
      userRentals = this.props.rentals.filter(rental => rental.user === uid);
    if (userRentals) {
      rentalsDisplay = userRentals.map(rental => {
        return (
          <Row key={rental._id}>
            <Col
              className="mt-3"
              xs={{ size: 3 }}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <UserControls id={rental._id} deleteRental={this.deleteRental} />
            </Col>
            <Col>
              <div className="mt-3 ml-5">
                <Rental {...rental} />
              </div>
            </Col>
          </Row>
        );
      });
    } else {
      rentalsDisplay = false;
    }
    return (
      <Container>
        <Modal isOpen={this.state.alert}>
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>
            You have succesfully deleted your rental listing.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.redirect("/")}>
              View All Rentals
            </Button>{" "}
            <Button color="secondary" onClick={() => this.redirect("/user")}>
              Manage My Listings
            </Button>
          </ModalFooter>
        </Modal>
        {/* <UserSidebar /> */}
        {rentalsDisplay !== false && (
          <Row style={{ borderBottom: "0.5px solid gainsboro" }}>
            <Col className="mt-2 text-center" xs={{ size: 6, offset: 4 }}>
              <h4>
                {this.props.user.user.slice(0, 1).toUpperCase() +
                  this.props.user.user.slice(1)}
                's Rental Listings
              </h4>
            </Col>
          </Row>
        )}

        {rentalsDisplay}
        <Row className="mt-4" style={{ borderTop: "0.5px solid gray" }}>
          <Col className="mt-4 text-center" xs={{ size: 6, offset: 4 }}>
            <Link to="/add-rental">
              <Button color="primary" size="lg">
                {!userRentals ? (
                  <h4>List a Property for Rent</h4>
                ) : (
                  <h4>Add a Rental Listing</h4>
                )}
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(connect(mapStateToProps)(UserDashboard));
