import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

export default class Payment extends React.Component {
  state = {
    stripe: null
  };

  componentDidMount() {
    if (window.Stripe) {
      this.setState({
        stripe: window.Stripe("pk_test_v1WbrLw4NvNWeAtJsMzJKNFb")
      });
    } else {
      document.querySelector("#stripe-js").addEventListener("load", () => {
        this.setState({ stripe: window.Stripe("pk_test_12345") });
      });
    }
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    );
  }
}
