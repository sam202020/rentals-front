import React from "react";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
  //   callbacks: {
  //     signInSuccessWithAuthResult: function(authResult, redirectUrl) {
  //       // User successfully signed in.
  //       // Return type determines whether we continue the redirect automatically
  //       // or whether we leave that to developer to handle.
  //       return true;
  //     },
  //     uiShown: function() {
  //       // The widget is rendered.
  //       // Hide the loader.
  //       document.getElementById("loader").style.display = "none";
  //     }
  //   },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/user",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID]
  // Terms of service url.
  //   tosUrl: "/",
  //   // Privacy policy url.
  //   privacyPolicyUrl: "/"
};

export default () => {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
