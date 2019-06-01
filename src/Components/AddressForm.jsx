import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

const Container = styled.div``;
const StyledInput = styled(Input)`
  border: none;
  border-bottom: 1px solid grey;
  border-radius: none;
`;

class AddressForm extends Component {
  componentDidMount() {
    this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      console.log(err);
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={addressError ? "error" : ""}
            help={addressError || ""}
          >
            {getFieldDecorator("address", {
              rules: [{ required: false, message: "집 주소를 입력해 주세요!" }]
            })(<StyledInput placeholder="집 주소 입력" />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              완료
            </Button>
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

export default Form.create({ name: "address" })(AddressForm);
