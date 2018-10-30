import React, { Component } from "react";
import Select from "react-select";
import { Container, Row, Col, Button } from "reactstrap";
import Axios from "axios";
import PhoneInput from "react-phone-number-input/basic-input";
import ImageUploader from "react-images-upload";
import { Redirect } from "react-router-dom";

import { Image } from "cloudinary-react";
import validator from "validator";

import cloudinary from "cloudinary-react";
import Dropzone from "react-dropzone";

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

const yesOrNoValues = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
]

export default class AddRental extends Component {
  state = {
    redirect: false,
    pictures: [],
    value: "",
    type: "",
    location: "",
    bedrooms: "",
    baths: "",
    wePay: [],
    phone: "",
    comments: "",
    imageURL: "",
    price: "",
    email: "",
    errorMessage: "",
    hud: false,
    errorMessages: {
      type: false,
      bedroom: false,
      bath: false,
      location: false,
      phone: false,
      email: false
    }
  };

  handleInput = value => {
    if (value.length === 11) return;
    this.setState({ phone: value, errorMessages: { phone: false } });
  };

  handleInputPrice = e => {
    if (isNaN(e.target.value)) this.setState({ errorMessage: true });
    else
      this.setState({ errorMessage: false, [e.target.name]: e.target.value });
  };

  handleInputEmail = e => {
    this.setState({
      errorMessagePhone: false,
      [e.target.name]: e.target.value,
      errorMessages: { email: false }
    });
  };

  handleTypeInput = select => {
    this.setState(state => ({
      type: select.value,
      errorMessages: { ...state.errorMessages, type: false }
    }));
  };

  handleBedroomsInput = select => {
    this.setState(state => ({
      bedrooms: select.value,
      errorMessages: { ...state.errorMessages, bedroom: false }
    }));
  };

  handleBathInput = select => {
    this.setState(state => ({
      baths: select.value,
      errorMessages: { ...state.errorMessages, bath: false }
    }));
  };

  handleLocationChange = e => {
    const value = e.target.value;
    this.setState(state => ({
      location: value,
      errorMessages: { ...state.errorMessages, location: false }
    }));
  };

  handleWePay = select => {
    const selectedGroup = select.map(option => option.value);
    this.setState({ wePay: selectedGroup });
  };

  handleComments = e => {
    this.setState({ comments: e.target.value });
  };

  handleHud = select => {
    this.setState({ hud: select.value });
  };

