import React from "react";
import styled from "styled-components";
import { Button } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ImageContainer = styled.div`
  flex: 5;
  background: #000;
`;

const HeaderText = styled.h1`
  margin-top: 2rem;
  margin-left: 2rem;
  color: #fff;
  font-size: 6rem;
`;
const SubTextContainer = styled.div`
  margin-right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const SubText = styled.p`
  color: #fff;
`;

const IconContainer = styled.div`
  flex: 1;
  // border: 1px solid #000;
`;

const ContentContainer = styled.div`
  flex: 4;
  display: flex;
  justify-content: center;
`;

const FloatContent = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #eee;
  width: 94%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Line = styled.div`
  border-bottom: 2px solid #bbb;
  height: 1rem;
  width: 60%;
`;

const clearStorage = props => {
  localStorage.setItem("addr", "");
  props.toggleComponent();
};

const Main = props => (
  <Container>
    <ImageContainer>
      <HeaderText>밤길</HeaderText>
      <SubTextContainer>
        <SubText>시계가 반대로 돌아가고 있어</SubText>
        <SubText>- 류동훈</SubText>
      </SubTextContainer>
    </ImageContainer>
    <IconContainer />
    <ContentContainer>
      <FloatContent>
        <Line />
        <Button size="large" onClick={() => clearStorage(props)}>
          캐시 삭제
        </Button>
      </FloatContent>
    </ContentContainer>
  </Container>
);

export default Main;
