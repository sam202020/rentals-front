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
    { value: 'heat', label: 'Heat'}
  ];

export default class AddRental extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col lg="12" style={{ marginTop: 20 }}>
            <h1 style={{ textAlign: "center" }}>Add Rental</h1>
            <Col className='mt-4' lg={{size:4, offset:4}}>
            <Select options={options} placeholder="Type" /></Col>
            <Col className='mt-4' lg={{size:4, offset:4}}>
            <Select options={numbers}  placeholder="Bedrooms"/></Col><Col className='mt-4' lg={{size:4, offset:4}}>
            <Select options={numbers}  placeholder="Bathrooms"/></Col><Col className='mt-4' lg={{size:4, offset:4}}>
            <input className='form-control' placeholder='Location' />
            </Col>
            <Col className='mt-4' lg={{size:4, offset:4}}>
            <input className='form-control' placeholder='Price' />
            </Col>
            <Col className='mt-4' lg={{size:4, offset:4}}>
            <Select options={wePay}  placeholder="We Pay..."/></Col>
            <Col className='mt-4' lg={{size:4, offset:4}}>
            <input className='form-control' placeholder='Phone Number' /></Col><Col className='mt-4' lg={{size:4, offset:4}}>
            <textarea className='form-control' placeholder='Comments' /></Col>
            <Col className='mt-4' lg={{size:6, offset:5}}>
            <Button color="primary">Add Rental</Button></Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