  addImage = e => {
    console.log(e);
    let arr = [];
    if (e.target.value.length > 0) {
      console.log(e.target.value);
    }
    console.log(e.target.value);
    this.setState({
      pictures: this.state.pictures.concat(e.target.value)
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      type,
      location,
      bedrooms,
      baths,
      wePay,
      phone,
      comments,
      pictures,
      price,
      email,
      hud
    } = this.state;
    if (!type) {
      this.setState({ errorMessages: { type: true } });
      return;
    }
    if (!bedrooms) {
      this.setState({ errorMessages: { bedroom: true } });
      return;
    }

    if (!baths) {
      this.setState({ errorMessages: { bath: true } });
      return;
    }

    if (!location) {
      this.setState({ errorMessages: { location: true } });
      return;
    }

    if (!phone && !email) {
      this.setState({ errorMessages: { phone: true } });
      return;
    } else if (!phone) {
      if (!validator.isEmail(email)) return;
    } else if (!email) {
      if (phone.length < 10) {
        this.setState({ errorMessages: { phone: true } });
        return;
      }
    }

    const status = this.props.addRental(
      type,
      location,
      bedrooms,
      baths,
      wePay,
      phone,
      comments,
      pictures,
      price,
      email,
      hud
    );
    if (status === "200") this.setState({ redirect: true });
    else this.setState({ errorMessages: { bath: true } });
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "djbxlkyg0", upload_preset: "xz37we5w", tags: ["rental"] },
      (error, result) => {
        if (error) console.error(error);
        else {
          let urlArr = [];
          for (let pic of result) {
            urlArr.push(pic.secure_url);
          }
          this.setState(
            state => {
              let newPicArr = state.pictures.concat(urlArr);
              return { pictures: newPicArr };
            },
            () => console.log(this.state.pictures)
          );
        }
      }
    );
  };

  onPhotoSelected(accFiles, rejFiles) {
    const cloundinaryUrl = "https://api.cloudinary.com/v1_1/djbxlkyg0/upload";

    for (let file of accFiles) {
      const fileName = file.name;
      Axios.post(cloundinaryUrl, {
        file: file,
        upload_preset: "xz37we5w",
        multiple: true
      })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
  }

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
      errorMessages,
      redirect
    } = this.state;
    if (redirect) return <Redirect push to="/" />;
    const isEmail = validator.isEmail(email);
    let isError = false;
    for (let i in errorMessages) if (errorMessages[i] === true) isError = true;
    return (
      <Container style={{ minHeight: "1000px" }}>
        <form>
          <Row>
            <Col lg="12" style={{ marginTop: 20 }}>
              <h1 style={{ textAlign: "center" }}>Add a Rental</h1>
            </Col>
          </Row>
          <Row>
            <Col
              className="mt-4"
              lg={{ size: 1, offset: 3 }}
              style={{ color: "red", textAlign: "right" }}
            >
              <h4>*</h4>
            </Col>
            <Col className="mt-4" lg={{ size: 4 }}>
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
            )}
          </Row>
          <Row>
            <Col
              className="mt-4"
              lg={{ size: 1, offset: 3 }}
              style={{ color: "red", textAlign: "right" }}
            >
              <h4>*</h4>
            </Col>
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
            )}
          </Row>
          <Row>
            <Col
              className="mt-4"
              lg={{ size: 1, offset: 3 }}
              style={{ color: "red", textAlign: "right" }}
            >
              <h4>*</h4>
            </Col>
            <Col className="mt-4" lg={{ size: 4 }}>
              <Select
                options={numbers}
                placeholder="Bathrooms"
                onChange={this.handleBathInput}
              />
            </Col>
            {errorMessages.bath && (
              <Col className="mt-4" lg="4">
                <h4 style={{ color: "red" }}>Required</h4>
              </Col>
            )}
          </Row>
          <Row>
            <Col
              className="mt-4"
              lg={{ size: 1, offset: 3 }}
              style={{ color: "red", textAlign: "right" }}
            >
              <h4>*</h4>
            </Col>
            <Col className="mt-4" lg={{ size: 4 }}>
              <input
                className="form-control"
                placeholder="Location"
                value={location}
                name="location"
                onChange={this.handleLocationChange}
              />
            </Col>
            {errorMessages.location && (
              <Col className="mt-4" lg="4">
                <h4 style={{ color: "red" }}>Required</h4>
              </Col>
            )}
          </Row>
          <Row>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  value={price}
                  name="price"
                  onChange={this.handleInputPrice}
                  className="form-control"
                  placeholder="Price"
                />
                <div className="input-group-append">
                  <span className="input-group-text">.00</span>
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
              <Select
                isMulti
                blurInputOnSelect={false}
                closeMenuOnSelect={false}
                options={wePayValues}
                placeholder="We Pay..."
                onChange={this.handleWePay}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <Select
                options={yesOrNoValues}
                placeholder="HUD Status"
                onChange={this.handleHud}
              />
            </Col>
          </Row>
          <Row>
            <Col
              className="mt-4"
              lg={{ size: 1, offset: 3 }}
              style={{ color: "red", textAlign: "right" }}
            >
              <h4>*</h4>
            </Col>
            <Col className="mt-4" lg={{ size: 4 }}>
              <PhoneInput
                country="US"
                value={phone}
                onChange={value => this.handleInput(value)}
                placeholder="Phone Number"
                style={{ width: "100%" }}
              />
            </Col>
            {errorMessages.phone && (
              <Col className="mt-4" lg="4">
                <h4 style={{ color: "red" }}>
                  Phone Number or Email Address Required
                </h4>
              </Col>
            )}
          </Row>
          <Row>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <input
                type="email"
                value={email}
                name="email"
                onChange={this.handleInputEmail}
                className="form-control"
                placeholder="...or Email Address"
              />
            </Col>

            {!isEmail &&
              email && (
                <Col className="mt-4" lg="4">
                  <h4 style={{ color: "red" }}>Enter Valid Email Address</h4>
                </Col>
              )}
          </Row>
          <Row>
            <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
              <textarea
                className="form-control"
                placeholder="Comments"
                name="comments"
                value={comments}
                onChange={this.handleComments}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-4 text-center" lg="12">
              <Button color="secondary" size="md" onClick={this.uploadWidget}>
                <h4>Add Pictures</h4>
              </Button>
            </Col>
          </Row>
          {this.state.pictures.length > 0 && (
            <Row>
              <Col className="mt-2 text-center" lg={{ size: 12 }}>
                <h4>Pictures uploaded</h4>
              </Col>
            </Row>
          )}

          <Row>
            <Col className="mt-4 text-center" lg={{ size: 8, offset: 2 }}>
              <Button
                color="primary"
                size="lg"
                block
                onClick={this.handleSubmit}
              >
                Add Rental
              </Button>
            </Col>
          </Row>
          {isError && (
            <Row>
              <Col className="mt-5 text-center" lg={{ size: 8, offset: 2 }}>
                <h4 style={{ color: "red" }}>
                  Please fill out required fields above
                </h4>
              </Col>
            </Row>
          )}
        </form>
      </Container>
    );
  }
}
