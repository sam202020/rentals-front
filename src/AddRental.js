import React, { Component } from "react";
import Select from "react-select";
import { Container, Row, Col, Button } from "reactstrap";

const options = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" }
];

const numbers = [];
for (let i = 0; i <= 10; i++) numbers.push({ value: i, label: i });

const wePay = [
  { value: "gas", label: "Gas" },
  { value: "electricity", label: "Electricity" },
  { value: "water", label: "Water" },
  { value: "heat", label: "Heat" }
];

export default class AddRental extends Component {
    state = {
      price: '',
      errorMessage: false
    }

    handleInput = e => {
        if (isNaN(e.target.value)) this.setState({errorMessage: true})
        else this.setState({[e.target.name]: e.target.value})
    }

  render() {
      const { price, errorMessage } = this.state;
    return (
      <Container style={{ minHeight: "1000px" }}>
        <Row>
          <Col lg="12" style={{ marginTop: 20 }}>
            <h1 style={{ textAlign: "center" }}>Add Rental</h1></Col>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <Select options={options} placeholder="Type" />
            </Col>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <Select options={numbers} placeholder="Bedrooms" />
            </Col>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <Select options={numbers} placeholder="Bathrooms" />
            </Col>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <input className="form-control" placeholder="Location" />
            </Col></Row><Row>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">$</span>
                </div>
                <input value={price} name='price' onChange={this.handleInput} className="form-control" placeholder="Price" />
                <div class="input-group-append">
                  <span class="input-group-text">.00</span>
                </div>
              </div>
            </Col>
            {errorMessage && <Col className="mt-4" lg='4'>
                <h4 style={{color: 'red'}}>Please Enter a Number</h4></Col>}</Row>
                <Row>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <Select options={wePay} placeholder="We Pay..." />
            </Col>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <input className="form-control" placeholder="Phone Number" />
            </Col>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <textarea className="form-control" placeholder="Comments" />
            </Col>
            <Col className="mt-4" lg={{ size: 6, offset: 5 }}>
              <Button color="primary">Add Rental</Button>
            </Col>
          </Row>
        
      </Container>
    );
  }
}
