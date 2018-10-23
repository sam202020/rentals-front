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
        <Container>
      <Row className="mt-5">
          <Col lg="12">
        <Card style={{ border: "1px solid black", display:'flex', flexDirection:'row' }}>
        <Col lg="3">
          <CardImg
           style={{border:'1px solid black'}}

          /></Col>
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
        </Container>
    );
  }
}
