import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000033;
`;

const StyledForm = styled(Form)`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled(Input)`
  border: none;
  background: #000033;
  width: 80vw;
  text-align: center;
  color: white;
  border-bottom: 1px solid white;
  border-radius: 0;
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
        <StyledForm onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={addressError ? "error" : ""}
            help={addressError || ""}
          >
            {getFieldDecorator("address", {
              rules: [{ required: false, message: "집 주소를 입력해 주세요!" }]
            })(<StyledInput placeholder="집 주소 입력" />)}
          </Form.Item>
          <Form.Item>
            <Link to="/main">
              <Button size="large" type="secondary" htmlType="submit">
                확인
              </Button>
            </Link>
          </Form.Item>
        </StyledForm>
      </Container>
    );
  }
}

export default Form.create({ name: "address" })(AddressForm);
