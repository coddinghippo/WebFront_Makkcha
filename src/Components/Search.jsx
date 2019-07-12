import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "./common";

const Input = styled.input`
  border-radius: 0.3rem;
  height: 2rem;
  width: 100%;
  border: 1px solid #bbb;
  box-shadow: none;
`;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { addr: props.addr };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.addr !== this.props.addr)
      this.setState({ addr: this.props.addr });
  }

  render() {
    let { addr } = this.state;
    return (
      <Container>
        <Input
          value={addr || ""}
          onChange={console.log}
          onClick={console.log}
        />
      </Container>
    );
  }
}

export default Search;
