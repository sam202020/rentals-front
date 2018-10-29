import React, { Component } from "react";

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  UncontrolledCarousel
} from "reactstrap";

import house1 from "./default-house-1.jpg";
import house2 from "./default-house-2.jpg";
import house3 from "./default-house-3.jpg";


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
    let images = imageURL.map(img => {
        let imgObj = {};
        imgObj.src = img;
        imgObj.caption = 'Slide'
        return imgObj;
    })
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
                <UncontrolledCarousel captionText="Rental Picture" items={images} />
              </Col>
              <CardBody>
                <CardTitle>
                    <Row>
                    <Col className="mt-2 text-center"><h2>
                  {type.capitalize()}</h2></Col>
                  <Col className="mt-3 text-center"><h4>{bedrooms} Bedrooms</h4></Col>
                  <Col className="mt-3 text-center"><h4>{baths} Bathroom</h4></Col></Row><Row>
                  <Col className="mt-4 text-center"><h3>{location}</h3> </Col></Row><Row>
                  <Col className="mt-4 text-center"><h4>
                    Price: {price}.00
                    </h4>                  </Col>
                  <Col className="mt-4 text-center">We Pay: {this.wePayFormat(wePay)} </Col></Row><Row>
                  <Col className="mt-4 text-center"><a href={'tel:' + phone}> Call {this.phoneFormat(phone)}</a></Col>
                  <div className="mt-3">{email}</div></Row>
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
