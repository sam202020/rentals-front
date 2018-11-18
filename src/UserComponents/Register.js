import React from "react";
import GoogleLogin from "react-google-login";
import { Navbar, Button } from "react-bootstrap";
import UserSidebar from "./UserSidebar";

class Register extends React.Component {

  render() {
    return (
      <div>
        <UserSidebar />
      </div>
    );
  }
}

export default Register;
