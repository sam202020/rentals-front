import React, {Component} from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => {
  const { user } = state;
  return {
    user
  };
};

class UserControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
  }
  editRental = () => {
    this.setState({redirect: true});
  }

  render() {
    const { id, deleteRental } = this.props;
    if (this.state.redirect) {
      return <Redirect push to={`/edit-rental/${id}`} />
    }
    return (
      <div
        className="mt-5 text-center"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {" "}
        <Button color="primary" className="mt-3 d-flex text-center" onClick={() => this.editRental()}>
          <h5 className="text-center"> Edit Listing</h5>
        </Button>
        <Button
          color="secondary"
          className="d-flex mt-3"
          onClick={() => deleteRental(id)}
        >
          <h5> Delete Listing</h5>
        </Button>
      </div>
    );
  } 
}

export default withRouter(connect(mapStateToProps)(UserControls));
