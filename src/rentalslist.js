import React, { PureComponent, Suspense } from "react";
import { Container, Row, Col } from "reactstrap";
import Axios from "axios";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";
import options from "./selectOptions";
import memoize from "memoize-one";
import { connect } from "react-redux";
import SliderFilter from "./SliderFilter";
import CheckBox from "./CheckBox";
import StickyBox from "react-sticky-box";
import { customStyles } from "./customStyles";

const Rental = React.lazy(() => import("./Rental"));

const mapStateToProps = state => {
  const { minPrice, maxPrice, minBeds, maxBeds, minBaths, maxBaths } = state;
  return {
    reduxRentals: state.rentals,
    rentalPortions: state.rentalPortions,
    minPrice,
    maxPrice,
    minBeds,
    maxBeds,
    minBaths,
    maxBaths
  };
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class RentalsList extends PureComponent {
  state = {
    hud: false,
    minMaxPrice: [],
    minMaxBeds: [],
    minMaxBaths: [],
    num: 50,
    searchInput: "",
    loading: true,
    searchRef: React.createRef()
  };

  componentDidMount() {
    const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;
    this.addScript = document.createElement("script");
    window.initAutoComplete = this.initAutoComplete;
    this.addScript.setAttribute(
      "src",
      `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initAutoComplete`
    );
    document.body.appendChild(this.addScript);
  }

  componentWillUnmount() {
    delete window.google;
    document.body.removeChild(this.addScript);
  }

  initAutoComplete = () => {
    const defaultBounds = new window.google.maps.LatLngBounds(
      new window.google.maps.LatLng(40.014815, -74.311982),
      new window.google.maps.LatLng(40.131737, -74.118621)
    );
    const options = {
      bounds: defaultBounds,
      strictBounds: true
    };
    const autoComplete = new window.google.maps.places.Autocomplete(
      this.state.searchRef.current,
      options
    );
    autoComplete.setFields(["geometry"]);
    autoComplete.addListener("place_changed", () => {
      this.setState({ loading: true }, () => {
        Axios.post("https://rentals-api.azurewebsites.net/geometry", {
          location: this.state.searchRef.current.value
        })
          .then(response => {
            const { lat, lng } = response.data;
            if (!response.data || !lat || !lng) {
              this.setState({ searchObj: null, loading: false });
            } else {
              this.setState({ searchObj: { lat, lng }, loading: false });
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    });
    this.setState({ loading: false });
  };

  calcDistance = (latB, latA, lngB, lngA) => {
    const distance = Math.hypot(latB - latA, lngB - lngA);
    return distance;
  };

  sortNumbers = list => {
    return list.sort(function(a, b) {
      return a.distance - b.distance;
    });
  };

  searchRentals = (searchObj, list) => {
    if (searchObj === null || searchObj === undefined) return list;
    const rentals = list.filter(rental => rental.address);
    const lat = searchObj.lat;
    const lng = searchObj.lng;
    for (let rental of rentals) {
      const distance = this.calcDistance(
        rental.address.lat,
        lat,
        rental.address.lng,
        lng
      );
      rental.distance = distance;
    }
    const sortedRentals = this.sortNumbers(rentals);
    return sortedRentals;
  };

  filterType = memoize((list, filterBy) => {
    if (typeof filterBy === undefined || filterBy == null) return list;
    if (Object.keys(filterBy).length === 0 && filterBy.constructor === Object)
      return list;
    const filteredList = list.filter(
      rental => rental.type in filterBy && filterBy[rental.type] === true
    );
    if (!filteredList[0]) return null;

    return filteredList;
  });

  handleFilter = select => {
    let filterObj = {};
    const selectedGroup = select.map(option => option.value);
    for (let option of selectedGroup) {
      filterObj[option] = true;
    }

    this.setState({ filterObj: filterObj });
  };

  handleDisplay = () => {
    if (this.props.reduxRentals[this.state.num]) {
      return this.props.reduxRentals.slice(0, this.state.num);
    }
  };

  renderRow = ({ index, key }) => {
    let { searchObj, filterObj } = this.state;
    const rentals = this.filterType(
      this.searchRentals(searchObj, this.props.reduxRentals),
      filterObj
    );
    if (typeof rentals[index] === "undefined" || rentals[index] === undefined)
      return;
    return <Rental key={key} rental={rentals[index]} />;
  };

  handleChange = (value, type) => {
    this.setState({ [type]: value });
  };

  filterPrice = memoize((list, price) => {
    const { minPrice, maxPrice } = this.props;
    if (minPrice === price[0] && maxPrice === price[1]) return list;
    if (typeof price === "undefined" || !price[0] || !price) return list;
    if (!list[0] || !list) return null;
    const filteredList = list.filter(
      rental =>
        rental.price && rental.price >= price[0] && rental.price <= price[1]
    );
    if (!filteredList[0]) return null;

    return filteredList;
  });

  filterBedrooms = memoize((list, numBeds) => {
    const { minBeds, maxBeds } = this.props;
    if (minBeds === numBeds[0] && maxBeds === numBeds[1]) return list;
    if (typeof numBeds === "undefined" || !numBeds[0] || !numBeds) return list;
    if (!list[0] || !list) return null;
    const filteredList = list.filter(
      rental =>
        rental.bedrooms &&
        parseInt(rental.bedrooms) >= numBeds[0] &&
        parseInt(rental.bedrooms) <= numBeds[1]
    );
    if (!filteredList[0]) return null;

    return filteredList;
  });

  filterBathrooms = memoize((list, numBaths) => {
    const { minBaths, maxBaths } = this.props;
    if (minBaths === numBaths[0] && maxBaths === numBaths[1]) return list;
    if (typeof numBaths === "undefined" || !numBaths[0] || !numBaths)
      return list;
    if (!list[0] || !list) return null;
    const filteredList = list.filter(
      rental =>
        rental.baths &&
        parseInt(rental.baths) >= numBaths[0] &&
        parseInt(rental.baths) <= numBaths[1]
    );
    if (!filteredList[0]) return null;

    return filteredList;
  });

  filterHud = memoize((list, hud) => {
    if (hud === false) return list;
    if (typeof hud === "undefined" || !hud) return list;
    if (!list[0] || !list) return null;
    const filteredList = list.filter(rental => rental.hud);
    if (!filteredList[0]) return null;

    return filteredList;
  });

  handleCheck = e => {
    this.setState({ hud: e.target.checked });
  };

  render() {
    let {
      searchObj,
      filterObj,
      minMaxPrice,
      minMaxBeds,
      minMaxBaths,
      hud
    } = this.state;
    let {
      numRentals,
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      minBaths,
      maxBaths
    } = this.props;
    let rentals = this.props.reduxRentals;
    rentals = this.filterHud(
      this.filterBathrooms(
        this.filterBedrooms(
          this.filterPrice(
            this.filterType(this.searchRentals(searchObj, rentals), filterObj),
            minMaxPrice
          ),
          minMaxBeds
        ),
        minMaxBaths
      ),
      hud
    );
    let loading = false;
    if (this.state.loading || (rentals && !rentals[0] && rentals !== null))
      loading = true;

    let rentalsDisplay;
    if (rentals) {
      rentalsDisplay = rentals.map(rental => {
        return (
          <Row key={rental._id}>
            <Col className="mt-3 ml-3">
              <Rental {...rental} />{" "}
            </Col>
          </Row>
        );
      });
    }
    if (rentalsDisplay) numRentals = rentalsDisplay.length;
    return (
      <Container>
        <h5
          className="text-center mt-3"
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Find an Apartment, House, Townhouse, or Room for rent in Lakewood, NJ{" "}
        </h5>
        <Row>
          <Col
            lg="3"
            className="mt-4 pt-3 pr-3 pl-3 text-center ml-0"
            style={{
              border: "0.5px solid gray"
            }}
          >
            <StickyBox offsetTop={100}>
              <h4 style={{ color: "blue" }}>Search</h4>

              <input
                className="mt-2 css-1pnvzwf"
                type="text"
                style={{ width: "100%", cursor: "pointer", paddingLeft: 10 }}
                placeholder="Enter Location"
                ref={this.state.searchRef}
              />
              <div
                className="mt-3"
                style={{ borderBottom: "1px solid gray" }}
              />
              <h5 style={{ color: "blue" }} className="mt-4">
                Looking for an Apartment, House, Townhouse, or Room?{" "}
              </h5>
              <Select
                placeholder="Select"
                isMulti
                onChange={this.handleFilter.bind(this)}
                options={options}
                styles={customStyles}
              />
              {minPrice && <h6 className="mt-4">Price</h6>}
              <SliderFilter
                name={"minMaxPrice"}
                min={minPrice}
                max={maxPrice}
                handleChange={this.handleChange}
              />
              <h6 className="mt-4"># Bedrooms</h6>
              <SliderFilter
                name={"minMaxBeds"}
                min={minBeds}
                max={maxBeds}
                handleChange={this.handleChange}
              />
              <h6 className="mt-4"># Bathrooms</h6>
              <SliderFilter
                name={"minMaxBaths"}
                min={minBaths}
                max={maxBaths}
                handleChange={this.handleChange}
              />
              {/* <div
                className="mt-4"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <CheckBox name={"hud"} onChange={this.handleCheck} />{" "}
                <h6 style={{ marginTop: 3 }}>Eligible for HUD</h6>
              </div> */}
            </StickyBox>
          </Col>

          <Col className="text-center">
            <ClipLoader
              className={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={loading}
            />

            {rentals === null ? (
              <Row>
                <Col className="mt-5 text-center">
                  <h4>No Rentals with Selected Options</h4>
                </Col>{" "}
              </Row>
            ) : (
              <>
                <Col className="mt-4 text-center">
                  {!loading && numRentals > 0 && numRentals && (
                    <>
                      {numRentals === this.props.reduxRentals.length ? (
                        <h6>{numRentals} Rentals Available</h6>
                      ) : (
                        <h6>
                          {numRentals} Rentals Available With Selected Options
                        </h6>
                      )}
                    </>
                  )}
                </Col>
                <Suspense fallback={<div>Loading...</div>}>
                  {rentalsDisplay}
                </Suspense>
              </>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(RentalsList);
