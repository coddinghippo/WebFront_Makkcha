import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #eee;
  width: 94%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  border-bottom: 2px solid #bbb;
  height: 1rem;
  width: 60%;
`;

const FloatContent = () => (
  <Container>
    <Line />
  </Container>
);

export default FloatContent;
