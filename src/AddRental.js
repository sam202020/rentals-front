import React, { Component } from "react";
import Select from "react-select";
import { Container, Row, Col, Button } from "reactstrap";
import Axios from "axios";

const options = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" }
];

const numbers = [];
for (let i = 0; i <= 10; i++) numbers.push({ value: i, label: i });

const wePayValues = [
  { value: "gas", label: "Gas" },
  { value: "electricity", label: "Electricity" },
  { value: "water", label: "Water" },
  { value: "heat", label: "Heat" }
];

export default class AddRental extends Component {
  state = {
    type: "",
    location: "",
    bedrooms: "",
    baths: "",
    wePay: [],
    phone: "",
    comments: "",
    imageURL: "",
    price: "",
    errorMessagePhone: false
  };

  handleInput = e => {
    if (isNaN(e.target.value)) this.setState({ errorMessage: true });
    else
      this.setState({ errorMessage: false, [e.target.name]: e.target.value });
  };

  handleInputPhone = e => {
    if (isNaN(e.target.value)) this.setState({ errorMessagePhone: true });
    else
      this.setState({
        errorMessagePhone: false,
        [e.target.name]: e.target.value
      });
  };

  handleTypeInput = select => {
    this.setState({ type: select.value });
  };

  handleBedroomsInput = select => {
    this.setState({ bedrooms: select.value });
  };

  handleBathInput = select => {
    this.setState({ baths: select.value });
  };

  handleLocationChange = e => {
    this.setState({location: e.target.value});
  }

  handleWePay = select => {
    const selectedGroup = select.map(option => option.value);
    this.setState({wePay: selectedGroup});
  }

  handleComments = e => {
    this.setState({comments: e.target.value});
  }

   handleSubmit = e => {
     const { type, location, bedrooms, baths, wePay, phone, comments, imageURL, price } = this.state;
    e.preventDefault();
    this.props.addRental()
  };

  render() {
    const {
      price,
      errorMessage,
      type,
      location,
      bedrooms,
      baths,
      phone,
      wePay,
      comments,
      imageURL,
      errorMessagePhone
    } = this.state;
    return (
      <Container style={{ minHeight: "1000px" }}>
        <Row>
          <Col lg="12" style={{ marginTop: 20 }}>
            <h1 style={{ textAlign: "center" }}>Add Rental</h1>
          </Col>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <Select
              options={options}
              placeholder="Type"
              onChange={this.handleTypeInput}
            />
          </Col>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <Select
              options={numbers}
              placeholder="Bedrooms"
              onChange={this.handleBedroomsInput}
            />
          </Col>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <Select options={numbers} placeholder="Bathrooms" onChange={this.handleBathInput}/>
          </Col>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <input className="form-control" placeholder="Location" value={location} name='location' onChange={this.handleLocationChange}/>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                value={price}
                name="price"
                onChange={this.handleInput}
                className="form-control"
                placeholder="Price"
              />
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
            </div>
          </Col>
          {errorMessage && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Please Enter a Number</h4>
            </Col>
          )}
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <Select isMulti blurInputOnSelect={false}
                closeMenuOnSelect={false} options={wePayValues} placeholder="We Pay..." onChange={this.handleWePay}/>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <input
              value={phone}
              name="phone"
              onChange={this.handleInputPhone}
              className="form-control"
              placeholder="Phone Number"
            />
          </Col>
          {errorMessagePhone && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Please Enter a Number</h4>
            </Col>
          )}
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <textarea className="form-control" placeholder="Comments" name='comments' value={comments} onInput={this.handleComments}/>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 6, offset: 5 }}>
            <Button color="primary" onClick={this.handleSubmit}>Add Rental</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
