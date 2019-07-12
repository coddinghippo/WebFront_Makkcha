import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useData } from "../contexts";
import { Container } from "./common";
import Search from "./Search";

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  justify-content: center;
`;

class SearchCard extends Component {
  constructor(props) {
    super(props);
    const {
      startX,
      startY,
      endX,
      endY,
      startAddr,
      endAddr
    } = this.props.data.pos;
    this.state = { startX, startY, endX, endY, startAddr, endAddr };
  }

  componentDidMount() {
    if (this.props.props.startX) {
      const {
        startX,
        startY,
        endX,
        endY,
        startAddr,
        endAddr
      } = this.props.props;
      this.setState({ startX, startY, endX, endY, startAddr, endAddr });
    } else {
      const {
        startX,
        startY,
        endX,
        endY,
        startAddr,
        endAddr
      } = this.props.data.pos;
      this.setState({ startX, startY, endX, endY, startAddr, endAddr });
    }
  }

  renderChildren() {
    const { children } = this.props.props;
    let { startX, startY, endX, endY, startAddr, endAddr } = this.props.props
      .state
      ? this.props.props.state
      : this.props.data.pos;

    if (children) {
      return (
        <>
          <SearchContainer>
            <Search addr={"출발: " + startAddr} />
            {children[0]}
          </SearchContainer>
          <SearchContainer>
            <Search addr={"도착: " + endAddr} />
            {children[1]}
          </SearchContainer>
        </>
      );
    } else {
      return (
        <>
          <SearchContainer>
            <Search addr={"출발: " + startAddr} onChange={this.onChangeText} />
          </SearchContainer>
          <SearchContainer>
            <Search addr={"도착: " + endAddr} onChange={this.onChangeText} />
          </SearchContainer>
        </>
      );
    }
  }

  render() {
    return (
      <Container style={{ marginTop: "1rem" }}>
        {this.renderChildren()}
      </Container>
    );
  }
}

export default useData(SearchCard);
