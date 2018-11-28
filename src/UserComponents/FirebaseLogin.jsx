import React from "react";
import axios from "axios";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const addUserToDB = async user => {
  let response = await axios.post("http://localhost:3001/user", { user });
  if (response.status === 201) console.log(response);
  else console.log(response);
};

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      if (authResult.additionalUserInfo.isNewUser) addUserToDB(authResult.user);
      return true;
    }
  },
  signInSuccessUrl: "/",
  //     uiShown: function() {
  //       // The widget is rendered.
  //       // Hide the loader.
  //       document.getElementById("loader").style.display = "none";
  //     }
  //   },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,]
  // Terms of service url.
  //   tosUrl: "/",
  //   // Privacy policy url.
  //   privacyPolicyUrl: "/"
};

export default () => {
  return (
    <div className='container'>
      <h6 className='mt-4' style={{lineHeight: 1.5}}>Sign in or Register to list a rental property and manage your listings:</h6>
      <StyledFirebaseAuth className='mt-3' uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
