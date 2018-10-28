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
    for (let pay of wePayArr) {
      if (wePayArr.indexOf(pay) !== wePayArr.length - 1) wePayStr += pay.capitalize() + ", ";
      else wePayStr += pay.capitalize();
    }
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
                    <Row>
                    <Col className="mt-2 text-center"><h2>
                  {type.capitalize()}</h2></Col>
                  <Col className="mt-3 text-center"><h4>{bedrooms} Bedrooms</h4></Col>
                  <Col className="mt-3 text-center"><h4>{baths} Bathroom</h4></Col></Row><Row>
                  <Col className="mt-4 text-center"><h3>{location}</h3> </Col></Row><Row>
                  <Col className="mt-4"><h5>
                    Price: {price}.00
                    </h5>                  </Col></Row>
                  <div className="mt-3">We Pay: {this.wePayFormat(wePay)} </div>
                  <div className="mt-3 text-center"><a href={'tel:' + phone}> Call {this.phoneFormat(phone)}</a></div>
                  <div className="mt-3">{email}</div>
                </CardTitle>
                <CardSubtitle />
                <CardText className='text-center'>{comments}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
