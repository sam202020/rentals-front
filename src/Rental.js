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

export default class Rental extends Component {
  phoneFormat = number => {
    const numStr = number.toString();
    return (
      "(" +
      numStr.slice(0, 3) +
      ")" +
      " " +
      numStr.slice(3, 6) +
      "-" +
      numStr.slice(6)
    );
  };

  wePayFormat = wePayArr => {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    let wePayStr = "";
    for (let pay of wePayArr)
      if (wePayArr.indexOf(pay) !== wePayArr.length - 1)
        wePayStr += pay.capitalize() + ", ";
      else wePayStr += pay.capitalize();
    return wePayStr;
  };
  render() {
    const {
      type,
      location,
      bedrooms,
      baths,
      wePay,
      phone,
      comments,
      imageURL,
      price,
      email
    } = this.props;

    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    return (
      <div>
        <Row className="mt-5">
          <Col lg="12">
            <Card
              style={{
                border: "1px solid black",
                display: "flex",
                flexDirection: "row"
              }}
            >
              <Col lg="3">
                <UncontrolledCarousel captionText="text" items={items} />
              </Col>
              <CardBody>
                <CardTitle>
                  {type.capitalize()}
                  <div className="mt-2">{bedrooms} Bedrooms</div>
                  <div className="mt-2">{baths} Baths</div>
                  <div className="mt-2">Location: {location} </div>
                  <div className="mt-2">
                    Price: {price}
                    .00{" "}
                  </div>
                  <div className="mt-2">We Pay: {this.wePayFormat(wePay)} </div>
                  <div className="mt-2">Contact: {this.phoneFormat(phone)}</div>
                  <div className="mt-2">{email}</div>
                </CardTitle>
                <CardSubtitle />
                <CardText>Comments: {comments}</CardText>
                <Button>More info</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
