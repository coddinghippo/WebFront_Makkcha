import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Timer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #000033;
  flex: 1;
`;

const TimerTime = styled.h1`
  color: white;
  font-size: 5rem;
  padding: 1rem;
  font-weight: bold;
`;

const TimerText = styled.h2`
  color: white;
  font-size: 3rem;
  padding: 1rem;
  font-weight: bold;
`;

const List = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Taxi = styled.div``;
const Route = styled.div``;

const clearStorage = props => {
  localStorage.setItem("addr", "");
  props.toggleComponent();
};

const Main = props => (
  <Container>
    <Timer>
      <TimerText>막차까지</TimerText>
      <TimerTime>03:12</TimerTime>
    </Timer>
    <List>
      <Link to="/">
        <Button size="large" type="ghost" onClick={() => clearStorage(props)}>
          캐시삭제
        </Button>
      </Link>
    </List>
  </Container>
);

export default Main;
