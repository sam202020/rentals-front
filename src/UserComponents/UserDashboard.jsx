import React, { Fragment, Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Row, Col, Button } from "reactstrap";
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
      .post(`http://localhost:3001/${rentalId}`, {
        user: id,
        listing: rentalId
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => console.error(err));
  };

  render() {
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
          <Fragment key={rental._id}>
            <Row>
              <Col
                className="mt-3"
                xs={{ size: 12, offset: 3 }}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <UserControls
                  id={rental._id}
                  deleteRental={this.deleteRental}
                />

                <div className="mt-3 ml-5">
                  <Rental {...rental} />
                </div>
              </Col>
            </Row>
          </Fragment>
        );
      });
    } else {
      rentalsDisplay = false;
    }
    return (
      <div style={{ textAlign: "left", overflow: 'hidden'}}>
        <UserSidebar />
        {rentalsDisplay !== false && (
          <Row style={{ borderBottom: "0.5px solid gainsboro" }}>
            <Col className="mt-2 text-center" xs={{ size: 6, offset: 4 }}>
              <h4>
                {this.props.user.slice(0, this.props.user.indexOf(" "))}'s
                Rental Listings
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
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(UserDashboard));
