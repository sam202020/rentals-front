import React from "react";
import axios from "axios";
import firebase from "firebase/app";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Axios from "axios";

const mapStateToProps = state => {
  const { UIState } = state;
  return UIState;
};

const addUserToDB = async user => {
  let response = await axios.post(
    "https://rentals-api.azurewebsites.net/user",
    { user }
  );
  if (response.status === 201) console.log(response);
  else console.log(response);
};



class FirebaseLogin extends React.Component {
  uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        if (authResult.additionalUserInfo.isNewUser)
          addUserToDB(authResult.user);
        return true;
      }
    },
    signInSuccessUrl: "/",
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  };
  uiConfigAddingRental = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult) {
        if (authResult.additionalUserInfo.isNewUser)
          addUserToDB(authResult.user);
        return true;
      }
    },
    signInSuccessUrl: "add-rental",
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  }
  render() {
    console.log(this.props.history.location.pathname);
    if (this.props.history.location.pathname !== "add-rental") {
      return (
        <div className="container">
          <h6 className="mt-4" style={{ lineHeight: 1.5 }}>
            Sign in or Register to list a rental property and manage your
            listings:
          </h6>
          <StyledFirebaseAuth
            className="mt-3"
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h6 className="mt-4" style={{ lineHeight: 1.5 }}>
            Please register to add a listing:
          </h6>
          <StyledFirebaseAuth
            className="mt-3"
            uiConfig={this.uiConfigAddingRental}
            firebaseAuth={firebase.auth()}
          />
        </div>
      );
    }
  }
}

export default withRouter(connect(mapStateToProps)(FirebaseLogin));
