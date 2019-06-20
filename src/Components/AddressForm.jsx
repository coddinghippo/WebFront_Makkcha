import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import axios from "axios";

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
  flex: 11;
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

const StyledButton = styled(Button)`
  flex: 1;
  width: 90%;
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

  getLocationByStationName(stnName) {
    const stn = encodeURI(stnName);
    axios
      .get(`https://makkcha.com/serachLocation?location=${stn}`)
      .then(res => {
        const endLocation = { endX: res.data.gpsX, endY: res.data.gpsY };
        if (res.status === 200) {
          localStorage.setItem("loc", JSON.stringify({ endLocation, stnName }));
        }
      })
      .then(this.props.toggleComponent);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getLocationByStationName(values.address);
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

          <StyledButton type="secondary" onClick={this.handleSubmit}>
            확인
          </StyledButton>
        </StyledForm>
      </Container>
    );
  }
}

export default Form.create({ name: "address" })(AddressForm);
