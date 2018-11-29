import React, { Component } from "react";
import firebase from "firebase/app";
import sendMessage from "./chat";

export default (Chat = ({rental}) => {
  const to = rental.user;
  const rental = rental._id;
  const from = firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      this.idToken = idToken;
      return idToken;
    })
    .catch(function(error) {
      console.error(error);
      this.idToken = null;
      return null;
    });
  return (
    <div onSubmit={(message) => sendMessage(message, from, to)}>
      <input type="text" />
    </div>
  );
});
