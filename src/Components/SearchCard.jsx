import React, { Component } from "react";
import styled from "styled-components";
import { Timeline } from "antd";
import { useData } from "../contexts";
import { Container, Col } from "./common";
import Search from "./Search";

const SearchContainer = styled.div`
  display: flex;
  background: white;
  width: 92%;
  padding: 0.6rem;
  padding-left: 1.2rem;
  padding-right: 1.2rem;
  padding-top: 1.2rem;
  border-radius: 0.3rem;
  margin-top: 1rem;
  box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.2);
`;

const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  border: 0.3rem solid ${props => props.color};
`;

const TimeLineBox = styled.div``;

const SearchBox = styled.div`
  margin: 0.5rem;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const VerticalLine = styled.div`
  border-left: 1px dotted #eee;
  border-width: thick;
  margin-left: 0.3rem;
  height: 40%;
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
        <Col>
          <SearchBox>
            <Search type="start" />
            {children[0]}
          </SearchBox>
          <SearchBox>
            <Search type="end" />
            {children[1]}
          </SearchBox>
        </Col>
      );
    } else {
      return (
        <Col>
          <SearchBox>
            <Search type="start" />
          </SearchBox>
          <SearchBox>
            <Search type="end" />
          </SearchBox>
        </Col>
      );
    }
  }

  render() {
    return (
      <SearchContainer>
        <TimeLineBox>
          <Circle color="skyblue" />
          <VerticalLine />
          <Circle color="orange" />
        </TimeLineBox>
        {this.renderChildren()}
      </SearchContainer>
    );
  }
}

export default useData(SearchCard);
