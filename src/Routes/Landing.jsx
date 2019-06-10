import React, { Component } from "react";
import AddressForm from "../Components/AddressForm";
import styled from "styled-components";
import Main from "../Components/Main";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

class Landing extends Component {
  state = {
    component: "form"
  };

  componentDidMount() {
    const addr = localStorage.getItem("addr");
    if (addr) this.setState({ component: "main" });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) console.log(this.props);
  }

  toggleComponent() {
    const { component } = this.state;
    if (component === "form") this.setState({ component: "main" });
    else this.setState({ component: "form" });
  }

  render() {
    console.log(this.props);
    return (
      <Container>
        {this.state.component === "form" ? (
          <AddressForm toggleComponent={this.toggleComponent.bind(this)} />
        ) : (
          <Main toggleComponent={this.toggleComponent.bind(this)} />
        )}
      </Container>
    );
  }
}

export default Landing;
