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

import defaultApt from "./images/default-apt.jpg";

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
    if (typeof wePayArr === "object") {
      for (let pay of wePayArr) {
        if (wePayArr.indexOf(pay) !== wePayArr.length - 1)
          wePayStr += pay.capitalize() + ", ";
        else wePayStr += pay.capitalize();
      }
    } else {
      const conversionTable = {
        G: "Gas",
        E: "Electricity",
        W: "Water",
        H: "Heat"
      };
      for (let pay of wePayArr) {
        if (wePayArr.indexOf(pay) !== wePayArr.length - 1)
          wePayStr += pay.capitalize() + ", ";
        else wePayStr += pay.capitalize();
      }
      const re = new RegExp(Object.keys(conversionTable).join("|"), "gi");
      wePayStr = wePayStr.replace(re, function(matched) {
        return conversionTable[matched];
      });
    }
    return wePayStr;
  };

  typeFormat = type => {
    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    let returnStr = type;
    if (type === "A") returnStr = "apartment";
    if (type === "H") returnStr = "house";
    if (type === "T") returnStr = "townhouse";
    if (type === "R") returnStr = "room";
    return returnStr.capitalize();
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
      pictures,
      price,
      email,
      hud
    } = this.props;

    String.prototype.capitalize = function() {
      return this.charAt(0).toUpperCase() + this.slice(1);
    };
    let images;
    if (pictures[0]) {
      images = pictures.map(img => {
        let imgObj = {};
        imgObj.src = img;
        return imgObj;
      });
    }
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
              <Col
                lg="3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center"
                }}
              >
                {images ? (
                  <UncontrolledCarousel
                    captionText="Rental Picture"
                    items={images}
                  />
                ) : (
                  <>
                    <img src={defaultApt} style={{ maxWidth: "100%" }} />
                    <p style={{ fontSize: "10px" }}>Sample Image</p>
                  </>
                )}
              </Col>
              <CardBody>
                <CardTitle>
                  <Row>
                    <Col className="mt-2 text-center">
                      <h2>{this.typeFormat(type)}</h2>
                    </Col>
                    <Col className="mt-3 text-center">
                      <h4 style={{ color: "gray" }}>{bedrooms} Bedrooms</h4>
                    </Col>
                    <Col className="mt-3 text-center">
                      <h4 style={{ color: "gray" }}>{baths} Bathroom</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-4 text-center">
                      <h3>{location}</h3>{" "}
                    </Col>
                  </Row>
                  {wePay[0] ? (
                    <Row>
                      <Col className="mt-4 text-center">
                        {price ? (
                          <h4>
                            ${price}
                            .00
                          </h4>
                        ) : (
                          <h4>Please Call for Price</h4>
                        )}
                      </Col>
                      <Col className="mt-4 text-center">
                        <h4 style={{ color: "gray" }}>
                          We Pay: {this.wePayFormat(wePay)}
                        </h4>
                      </Col>
                      {hud && (
                        <Col className="mt-4 text-center">
                          <h5 style={{ color: "gray" }}>HUD Accepted</h5>
                        </Col>
                      )}
                    </Row>
                  ) : (
                    <Row>
                      <Col className="mt-4 text-center">
                        {price ? (
                          <h4>
                            ${price}
                            .00
                          </h4>
                        ) : (
                          <h4>Please Call for Price</h4>
                        )}
                      </Col>
                      {hud && (
                        <Col className="mt-4 text-center">
                          <h5 style={{ color: "gray" }}>HUD Accepted</h5>
                        </Col>
                      )}
                    </Row>
                  )}
                  <Row>
                    <Col className="mt-4 text-center">
                      <a href={"tel:" + phone}>Call {phone}</a>
                    </Col>
                    <div className="mt-3">{email}</div>
                  </Row>
                </CardTitle>
                <CardSubtitle />
                <CardText className="text-center mt-4">{comments}</CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
