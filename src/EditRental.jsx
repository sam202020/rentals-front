import { customStyles } from "./customStyles";

import { withRouter } from "react-router";
import { connect } from "react-redux";
import { saveUIState } from "./actions";

import React, { Component } from "react";
import Select from "react-select";
import {
  Container,
  Row,
  Col,
  Button,
  Collapse,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody
} from "reactstrap";
import Axios from "axios";
import PhoneInput from "react-phone-number-input/basic-input";
import { Redirect } from "react-router-dom";
import Ionicon from "react-ionicons";

import firebase from "firebase/app";
import validator from "validator";
import { ClipLoader } from "react-spinners";
import { css } from "react-emotion";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const mapStateToProps = state => {
  const { UIState, user, rentals } = state;
  return {
    user,
    UIState,
    rentals
  };
};

const options = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "townhouse", label: "Townhouse" }
];

const numbers = [];
for (let i = 1; i <= 10; i++) numbers.push({ value: i, label: i });

const bathNumbers = numbers.slice(0, 6);

const wePayValues = [
  { value: "gas", label: "Gas" },
  { value: "electricity", label: "Electricity" },
  { value: "water", label: "Water" },
  { value: "heat", label: "Heat" }
];

const yesOrNoValues = [
  { value: true, label: "HUD eligible" },
  { value: false, label: "Not eligible for HUD" }
];

