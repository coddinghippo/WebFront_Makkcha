import React, { Component } from "react";
import AddressForm from "../Components/AddressForm";
import styled from "styled-components";
import Main from "./Main";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

class Landing extends Component {
  state = {
    component: "form"
  };
  componentDidMount() {
    const addr = localStorage.getItem("addr");
    if (addr) this.setState({ component: "main" });
  }
  render() {
    return (
      <Container>
        {this.state.component === "form" ? <AddressForm /> : <Main />}
      </Container>
    );
  }
}

export default Landing;
