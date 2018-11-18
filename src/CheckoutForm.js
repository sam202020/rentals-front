import validator from "validator";

import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import { Col, Button, Input } from "reactstrap";
import Axios from "axios";

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: ""
    };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    const { fName, lName } = this.state;
    const name = fName + '\xa0' + lName;
    console.log(name);
    let { token } = await this.props.stripe.createToken({ name });
    let response = await Axios.post('http://localhost:3001/payment', {token: token.id})
    if (response.status === 200) console.log("Purchase Complete!");
    else (console.log(response));
  }

  handleNameInput = e => {
    if (validator.isAlpha(e.target.value) || e.target.value === "") {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  render() {
    const { fName, lName } = this.state;
    return (
      <form className="container mt-5 border">
        <div className="form-row text-center mt-4 mb-4">
          <Col lg="3">
            <h6 className="mt-2">Enter First Name</h6>
          </Col>
          <Col xs="2">
            <Input name="fName" value={fName} onChange={this.handleNameInput} />
          </Col>

          <Col xs="2">
            <h6 className="mt-2">Enter Last Name</h6>
          </Col>
          <Col xs="2">
            <Input name="lName" value={lName} onChange={this.handleNameInput} />
          </Col>
        </div>

        <div className="form-row text-center mt-4 mb-4">
          <Col lg="3">
            <h6 htmlFor="card-element" className="mt-2">
              Enter Card Number
            </h6>
          </Col>
          <Col lg="6">
            <CardElement
              id="inputcc"
              className="form-control"
              iconStyle={"solid"}
              style={{
                base: {
                  color: "#32325d",
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                  fontSmoothing: "antialiased",
                  fontSize: "16px",
                  "::placeholder": {
                    color: "#aab7c4"
                  }
                },

                invalid: {
                  color: "#fa755a",
                  iconColor: "#fa755a"
                }
              }}
            />
          </Col>

          <Col lg="3">
            <Button color="primary" onClick={this.submit}>
              Submit Payment
            </Button>
          </Col>
        </div>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