class EditRental extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      page: 1,
      alert: false,
      redirect: false,
      to: "/",
      pictures: [],
      type: null,
      place: null,
      bedrooms: null,
      baths: null,
      wePay: "",
      phone: "",
      comments: "",
      price: "",
      email: "",
      errorMessage: "",
      hud: false,
      errorMessages: {
        type: false,
        bedroom: false,
        bath: false,
        place: false,
        phone: false,
        email: false
      },
      displayedComps: {
        type: true,
        bedrooms: true,
        bathrooms: true,
        place: true,
        rightArrow: true,
        price: false,
        contact: false,
        pictures: false
      }
    };
  }

  async componentDidMount() {
    let id = null;
    if (!firebase.auth().currentUser) {
      this.setState({ redirect: true, to: "/signin" });
    } else {
      id = await firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(idToken => {
          return idToken;
        })
        .catch(error => {
          console.error(error);
          return null;
        });
    }
    if (id) {
      const rentalID = this.props.match.params.id;
      Axios.get(`https://rentals-api.azurewebsites.net/${rentalID}?token=${id}`)
        .then(response => {
          this.setState({ ...response.data, mounted: true });
        })
        .catch(err => {
          console.error(err);
          this.setState({ redirect: true, to: "/signin" });
        });
    }
  }

  handleInput = value => {
    if (value.length === 11) return;
    this.setState(
      () => ({
        phone: value,
        errorMessages: { phone: false }
      }),
      () => this.checkForEmailOrPhone()
    );
  };

  checkForEmailOrPhone = () => {
    const { email, phone } = this.state;
    if (phone.length === 10 || validator.isEmail(email)) {
      this.setState(state => ({
        errorMessages: { ...state.errorMessages, email: false },
        displayedComps: { ...state.displayedComps, rightArrow: true }
      }));
    } else if (phone.length < 10 && !validator.isEmail(email))
      this.setState(state => ({
        displayedComps: { ...state.displayedComps, rightArrow: false }
      }));
  };

  handleInputPrice = e => {
    e.persist();
    if (isNaN(e.target.value)) this.setState({ errorMessage: true });
    else {
      this.setState(state => ({
        errorMessage: false,
        price: e.target.value,
        displayedComps: { ...state.displayedComps, contact: true }
      }));
    }
  };

  handleInputEmail = e => {
    this.setState(
      {
        errorMessagePhone: false,
        [e.target.name]: e.target.value
      },
      () => this.checkForEmailOrPhone()
    );
  };

  handleTypeInput = select => {
    this.setState(state => ({
      type: select.value,
      errorMessages: { ...state.errorMessages, type: false },
      displayedComps: { ...state.displayedComps, bedrooms: true }
    }));
  };

  handleBedroomsInput = select => {
    this.setState(state => ({
      bedrooms: select.value,
      errorMessages: { ...state.errorMessages, bedroom: false },
      displayedComps: { ...state.displayedComps, bathrooms: true }
    }));
  };

  handleBathInput = select => {
    this.setState(state => ({
      baths: select.value,
      errorMessages: { ...state.errorMessages, bath: false },
      displayedComps: { ...state.displayedComps, place: true }
    }));
  };

  handleLocationChange = e => {
    e.persist();
    const value = e.target.value;
    const rightArrow = value.length >= 3;
    this.setState(state => ({
      place: e.target.value,
      errorMessages: { ...state.errorMessages, place: false },
      displayedComps: { ...state.displayedComps, rightArrow }
    }));
  };

  handleWePay = select => {
    let wePayStr = "";
    const conversionTable = {
      gas: "G",
      electricity: "E",
      water: "W",
      heat: "H"
    };
    const selectedGroup = select.map(option => option.value);
    for (let pay of selectedGroup) {
      wePayStr += conversionTable[pay];
    }
    this.setState({ wePay: wePayStr });
  };

  handleComments = e => {
    if (e.target.value.length > 300) return;
    this.setState({ comments: e.target.value });
  };

  handleHud = select => {
    this.setState({ hud: select.value });
  };

  addImage = e => {
    if (e.target.value.length > 0) {
      console.log(e.target.value);
    }
    console.log(e.target.value);
    this.setState({
      pictures: this.state.pictures.concat(e.target.value)
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { user } = this.props;
    let id;
    if (user) {
      id = await firebase
        .auth()
        .currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
          return idToken;
        })
        .catch(function(error) {
          console.error(error);
          return null;
        })
        .finally(function(idToken) {
          return idToken;
        });
    }
    const {
      type,
      place,
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

    if (!place) {
      this.setState({ errorMessages: { place: true } });
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

    Axios.put("http://localhost:3001", {
      user: id,
      type,
      place,
      bedrooms,
      baths,
      wePay,
      phone,
      comments,
      pictures,
      price,
      email,
      hud
    })
      .then(response => {
        this.setState({ alert: true });
      })
      .catch(err => {
        this.setState({ errorMessages: { bath: true } });
        console.error(err);
      });
  };

  uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        tags: ["rental"]
      },
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

  onPhotoSelected(accFiles) {
    const cloundinaryUrl = process.env.REACT_APP_CLOUDINARY_URL;

    for (let file of accFiles) {
      Axios.post(cloundinaryUrl, {
        file: file,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
        multiple: true
      })
        .then(res => console.log(res))
        .catch(err => console.error(err));
    }
  }

  handleNext = () => {
    const { page } = this.state;
    this.props.saveUIState(this.state, page);
    if (page === 1) {
      this.setState(state => ({
        displayedComps: { type: false, price: true, rightArrow: true },
        page: state.page + 1
      }));
    } else {
      this.setState(state => ({
        displayedComps: { type: false, pictures: true },
        page: state.page + 1
      }));
    }
  };

  handleBack = () => {
    const { page } = this.state;
    let { UIState } = this.props;
    UIState = UIState[page - 1];
    console.log(UIState);
    this.setState({ ...UIState });
  };

  handleEmailValidation = () => {
    const { email } = this.state;
    if (email && !validator.isEmail(email)) {
      this.setState(state => ({
        errorMessages: { ...state.errorMessages, email: true }
      }));
    }
  };

  displayPictures = () => {
    let { pictures } = this.state;
    pictures = pictures.map(picture => (
      <Col sm="4">
        <img src={picture} alt="rental property" style={{ maxWidth: "100%" }} />
      </Col>
    ));
    return (
      <Row className="text-center" style={{ justifyContent: "center" }}>
        {pictures}
      </Row>
    );
  };

  redirect = to => {
    this.setState({ redirect: true, to: to });
  };

  render() {
    const back = "< Need to Change Something?";
    let price = "";
    if (this.state.price) price = this.state.price;
    const {
      type,
      errorMessage,
      place,
      phone,
      comments,
      email,
      errorMessages,
      redirect,
      alert,
      to
    } = this.state;
    if (redirect) return <Redirect push to={to} />;
    const isNotEmail = errorMessages.email;
    let isError = false;
    for (let i in errorMessages) if (errorMessages[i] === true) isError = true;
    if (!type)
      return (
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={!type}
        />
      );
    return (
      <Container style={{ minHeight: "1000px" }}>
        <Modal isOpen={alert}>
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>Thank you for adding your rental listing!</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.redirect("/")}>
              View All Rentals
            </Button>{" "}
            <Button color="secondary" onClick={() => this.redirect("/user")}>
              Manage My Listings
            </Button>
          </ModalFooter>
        </Modal>
        {this.state.page > 1 && (
          <Col className="mt-3">
            <Button color="secondary" onClick={this.handleBack}>
              <h6>{back}</h6>
            </Button>
          </Col>
        )}
        <form>
          <Collapse isOpen={this.state.displayedComps.type}>
            <Row>
              <Col lg="12" style={{ marginTop: 20 }}>
                <h5 style={{ textAlign: "center" }}>
                  <Ionicon
                    className="mr-3"
                    icon="md-checkbox"
                    fontSize="35px"
                    color="green"
                  />
                  Need to edit your listing? Do it in 3 easy steps:
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>
                  Is your property an apartment, house, townhouse, or single
                  room?
                </h6>
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
                  defaultValue={{
                    value: this.state.type,
                    label: this.state.type
                  }}
                  styles={customStyles}
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
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.pictures}>
            <Row>
              <Col lg="12" style={{ marginTop: 20 }}>
                <h5 style={{ textAlign: "center" }}>
                  <Ionicon
                    className="mr-3"
                    icon="md-checkbox"
                    fontSize="35px"
                    color="green"
                  />
                  Last Step! Feel free to skip the following options and click
                  the button below to add your listing.
                </h5>
              </Col>
            </Row>

            <Row>
              <Col className="mt-3 text-center" lg={{ size: 8, offset: 2 }}>
                <Button
                  color="primary"
                  size="lg"
                  block
                  onClick={this.handleSubmit}
                >
                  <h2>Add Rental</h2>
                </Button>
              </Col>
            </Row>

            <Row>
              <Col className="mt-4 text-center" lg="12">
                <Button color="secondary" size="md" onClick={this.uploadWidget}>
                  <h4>
                    Have pictures of your property? Click here to add them!
                  </h4>
                </Button>
              </Col>
            </Row>
            {this.state.pictures.length > 0 && (
              <>
                <Row>
                  <Col className="mt-3 text-center" lg={{ size: 12 }}>
                    <h4>
                      Pictures Uploaded!{" "}
                      <Ionicon
                        icon="md-checkbox"
                        fontSize="35px"
                        color="green"
                      />
                    </h4>
                  </Col>
                </Row>
                {this.displayPictures()}
              </>
            )}

            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>
                  Is the owner paying for utilities while the property is
                  rented? Select below.
                </h6>
              </Col>
            </Row>

            <Row>
              <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
                <Select
                  isMulti
                  blurInputOnSelect={false}
                  closeMenuOnSelect={false}
                  options={wePayValues}
                  placeholder="Owner pays..."
                  onChange={this.handleWePay}
                />
              </Col>
            </Row>

            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>Is the property eligible for HUD?</h6>
              </Col>
            </Row>

            <Row>
              <Col className="mt-4" lg={{ size: 4, offset: 4 }}>
                <Select
                  styles={customStyles}
                  options={yesOrNoValues}
                  placeholder="HUD Status"
                  onChange={this.handleHud}
                />
              </Col>
            </Row>
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.price}>
            <Row>
              <Col lg="12" style={{ marginTop: 20 }}>
                <h5 style={{ textAlign: "center" }}>
                  <Ionicon
                    className="mr-3"
                    icon="md-checkbox"
                    fontSize="35px"
                    color="green"
                  />
                  Just 2 more steps!
                </h5>
              </Col>
            </Row>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>
                  What is the price per month? (You can leave this blank and let
                  a potential renter call to negotiate.)
                </h6>
              </Col>
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
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.price}>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>Enter your contact info: Phone number or email address.</h6>
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
                  className="form-control"
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
                  onBlur={this.handleEmailValidation}
                />
              </Col>

              {isNotEmail && email && (
                <Col className="mt-4" lg="4">
                  <h4 style={{ color: "red" }}>Enter Valid Email Address</h4>
                </Col>
              )}
            </Row>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>Any comments? Add them here (max 300 characters):</h6>
              </Col>
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
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.bedrooms}>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>How many bedrooms?</h6>
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
                  defaultValue={{
                    value: this.state.bedrooms,
                    label: this.state.bedrooms
                  }}
                  styles={customStyles}
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
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.bathrooms}>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>How many bathrooms?</h6>
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
                  defaultValue={{
                    value: this.state.baths,
                    label: this.state.baths
                  }}
                  styles={customStyles}
                  options={bathNumbers}
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
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.place}>
            <Row>
              <Col className="mt-4" lg={{ size: 6, offset: 3 }}>
                <h6>Where is the property? </h6>
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
                <input
                  className="form-control"
                  placeholder="Enter Location"
                  value={place}
                  name="location"
                  onChange={this.handleLocationChange}
                />
              </Col>
              {errorMessages.place && (
                <Col className="mt-4" lg="4">
                  <h4 style={{ color: "red" }}>Required</h4>
                </Col>
              )}
            </Row>
          </Collapse>

          <Collapse isOpen={this.state.displayedComps.rightArrow}>
            <Row>
              <Col xs={{ size: 6, offset: 3 }} className="mt-4">
                <h5>
                  When you're ready, click the arrow to your right to go to the
                  next step.
                </h5>
              </Col>
              <Col className="mt-4">
                <Button color="primary" onClick={this.handleNext}>
                  <h1>> Next Step</h1>
                </Button>
              </Col>
            </Row>
          </Collapse>

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

export default withRouter(
  connect(
    mapStateToProps,
    { saveUIState }
  )(EditRental)
);
