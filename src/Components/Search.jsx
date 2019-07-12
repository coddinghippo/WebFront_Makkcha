import React, { Component } from "react";
import styled from "styled-components";
import { Row, Text, Col } from "./common";
import { makchaApi } from "../api";
import { useData } from "../contexts";

const Input = styled.input`
  border-radius: none;
  height: 2rem;
  width: 80%;
  max-width: 20rem;
  border: none;
  border-bottom: 1px solid #bbb;
  box-shadow: none;
`;

const AutoComplete = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.div`
  cursor: pointer;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  :hover {
    color: #bbb;
    transition: 0.3s ease-in-out;
  }
`;

class Search extends Component {
  constructor(props) {
    super(props);
    const { startAddr, endAddr } = props.data.pos;
    const { type } = props.props;
    this.state = {
      placeList: [],
      value: "",
      addr: type === "start" ? startAddr : endAddr
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.pos !== this.props.data.pos) {
      if (this.props.props.type && this.props.props.type === "start") {
        const { startAddr } = this.props.data.pos;
        this.setState({ addr: startAddr });
      } else if (this.props.props.type) {
        const { endAddr } = this.props.data.pos;
        this.setState({ addr: endAddr });
      }
    }
  }

  onChangeText(e) {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ value });
    makchaApi.getPosFromKeyword(value).then(res => {
      const placeList = res.data.documents.slice(0, 5).map(item => {
        const { place_name, x, y } = item;
        return { place_name, x, y };
      });
      this.setState({
        placeList
      });
    });
  }

  onSelectPlace(place) {
    const { place_name, x, y } = place;
    this.setState({
      [this.props.type]: { value: place_name, x, y },
      placeList: [],
      value: place_name
    });
    const { pos } = this.props.data;
    const { type } = this.props.props;
    if (this.props.props.type === "start") {
      this.props.actions.setPos({
        ...pos,
        startX: x,
        startY: y,
        startAddr: place_name,
        type
      });
    } else if (this.props.props.type === "end") {
      this.props.actions.setPos({
        ...pos,
        endX: x,
        endY: y,
        endAddr: place_name,
        type
      });
    }
  }

  renderOptions() {
    const { placeList } = this.state;
    return placeList.map((item, idx) => (
      <ListItem key={idx} onClick={() => this.onSelectPlace(item)}>
        {item.place_name}
      </ListItem>
    ));
  }

  render() {
    let { addr, placeList, selected } = this.state;
    const { type } = this.props;
    return (
      <Col style={{ justifyContent: "space-around" }}>
        <AutoComplete>
          <Row style={{ justifyContent: "space-around" }}>
            <Text>{type === "start" ? "출발" : "도착"}</Text>
            <Input
              value={this.state.value}
              placeholder={addr}
              onChange={e => this.onChangeText(e)}
            />
          </Row>
        </AutoComplete>
        <AutoComplete>{this.renderOptions()}</AutoComplete>
      </Col>
    );
  }
}

export default useData(Search);
