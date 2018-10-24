import React, { Component } from 'react';
import Select from 'react-select';
import {Container, Row, Col} from 'reactstrap'

export default class AddRental extends Component {
  render() {
    return (
      <Container>
          <Row>
              <Col lg="12" style={{marginTop:20}}>
          <h1 style={{textAlign:'center'}}>Add Rental</h1>
        <Select />
        </Col>
        </Row>
        </Container>
    )
  }
}
