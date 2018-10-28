import React, { Component } from "react";
import {
  Card,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
  Carousel,
  UncontrolledCarousel
} from "reactstrap";
import house1 from "./default-house-1.jpg";
import house2 from "./default-house-2.jpg";
import house3 from "./default-house-3.jpg";

import Rental from './Rental';

const items = [
  {
    src: house1,
    altText: "Slide 1"
  },
  {
    src: house2,
    altText: "Slide 2"
  },
  {
    src: house3,
    altText: "Slide 3"
  }
];

export default class RentalsList extends Component {
  render() {
    return (
      <Container>
        {this.props.rentals.map(rental => <Rental key={rental._id} {...rental} />)}
      </Container>
    );
  }
}
