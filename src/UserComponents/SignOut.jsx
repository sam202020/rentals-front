import React from "react";
import firebase from "firebase";
import { NavItem, Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

class SignOut extends React.Component {
  state = {
    modal: false
  };

  signOut = async () => {
    let signOutResult = await firebase
      .auth()
      .signOut()
      .then(function() {
        return true;
      })
      .catch(function(error) {
        return false;
      });
  };

  modalToggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  render() {
    return (
      <>
        <Modal isOpen={this.state.modal}>
          <ModalHeader>Are you sure you want to sign out?</ModalHeader>
          <ModalFooter style={{justifyContent: 'space-around'}}>
            <Button color="secondary" onClick={this.signOut}>
              Yes
            </Button>
            <Button color="primary" onClick={this.modalToggle}>
              No
            </Button>{" "}
          </ModalFooter>
        </Modal>
        <NavItem>
          <Button
            color="secondary"
            className="mt-3"
            onClick={() => this.modalToggle()}
          >
            Sign Out
          </Button>
        </NavItem>
      </>
    );
  }
}

export default SignOut;
