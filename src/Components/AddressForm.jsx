import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  flex: 10;
`;

const StyledInput = styled(Input)`
  width: 15rem;
  border: none;
  background: #000033;
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  border-radius: 0;
`;

const StyledButton = styled(Button)`
  flex: 1;
  width: 100%;
  color: #000033;
  font-weight: bold;
`;

class AddressForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        localStorage.setItem("addr", values.address);
        this.props.toggleComponent();
        console.log(values);
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
            })(<StyledInput placeholder="집에서 가까운 지하철역 입력" />)}
          </StyledItem>

          <StyledButton
            size="large"
            type="secondary"
            onClick={this.handleSubmit}
          >
            확인
          </StyledButton>
        </StyledForm>
      </Container>
    );
  }
}

export default Form.create({ name: "address" })(AddressForm);
