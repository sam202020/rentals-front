import React, { Component } from "react";
import Select from "react-select";

export default class SearchAnother extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
    this.searchRef = React.createRef();
  }

  handleAutoComplete = () => {
    const defaultBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(40.014815, -74.311982),
      new window.google.maps.LatLng(40.131737, -74.118621)
    );
    const options = {
      bounds: defaultBounds,
      strictBounds: true,
      types: ["geocode"]
    };
    const autoComplete = new window.google.maps.places.Autocomplete(
      this.searchRef.current,
      options
    );
    autoComplete.setFields(["geometry"]);

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      if (!place.geometry) {
        this.props.fetchRentals();
        return;
      }
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      this.setState({ searchObj: { lat, lng } }, () =>
        this.props.searchRentals(this.state.searchObj)
      );
    });
  };

  render() {
    return (
      <input
        style={{width:'30%'}}
        options={this.state.options}
        placeholder="Search"
        onChange={this.handleAutoComplete}
        ref={this.searchRef}
      />
    );
  }
}
