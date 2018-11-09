import React, { Component, PureComponent } from "react";
import { Container, Row, Col } from "reactstrap";
import Rental from "./Rental";
import Axios from "axios";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";
import options from "./selectOptions";
import memoize from "memoize-one";
import { List, WindowScroller } from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
import { connect } from "react-redux";
import SliderFilter from "./SliderFilter";
import CheckBox from "./CheckBox";
import StickyBox from "react-sticky-box";

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

const customStyles = {
  control: base => ({
    ...base,
    '&:hover': {
      cursor: 'pointer', 
      border: '1px solid blue'
    }
  })
}

const rowHeight = 50;
const rowWidth = 1000;

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
    this.setState({ loading: false });
  }

  // componentWillMount() {
  //   window.addEventListener("scroll", this.props.onScroll);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("scroll", this.props.onScroll);
  // }

  // componentWillMount() {
  //   this.setState({ loading: true });
  // }

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

  handleAutoComplete = e => {
    e.persist();
    if (e.target.value.length === 0) {
      this.setState({ searchObj: null });
      return;
    }
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
      this.state.searchRef.current,
      options
    );
    autoComplete.setFields(["geometry"]);
    autoComplete.addListener("place_changed", () => {
      this.setState({ loading: true }, () => {
        Axios.post("http://localhost:3001/geometry", {
          location: e.target.value
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
    let filterObj = new Object();
    const selectedGroup = select.map(option => option.value);
    for (let option of selectedGroup) {
      filterObj[option] = true;
    }

    this.setState({ filterObj: filterObj });
  };

  rentalsDisplay = array => {};

  handleLoad = () => {};

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
    console.log(rentals[index]);
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
      groupCounter,
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
    // let numRentals = 0;
    // if (rentals) for (let i of rentals) numRentals += 1;
    let rentalsDisplay;
    if (rentals) {
      rentalsDisplay = rentals.map(rental => {
        return <Rental key={rental._id} {...rental} />;
      });
    }
    if (rentalsDisplay) numRentals = rentalsDisplay.length;
    return (
      <Container>
        <Row>
          <Col className="mt-2 text-center">
            {!loading && numRentals > 0 && numRentals && (
              <h6>{numRentals} Rentals</h6>
            )}
          </Col>
        </Row>
        <Row>
          <Col lg="3" className="mt-4 text-center ml-0">
            <StickyBox>
              <h6>Search</h6>

              <input
                className="mt-2 css-1pnvzwf"
                type="text"
                style={{ width: "100%", cursor: "pointer" }}
                placeholder=" Enter Location"
                onChange={this.handleAutoComplete}
                ref={this.state.searchRef}
              />
              <h6 className="mt-4">Apartment, House, Townhouse, or Room? </h6>
              <Select
                placeholder="Select"
                blurInputOnSelect={false}
                closeMenuOnSelect={false}
                isMulti
                onChange={this.handleFilter.bind(this)}
                options={options}
                styles={customStyles}
              />
              <h6 className="mt-4">Price</h6>
              <SliderFilter
                name={"minMaxPrice"}
                min={minPrice}
                max={maxPrice}
                handleChange={this.handleChange}
              />
              <h6 className="mt-4">Bedrooms</h6>
              <SliderFilter
                name={"minMaxBeds"}
                min={minBeds}
                max={maxBeds}
                handleChange={this.handleChange}
              />
              <h6 className="mt-4">Bathrooms</h6>
              <SliderFilter
                name={"minMaxBaths"}
                min={minBaths}
                max={maxBaths}
                handleChange={this.handleChange}
              />
              <div
                className="mt-4"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <CheckBox name={"hud"} onChange={this.handleCheck} />{" "}
                <h6 style={{ marginTop: 3 }}>Eligible for HUD</h6>
              </div>
            </StickyBox>
          </Col>
          {/* <Col lg="4" className="mt-4 text-center">
            <h5>Type</h5>
            <Select
              placeholder="Apartment, House, Townhouse, or Room"
              blurInputOnSelect={false}
              closeMenuOnSelect={false}
              isMulti
              onChange={this.handleFilter.bind(this)}
              options={options}
            />
          </Col>
          <Col lg="4" className="mt-4 text-center">
            <h5>Price</h5>
            <SliderFilter
              name={"minMaxPrice"}
              min={minPrice}
              max={maxPrice}
              handleChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="4" className="mt-4 text-center">
            <h5>Bedrooms</h5>
            <SliderFilter
              name={"minMaxBeds"}
              min={minBeds}
              max={maxBeds}
              handleChange={this.handleChange}
            />
          </Col>
          <Col lg="4" className="mt-4 text-center">
            <h5>Bathrooms</h5>
            <SliderFilter
              name={"minMaxBaths"}
              min={minBaths}
              max={maxBaths}
              handleChange={this.handleChange}
            />
          </Col>
          <Col lg="4" className="mt-4 text-center">
            <h5>HUD Qualified</h5>
            <CheckBox name={"hud"} onChange={this.handleCheck} />
          </Col>
        </Row> */}
          <Col className="text-center ml-5">
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
              rentalsDisplay
            )}
          </Col>
          {/* <Row>
          <Col lg="9" className="text-center">
            <ClipLoader
              className={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={loading}
            />
          </Col> */}
          {/* </Row>
        {rentals === null ? (
          <Row>
            <Col className="mt-5 text-center">
              <h4>No Rentals with Selected Options</h4>
            </Col>{" "}
          </Row>
        ) : (
          // <WindowScroller>
          //   {({ height, isScrolling, onChildScroll, scrollTop }) => (
          //     <List
          //       autoHeight
          //       height={height}
          //       isScrolling={isScrolling}
          //       onScroll={onChildScroll}
          //       rowCount={numRentals}
          //       rowHeight={50}
          //       rowRenderer={this.renderRow}
          //       scrollTop={scrollTop}
          //       width={rowWidth}
          //     />
          //   )}
          // </WindowScroller>
          //           <AutoSizer>
          //   {({ height, width }) => (
          //           <List
          //             filterObj={this.state.filterObj}
          //             width={width}
          //             height={height}
          //             rowHeight={50}
          //             rowRenderer={this.renderRow}
          //             rowCount={numRentals}
          //           />
          //           )}
          // </AutoSizer>
          rentalsDisplay
        )} */}
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(RentalsList);
