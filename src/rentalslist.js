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
  CardTitle, CardSubtitle, Button, Row, Col, Carousel, UncontrolledCarousel
} from "reactstrap";
import house1 from './default-house-1.jpg';
import house2 from './default-house-2.jpg';
import house3 from './default-house-3.jpg';

const items = [
    {
      src: house1,
      altText: 'Slide 1',
     
    },
    {
      src: house2,
      altText: 'Slide 2',
     
    },
    {
      src: house3,
      altText: 'Slide 3',
      
    }
  ];

export default class RentalsList extends Component {
  render() {
    return (
        <Container>
      <Row className="mt-5">
          <Col lg="12">
        <Card style={{ border: "1px solid black", display:'flex', flexDirection:'row' }}>
        <Col lg="3">
           <UncontrolledCarousel items={items} /> </Col>
          <CardBody>
            <CardTitle>Type (H/A), # Bedrooms, # Bathrooms, Location, Price, wePay, HUD?, phone #</CardTitle>
            <CardSubtitle>Comments</CardSubtitle>
            <CardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </CardText>
            <Button>More info</Button>
          </CardBody>
        </Card>
        </Col>
        </Row>
        </Container>
    );
  }
}
