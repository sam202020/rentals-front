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
  CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Row, Col
} from "reactstrap";

export default class RentalsList extends Component {
  render() {
    return (
      <Row className="mt-5">
          <Col sm="6">
        <Card style={{ border: "1px solid black" }}>
          <CardImg
            bottom
            width="100%"
            src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=100"
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        </Col>
        </Row>
    );
  }
}
