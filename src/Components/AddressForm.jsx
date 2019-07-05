import React, { Component } from "react";
import { Form, Input, Button, AutoComplete } from "antd";
import styled from "styled-components";
import { makchaApi } from "../api";
import { fontSize } from "../Styles/_mixin";
import { Container as DefaultContainer } from "./common";
import { stationInfo } from "../static/station_info";
import Hangul from "hangul-js";

const { Item } = Form;

const Container = styled(DefaultContainer)`
  background: #000033;
  &.slick-slide {
    text-align: center;
    height: 160px;
    line-height: 160px;
    background: #000033;
    overflow: hidden;
  }

  & h3 {
    color: #fff;
  }t
`;

const Test = styled.div`
  height: 160px;
  width: 100%;
  background: ${props => props.background};
  overflow: hidden;
  text-align: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  & .ant-select-search__field__wrap {
    background: #000033;
  }
  & .ant-input {
    border-radius: 0;
    font-size: ${fontSize.largeFontSize} !important;
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  border: none;
  background: "#000033"
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  &#address_address {
    border-bottom: 1px solid white;
  }
  transition: none;
  font-size: ${fontSize.largeFontSize};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  postion: absolute;
  bottom: 0;
  justify-content: center;
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

const StationOption = styled.p`
  color: white;
`;

// Class
// Class
// Class
class AddressForm extends Component {
  state = { selected: "", searchRes: {} };
  componentDidMount() {
    this.props.form.validateFields();
  }

  getPos(searchVal) {
    function posFromAddr() {
      return new Promise(resolve =>
        makchaApi.getPosFromAddr(searchVal).then(res => {
          if (res.data.documents.length) resolve(res.data.documents);
        })
      );
    }

    function posFromKeyword() {
      return new Promise(resolve =>
        makchaApi.getPosFromKeyword(searchVal).then(res => {
          if (res.data.documents.length) resolve(res.data.documents);
        })
      );
    }

    Promise.race([posFromAddr(), posFromKeyword()])
      .then(result => {
        const endLocation = { endX: result[0].x, endY: result[0].y };
        const addr = result[0].address_name;
        localStorage.setItem("loc", JSON.stringify({ endLocation, addr }));
      })
      .then(this.props.toggleComponent);
  }

  // setCache() {
  //   const { selected } = this.state;
  //   const { pointx, pointy } = selected;
  //   const endLocation = { endX: pointx, endY: pointy };
  //   return new Promise(resolve => {
  //     localStorage.setItem(
  //       "loc",
  //       JSON.stringify({ endLocation, stnName: selected.display_name })
  //     );
  //   });
  // }

  handleSubmit = e => {
    const { selected } = this.state;
    const { pointx, pointy } = selected;
    const endLocation = { endX: pointx, endY: pointy };
    e.preventDefault();
    localStorage.setItem(
      "loc",
      JSON.stringify({ endLocation, stnName: selected.display_name })
    );
    this.props.toggleComponent();
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
        result[stationInfo[idx].display_name] = stationInfo[idx];
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

  render() {
    const { dataSource } = this.state;
    const {
      getFieldDecorator,
      getFieldError,
      isFieldTouched
    } = this.props.form;
    const addressError = isFieldTouched("address") && getFieldError("address");

    return (
      <Container>
        <StyledForm>
          <StyledItem
            validateStatus={addressError ? "error" : ""}
            help={addressError || ""}
          >
            {getFieldDecorator("address", {
              rules: [
                { required: false, message: "집 근처 역을 입력해 주세요!" }
              ]
            })(
              // <StyledInput
              //   placeholder="집 근처 역을 입력해 주세요"
              //   onChange={this.onInputChange}
              //   onPressEnter={this.handleSubmit}
              // />
              <AutoComplete
                dataSource={dataSource}
                style={{ width: 200 }}
                onChange={this.onInputChange}
                onSearch={this.handleSearch}
                style={{ background: "#000033", border: "none" }}
                children={
                  <StyledInput
                    placeholder="집 근처 역을 입력해 주세요"
                    onChange={this.onInputChange}
                    onPressEnter={this.handleSubmit}
                  />
                }
                // placeholder="집 근처 역을 입력해 주세요"
              />
            )}
          </StyledItem>
          {/* {this.renderSearchRes()} */}
        </StyledForm>
        <ButtonContainer>
          <StyledButton type="secondary" onClick={this.handleSubmit}>
            확인
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}

export default Form.create({ name: "address" })(AddressForm);
