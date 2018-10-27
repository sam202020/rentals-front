import React, { Component } from "react";
import Select from "react-select";
import { Container, Row, Col, Button } from "reactstrap";
import Axios from "axios";
import PhoneInput from "react-phone-number-input/basic-input"

const options = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" }
];

const numbers = [];
for (let i = 0; i <= 10; i++) numbers.push({ value: i, label: i });

const wePayValues = [
  { value: "gas", label: "Gas" },
  { value: "electricity", label: "Electricity" },
  { value: "water", label: "Water" },
  { value: "heat", label: "Heat" }
];

export default class AddRental extends Component {
  state = {
    value: '',
    type: "",
    location: "",
    bedrooms: "",
    baths: "",
    wePay: [],
    phone: "",
    comments: "",
    imageURL: "",
    price: "",
    email: '',
    errorMessagePhone: false,
    errorMessages: {
      type:false,
      bedroom:false,
      bath:false,
      location:false,
      phone:false
    }
  };

  handleInput = value => {
    // if (isNaN(e.target.value)) this.setState({ errorMessage: true });
    // else
    //   this.setState({ errorMessage: false, [e.target.name]: e.target.value });
    if (value.length == 11) return;
    this.setState({ phone: value });
  };

  handleInputEmail = e => {
    // if (isNaN(e.target.value)) this.setState({ errorMessagePhone: true });
    // else
      this.setState({
        errorMessagePhone: false,
        [e.target.name]: e.target.value
      });
  };

  handleTypeInput = select => {
    this.setState(state => ({ type: select.value, errorMessages: {...state.errorMessages, type: false} }));
  };

  handleBedroomsInput = select => {
    this.setState(state => ({ bedrooms: select.value, errorMessages: {...state.errorMessages, bedroom: false} }));
  };

  handleBathInput = select => {
    this.setState(state => ({ baths: select.value, errorMessages: {...state.errorMessages, bath: false} }));
  };

  handleLocationChange = e => {
    const value = e.target.value 
    this.setState(state => ({ location: value, errorMessages: {...state.errorMessages, location: false} }));
  }

  handleWePay = select => {
    const selectedGroup = select.map(option => option.value);
    this.setState({wePay: selectedGroup});
  }

  handleComments = e => {
    this.setState({comments: e.target.value});
  }

   handleSubmit = e => {
    e.preventDefault();
    const { type, location, bedrooms, baths, wePay, phone, comments, imageURL, price, email } = this.state;
    if(!type) {
      this.setState({errorMessages:{type:true}});
      return
  
    }
    if(!bedrooms) {
      
      this.setState({errorMessages:{bedroom:true}});
      return
  
    }

    if(!baths) {
      this.setState({errorMessages:{bath:true}});
      return
    }

    if(!location) {
      this.setState({errorMessages:{location:true}});
      return
    }

    if(!phone && !email) {
      this.setState({errorMessages:{phone:true}})
      return
    } else if (!phone) {
      
    }

    this.props.addRental()
  };

  render() {
    const {
      price,
      errorMessage,
      type,
      location,
      bedrooms,
      baths,
      phone,
      wePay,
      comments,
      imageURL,
      errorMessagePhone, 
      email,
      errorMessages
    } = this.state;
    return (
      <Container style={{ minHeight: "1000px" }}>
      <form>
        <Row>
          <Col lg="12" style={{ marginTop: 20 }}>
            <h1 style={{ textAlign: "center" }}>Add Rental</h1>
          </Col></Row><Row>
            <Col className="mt-4" lg={{ size: 1, offset: 3 }}style={{color:'red', textAlign:'right'}}><h4>*</h4></Col>
          <Col className="mt-4" lg={{ size: 4}}>
            <Select
              options={options}
              placeholder="Type"
              onChange={this.handleTypeInput}
            />
          </Col>
          {errorMessages.type && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Required</h4>
            </Col>
          )}</Row><Row>
          <Col className="mt-4" lg={{ size: 1, offset: 3 }}style={{color:'red', textAlign:'right'}}><h4>*</h4></Col>
          <Col className="mt-4" lg={{ size: 4 }}>
            <Select
              options={numbers}
              placeholder="Bedrooms"
              onChange={this.handleBedroomsInput}
            />
          </Col>
          {errorMessages.bedroom && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Required</h4>
            </Col>
          )}</Row><Row>
          <Col className="mt-4" lg={{ size: 1, offset: 3 }}style={{color:'red', textAlign:'right'}}><h4>*</h4></Col>
          <Col className="mt-4" lg={{ size: 4}}>
            <Select options={numbers} placeholder="Bathrooms" onChange={this.handleBathInput}/>
          </Col>
          {errorMessages.bath && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Required</h4>
            </Col>
          )}</Row><Row>
          <Col className="mt-4" lg={{ size: 1, offset: 3 }}style={{color:'red', textAlign:'right'}}><h4>*</h4></Col>
          <Col className="mt-4" lg={{ size: 4}}>
            <input className="form-control" placeholder="Location" value={location} name='location' onChange={this.handleLocationChange}/>
          </Col>
          {errorMessages.location && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Required</h4>
            </Col>
          )}
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                value={price}
                name="price"
                onChange={this.handleInput}
                className="form-control"
                placeholder="Price"
              />
              <div class="input-group-append">
                <span class="input-group-text">.00</span>
              </div>
            </div>
          </Col>
          {errorMessage && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Please Enter a Number</h4>
            </Col>
          )}
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <Select isMulti blurInputOnSelect={false}
                closeMenuOnSelect={false} options={wePayValues} placeholder="We Pay..." onChange={this.handleWePay}/>
          </Col>
        </Row>
        <Row>
        <Col className="mt-4" lg={{ size: 1, offset: 3 }}style={{color:'red', textAlign:'right'}}><h4>*</h4></Col>
          <Col className="mt-4" lg={{ size: 4}}>
          <PhoneInput
        country="US"
        value={ phone }
        onChange={ (value) => this.handleInput(value)} placeholder='Phone Number'
        style={{width: '100%'}}/>
            
          </Col>
          {errorMessages.phone && (
            <Col className="mt-4" lg="4">
              <h4 style={{ color: "red" }}>Phone Number or Email Address Required</h4>
            </Col>
          )}
        </Row><Row>
        <Col className="mt-4" lg={{ size: 4,offset:4}}>
        <input
              value={email}
              name="email"
              onChange={this.handleInputEmail}
              className="form-control"
              placeholder="...or Email Address"
            />
</Col>


        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
            <textarea className="form-control" placeholder="Comments" name='comments' value={comments} onInput={this.handleComments}/>
          </Col>
        </Row>
        <Row>
          <Col className="mt-4" lg={{ size: 6, offset: 5 }}>
            <Button color="primary" onClick={this.handleSubmit}>Add Rental</Button>
          </Col>
        </Row></form>
      </Container>
    );
  }
}
