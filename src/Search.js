import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Script from "react-load-script";

export default class Search extends Component {
  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  handleAutoComplete = e => {
    const value = e.target.value;
    const defaultBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(40.014815, 74.311982),
      new window.google.maps.LatLng(40.131737, -74.118621)
    );
    const options = {
      bounds: defaultBounds,
      types: ["geocode"]
    };
    // const autoComplete = new window.google.maps.places.Autocomplete(value, options);
    // console.log(autoComplete);
    const placesService = new window.google.maps.places.PlacesService
  };

  render() {
    return (
      <Row>
        <Col>
          <input type='text' onChange={this.handleAutoComplete}/>
        </Col>

        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAl7OWsgl5RdmVotUq5WlczuE2-BycH41c&libraries=places"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
      </Row>
    );
  }
}
