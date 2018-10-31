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
  UncontrolledCarousel,
  Alert
} from "reactstrap";
import house1 from "./default-house-1.jpg";
import house2 from "./default-house-2.jpg";
import house3 from "./default-house-3.jpg";
import NavComp from "./NavComp";
import Rental from './Rental';
import Search from './Search'
import Axios from 'axios';

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

export default class RentalsList extends Component {
  componentDidMount() {
    var geocoder;
    var map;
    function init() {
      geocoder = new window.google.maps.Geocoder();
      var latlng = new window.google.maps.LatLng(-34.397, 150.644);
      var mapOptions = {
        zoom: 8,
        center: latlng
      }
      map = new window.google.maps.Map(window.document.getElementById('map'), mapOptions);
    }

    Axios.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyAl7OWsgl5RdmVotUq5WlczuE2-BycH41c&libraries=places&callback=init')
      .then(response => console.log(response))
      .catch(err => console.error(err));

  }
  render() {
    return (
      <Container>
        <div id='map' />
        <Search />
        {this.props.rentals.map(rental => <Rental key={rental._id} {...rental} />)}
      </Container>
    );
  }
}
