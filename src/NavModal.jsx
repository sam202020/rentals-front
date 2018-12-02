import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap";
import { Link } from "react-router-dom";

const NavModal = props => (
  <Modal isOpen={props.alert}>
    <ModalHeader>Success!</ModalHeader>
    <ModalBody>
      <h4>The owner has recieved your message!</h4>
      <h5>Watch your inbox for a response.</h5>
    </ModalBody>
    <ModalFooter>
      <Link to="/">
        <Button color="primary">View All Rentals</Button>{" "}
      </Link>
      <Link to="/user">
        <Button color="secondary">Manage My Listings</Button>
      </Link>
    </ModalFooter>
  </Modal>
);

export default NavModal;
