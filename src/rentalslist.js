import React, { Component } from "react";
import { Container } from "reactstrap";
import Rental from "./Rental";
import Search from "./Search";
import Loading from './Loading';

export default class RentalsList extends Component {
  render() {
    return (
      <Container>
        <Search />
        {this.props.rentals[0] ? (this.props.rentals.map(rental => (
          <Rental key={rental._id} {...rental} />
        ))): (
          <Loading type={'balls'} color={'#ffffff'} />
        ) 
        }
      </Container>
    );
  }
}
