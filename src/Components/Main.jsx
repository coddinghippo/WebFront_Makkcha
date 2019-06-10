import React from "react";
import styled from "styled-components";
// import { Button } from "antd";
import FloatContent from "./FloatContent";
import ImageContent from "./ImageContent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const IconContainer = styled.div`
  flex: 1;
  // border: 1px solid #000;
`;

const ContentContainer = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`;

// const clearStorage = props => {
//   localStorage.setItem("addr", "");
//   props.toggleComponent();
// };

const Main = props => (
  <Container>
    <ImageContent />
    <IconContainer />
    <ContentContainer>
      <FloatContent />
    </ContentContainer>
  </Container>
);

export default Main;
