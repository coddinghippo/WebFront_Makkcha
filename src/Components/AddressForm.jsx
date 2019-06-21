import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import axios from "axios";
import keys from "../config/keys";

const { Item } = Form;

const Container = styled.div`
  background: #000033;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledItem = styled(Item)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 15rem;
  border: none;
  background: #000033;
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  &#address_address {
    border-bottom: 1px solid white;
  }
  transition: none;
  border-radius: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  postion: fixed;
  bottom: 0;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  width: 90%;
  height: 2.2rem;
  color: #000033;
  border-radius: 1.5rem;
  margin-bottom: 1.3rem;
  backgrouncolor: #000;
  font-weight: bold;
`;

class AddressForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  getPosFromAddr(searchVal) {
    let url = `https://dapi.kakao.com/v2/local/search/`;
    let headers = { Authorization: `KakaoAK ${keys.KakaoAK}` };

    function posFromAddr() {
      return new Promise(resolve =>
        axios
          .get(url + `address.json?query=${searchVal}`, { headers })
          .then(res => {
            if (res.data.documents.length) resolve(res.data.documents);
          })
      );
    }

    function posFromKeyword() {
      return new Promise(resolve =>
        axios
          .get(url + `keyword.json?query=${searchVal}`, { headers })
          .then(res => {
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getPosFromAddr(values.address);
      } else console.log(err);
    });
  };

  render() {
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
              rules: [{ required: false, message: "집 주소를 입력해 주세요!" }]
            })(<StyledInput placeholder="집 주소 입력" />)}
          </StyledItem>
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
