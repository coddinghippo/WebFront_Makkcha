import React, { Component } from "react";
import { Form, Input, Button, AutoComplete } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { fontSize } from "../Styles/_mixin";
import { Container as DefaultContainer } from "../Components/common";
import { stationInfo } from "../static/station_info";
import Hangul from "hangul-js";
import AddressMap from "../Components/AddressMap";
import { useData } from "../contexts";

const { Item } = Form;

const Container = styled(DefaultContainer)`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const Test = styled.div`
  height: 160px;
  width: 100%;
  background: ${props => props.background};
  overflow: hidden;
  text-align: center;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
`;

const InputContainer = styled(AutoComplete)`
  position: absolute;
  top: 2rem;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  width: 100% !important;
`;

const StyledButton = styled(Button)`
  width: 90%;
  height: 3rem;
  color: #000033;
  border-radius: 1.5rem;
  margin-bottom: 1.3rem;
  backgrouncolor: #000;
  font-weight: bold;
  font-size: ${fontSize.largeFontSize};
`;

// const StationOption = styled.p`
//   color: white;
// `;

class AddressSearch extends Component {
  state = { selected: "", searchRes: {} };

  handleSubmit = e => {
    e.preventDefault();
    const { selected } = this.state;
    const { pointx, pointy, long_name } = selected;
    const endLocation = { endX: pointx, endY: pointy, endAddr: long_name };
    localStorage.setItem("endLocation", JSON.stringify({ endLocation }));
    this.props.actions.setPos(endLocation);
  };

  onInputChange = value => {
    const { searchRes } = this.state;
    Object.keys(searchRes).forEach(item => {
      if (item === value) this.setState({ selected: searchRes[value] });
    });
  };

  handleSearch = value => {
    let keyword = value;
    let result = {};
    let currentIdx = 0;
    const max = 5;

    for (let idx in stationInfo) {
      if (Hangul.search(stationInfo[idx].long_name, keyword) === 0) {
        result[stationInfo[idx].long_name] = stationInfo[idx];
        currentIdx++;
        if (currentIdx === max) break;
      }
    }

    this.setState({
      dataSource: !value ? [] : Object.keys(result),
      searchRes: result
    });
  };

  setSelectToState(val) {
    this.setState({ selected: val });
  }

  handleSelect(value) {
    const { searchRes } = this.state;
    Object.keys(searchRes).forEach(item => {
      if (item === value) {
        const { long_name, pointx, pointy } = searchRes[value];
        this.props.actions.setPos({
          endAddr: long_name,
          endX: pointx,
          endY: pointy
        });
      }
    });
  }

  render() {
    console.log(this.props);
    const { dataSource } = this.state;

    return (
      <Container>
        <AddressMap
          style={{ position: "relative", width: "100%", height: "100%" }}
        />
        <InputContainer
          dataSource={dataSource}
          style={{ width: 200 }}
          onChange={this.onInputChange}
          onSearch={this.handleSearch}
          onSelect={value => this.handleSelect(value)}
          children={
            <Input
              placeholder="집 근처 역을 입력해 주세요"
              onChange={this.onInputChange}
            />
          }
          // placeholder="집 근처 역을 입력해 주세요"
        />
        <ButtonContainer>
          <Link to="/" />
          <StyledButton type="secondary" onClick={this.handleSubmit}>
            <Link to="/">확인</Link>
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}

export default useData(AddressSearch);
