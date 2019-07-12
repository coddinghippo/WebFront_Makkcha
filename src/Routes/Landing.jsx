import React, { Component } from "react";
import AddressForm from "../Components/AddressForm";
import Main from "../Components/Main";
import { Container } from "../Components/common";
import { useData } from "../contexts";
import uuidv1 from "uuid/v1";

class Landing extends Component {
  state = { endLocation: null };

  componentDidMount() {
    // Get Uid
    let Uid = localStorage.getItem("Uid");
    if (!Uid) {
      Uid = uuidv1();
      localStorage.setItem("Uid", Uid);
    }
    this.props.actions.setUid(Uid);

    // Get Cached Location
    const cachedLocation = JSON.parse(localStorage.getItem("endLocation"));
    if (cachedLocation) {
      // console.log(true);
      if (!this.props.data.pos.startX) {
        this.props.actions.setPos({
          ...this.props.data.pos,
          ...cachedLocation.endLocation
        });
      }
      this.setState({ pos: cachedLocation.endLocation });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.pos !== this.props.data.pos) {
      this.setState({ ...this.props.data.pos });
      // console.log(this.props);
    }
  }

  render() {
    return <Container>{this.state.pos ? <Main /> : <AddressForm />}</Container>;
  }
}

export default useData(Landing);
