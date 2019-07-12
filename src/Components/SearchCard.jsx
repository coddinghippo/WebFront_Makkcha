import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useData } from "../contexts";
import { Container } from "./common";
import Search from "./Search";

const SearchContainer = styled(Container)`
  background: white;
  width: 92%;
  padding: 0 1rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.2);
`;

const SearchBox = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.pos !== this.props.data.pos) {
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
    let { startX, startY, endX, endY, startAddr, endAddr } = this.state;

    if (children) {
      return (
        <>
          <SearchBox>
            <Search type="start" />
            {children[0]}
          </SearchBox>
          <SearchBox>
            <Search type="end" />
            {children[1]}
          </SearchBox>
        </>
      );
    } else {
      return (
        <>
          <SearchBox>
            <Search type="start" />
          </SearchBox>
          <SearchBox>
            <Search type="end" />
          </SearchBox>
        </>
      );
    }
  }

  render() {
    return <SearchContainer>{this.renderChildren()}</SearchContainer>;
  }
}

export default useData(SearchCard);
