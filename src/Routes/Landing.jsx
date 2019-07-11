import React, { Component } from "react";
import AddressForm from "../Components/AddressForm";
import Main from "../Components/Main";
import { Container } from "../Components/common";
import { useData } from "../contexts";

class Landing extends Component {
  state = { endLocation: null };

  componentDidMount() {
    const cachedLocation = JSON.parse(localStorage.getItem("endLocation"));
    if (cachedLocation) {
      console.log(true);
      this.props.actions.setPos({ endLocation: cachedLocation.endLocation });
      this.setState({ endLocation: cachedLocation.endLocation });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.pos !== this.props.data.pos) {
      this.setState({ endLocation: this.props.data.pos });
      console.log(this.props);
    }
  }

  render() {
    return (
      <Container>
        {this.state.endLocation ? <Main /> : <AddressForm />}
      </Container>
    );
  }
}

export default useData(Landing);
