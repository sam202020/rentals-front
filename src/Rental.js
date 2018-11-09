import React, { Component, PureComponent } from "react";
import Carousel from "./Carousel";
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

export default class Rental extends PureComponent {
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

  capitalize = string => string.charAt(0) + string.slice(1);

  toTitleCase = string => {
    return string.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
      
        <Row className="mt-5 ml-3">
          <Col>
            <Card
              style={{
                border: "1px solid black",
                display: "flex",
                flexDirection: "row"
              }}
            >
              {images && (
                <Col
                  lg="2"
                  style={{
                    cursor:'zoom-in',
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <img alt='rental property' src={pictures[0]} style={{maxWidth:'100%'}}/>
                </Col>
              )}
              {/* {/* // ) : (
                //   <>
                //     <img src={defaultApt} style={{ maxWidth: "100%" }} />
                //     <p style={{ fontSize: "10px" }}>Sample Image</p>
                //   </>
                // )} */}

              <CardBody>
                <CardTitle>
                  <Row>
                    <Col className="mt-2 text-center">
                      <h4>{this.typeFormat(type)}</h4>
                    </Col>
                    <Col className="mt-2 text-center">
                      <h4>{this.toTitleCase(location)}</h4>{" "}
                    </Col>
                    {hud && (
                      <Col className="mt-2 text-center">
                        <h4 style={{ color: "gray" }}>HUD Accepted</h4>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col className="mt-3 text-center">
                      <h5 style={{ color: "gray" }}>{bedrooms} Bedrooms</h5>
                    </Col>
                    <Col className="mt-3 text-center">
                      <h5 style={{ color: "gray" }}>{baths} Bathrooms</h5>
                    </Col>
                    {wePay[0] && (
                      <Col className="mt-3 text-center">
                        <h5 style={{ color: "gray" }}>
                          We Pay: {this.wePayFormat(wePay)}
                        </h5>
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col className="mt-3 text-center">
                      {price ? (
                        <h5>
                          ${price}
                          .00
                        </h5>
                      ) : (
                        <h5>Please Call for Price</h5>
                      )}
                    </Col>

                    <Col className="mt-3 text-center">
                      <a href={"tel:" + phone}>
                        Call {this.phoneFormat(phone)}
                      </a>
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
     
    );
  }
}
