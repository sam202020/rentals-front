import React, { Component } from "react";
import { Collapse, Row, Col, Button } from "reactstrap";
import Ionicon from "react-ionicons";

export default class Slideshow extends Component {
  state = {
    imgIndex: 0
  };

  rightArrowControl = () => {
    const { imgIndex } = this.state;
    const numPics = this.props.images.length;
    if (numPics === 1) return;
    if (imgIndex === numPics - 1) this.setState({ imgIndex: 0 });
    else this.setState(state => ({ imgIndex: state.imgIndex + 1 }));
  };

  leftArrowControl = () => {
    const { imgIndex } = this.state;
    const numPics = this.props.images.length;
    if (numPics === 1) return;
    if (imgIndex === 0) this.setState({ imgIndex: numPics - 1 });
    else this.setState(state => ({ imgIndex: state.imgIndex - 1 }));
  };

  render() {
    const { images } = this.props;
    return (
      <Row>
        <Col
          xs="2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
          onClick={this.leftArrowControl}
        >
          <Button color="white">
            <Ionicon icon="md-arrow-dropleft-circle" fontSize="35px" />
          </Button>
        </Col>
        <Col xs="8">
          {images.map((image, index) => (
            <Collapse key={index} isOpen={index === this.state.imgIndex}>
              {" "}
              <img src={image} alt='rental property' style={{ maxWidth: "100%" }} />
            </Collapse>
          ))}
        </Col>
        <Col
          xs="2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
          onClick={this.rightArrowControl}
        >
          <Button color="white">
            <Ionicon icon="md-arrow-dropright-circle" fontSize="35px" />
          </Button>
        </Col>
      </Row>
    );
  }
}
