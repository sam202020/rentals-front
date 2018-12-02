import React, { Component } from "react";

export default class ScrollControl extends Component {
  state = {
    rentals: this.props.rentalPortions[0],
    num: 0,
    displayRef: React.createRef()
  };
  handleScroll = e => {
    console.log(e)
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      console.log("bottom");
    }
  };
  // componentWillMount() {
  //   const rentalsDisplay = this.props.rentals;
  //   this.setState({ rentals: rentalsDisplay, num: 30 });
  // }
  loadMore = () => {
    
  }
  render() {
    const {rentalPortions, groupCounter, rentals, transferProps } = this.props;
    const rentalsDisplay = rentalPortions[groupCounter];
    return (
      <div>
        {React.cloneElement(this.props.component, {
          transferProps,
          rentals: rentalsDisplay,
          numRentals: rentals.length,
          onScroll: () => this.handleScroll(this.displayRef)
        })}
      </div>
    );
  }
}
