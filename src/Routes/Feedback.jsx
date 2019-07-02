import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { makchaApi } from "../api";
import { Container, Text } from "../Components/common";

const { TextArea } = Input;

const Textcontainer = styled.div`
  flex: 2;
  justify-content: space-around;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: white;
`;
const FeedbackContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 6;
  color: white;
  justify-content: space-around;
`;

const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  height: inherit;
  width: 100%;
`;

const StyledTextArea = styled(TextArea)`
  line-height: 2rem;
  background: #000033;
  border-bottom: 1px solid #fff;
  color: white;
  font-size: 1.2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  align-items: flex-end;
  padding: 1rem;
`;

class Feedback extends Component {
  state = {};

  componentDidMount() {
    let Uid = localStorage.getItem("Uid");
    this.setState({ Uid });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let formData = new FormData();
        formData.append("feedback", values.feedback);
        formData.append("Uid", this.state.Uid);
        makchaApi.postFeedback(formData);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Container style={{ background: "#000033" }}>
        <Textcontainer>
          <Text size="extraLargeFontSize" weight="bold">
            피드백
          </Text>
          <Text>추가되면 좋을 기능이나 개선할 사항을 알려주세요~</Text>
        </Textcontainer>
        <FeedbackContainer>
          <StyledForm>
            {getFieldDecorator("feedback", {
              rules: [{ required: false, message: "사용해 보니 어땠나요?" }]
            })(
              <StyledTextArea
                placeholder="피드백을 입력해주세요"
                // onPressEnter={this.handleSubmit}
                autosize={{ minRows: 1, maxRows: 5 }}
                style={{
                  border: "none",
                  borderBottom: "1px solid #fff"
                  // textAlign: "center"
                }}
              />
            )}
          </StyledForm>
        </FeedbackContainer>
        <ButtonContainer>
          <Button
            shape="round"
            type="ghost"
            style={{ background: "white", color: "#000033" }}
            block
            onClick={this.handleSubmit}
          >
            <Link to="/">확인</Link>
          </Button>
          <Button shape="round" type="ghost" style={{ color: "white" }} block>
            <Link to="/">취소</Link>
          </Button>
        </ButtonContainer>
      </Container>
    );
  }
}

export default Form.create({ name: "feedback" })(Feedback);
