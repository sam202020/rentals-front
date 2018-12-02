import React from "react";
import firebase from "firebase/app";
import { sendMessage, getCurrentUser } from "./chat";
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import NavModal from "../NavModal";

class Chat extends React.Component {
  state = { value: "", redirect: false, alert: false };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const propertyID = this.props.match.params.id;
    if (!firebase.auth().currentUser || !this.props.match.params.id) {
      this.handleRedirect();
      return undefined;
    }
    const from = await getCurrentUser();
    if (!from) this.handleRedirect();
    const postMessage = await sendMessage(this.state.value, from, propertyID);
    console.log(postMessage);
    if (
      !postMessage ||
      postMessage.result === "404" ||
      postMessage.result === "500"
    ) {
      this.handleRedirect();
    } else this.setState({ alert: true });
  };

  handleRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) return <Redirect push to="/signin" />;
    return (
      <Container>
        <NavModal {...this.state} />
        <form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={{ size: 6, offset: 3 }} className="mt-4">
              <h4>
                Interested in this property? Send a message to the owner below.
              </h4>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 6, offset: 3 }}>
              <TextField
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                label="Message the Owner"
                fullWidth
                id="filled-multiline-static"
                multiline
                rows="4"
                margin="normal"
                variant="filled"
                autoFocus
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 6, offset: 3 }} className="mt-4">
              <Button color="primary">Send Message</Button>
            </Col>
          </Row>
        </form>
      </Container>
    );
  }
}

export default Chat;
