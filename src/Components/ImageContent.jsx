import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  background: #000;
`;

const FlexBox = styled.div`
  flex: 1;
  margin: 1.2rem;
`;

const HeaderText = styled.h1`
  color: #fff;
  font-weight: bold;
  font-size: 4rem;
`;

const SubText = styled.p`
  font-size: 0.8rem;
  text-align: right;
  line-height: 1rem;
  color: #fff;
`;

const ImageContent = () => (
  <Container>
    <img
      src="https://www.hansung.ac.kr/html/themes/www/img/custom/1_06_01_01_t3location.gif"
      height="100%"
    />
  </Container>
);

export default ImageContent;
