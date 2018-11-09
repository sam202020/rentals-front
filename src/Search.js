import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import Script from "react-load-script";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng
} from "react-places-autocomplete";

export default class Search extends Component {
  state = { address: "" };
  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }

  // handleAutoComplete = e => {
  //   const value = e.target.value;
  //   const defaultBounds = new window.google.maps.LatLngBounds(
  //     new window.google.maps.LatLng(40.014815, 74.311982),
  //     new window.google.maps.LatLng(40.131737, -74.118621)
  //   );
  //   const options = {
  //     bounds: defaultBounds,
  //     types: ["geocode"]
  //   };
  //   // const autoComplete = new window.google.maps.places.Autocomplete(value, options);
  //   // console.log(autoComplete);
  //   const placesService = new window.google.maps.places.PlacesService
  // };

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  render() {
    /*global google*/
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(40.014815, -74.311982),
      new google.maps.LatLng(40.131737, -74.118621)
    );
    const options = {
      strictBounds: true,
      bounds: defaultBounds,
    };
    return (
      <Row>
        <Col>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={options}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </Col>
      </Row>
    );
  }
}
