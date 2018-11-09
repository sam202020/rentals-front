import React, { Component } from "react";
import Script from "react-load-script";
import SearchBar from 'material-ui-search-bar';

export default class SearchOther extends Component {
  state = {
    city: "",
    query: ""
  };

  handleScriptLoad = () => { 
      /*global google*/
    const defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(40.014815, -74.311982),
        new google.maps.LatLng(40.131737, -74.118621)
      );
    const options = { types: ['(geocode)'], strictBounds: true,
    bounds: defaultBounds, }; 
    
    this.autocomplete = new google.maps.places.Autocomplete(
                          window.document.getElementById('autocomplete'),
                          options ); 
    this.autocomplete.addListener('place_changed',
                                  this.handlePlaceSelect); 
  }

  handlePlaceSelect = () => {

    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <div>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAl7OWsgl5RdmVotUq5WlczuE2-BycH41c&libraries=places"
          onLoad={this.handleScriptLoad}
        />

        <SearchBar
          id="autocomplete"
          placeholder=""
          hintText="Search City"
          value={this.state.query}
          style={{
            margin: "0 auto",
            maxWidth: 800
          }}
        />
      </div>
    );
  }
}
