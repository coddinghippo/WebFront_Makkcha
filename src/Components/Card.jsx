import React from "react";
import styled from "styled-components";
import uuidv1 from "uuid/v1";
import { lineColors, fontSize } from "../Styles/_mixin";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 90%;
  max-width: 90%;
  height: 1rem;
  background: sky-blue;
`;

const Bar = styled.div`
  text-align: center;
  height: 20px;
`;

const TextContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

const Text = styled.p`
  margin: 0.5rem 0;
  width: 90%;
  font-weight: 700;
`;

const Card = props => {
  const makcha = props.makcha;
  const totalTime = makcha.reduce((a, x) => a + x.time, 0);
  const { lastTimeList } = props.route;
  const totalDistance = makcha.reduce((a, x) => a + x.distance, 0) / 1000;

  const renderStn = () => {
    return makcha.map((item, idx) => {
      let length = Math.floor((Number(item.time) / totalTime) * 100);
      if (length < 24) length = 24;
      length = String(length) + "%";
      return (
        <Bar
          key={uuidv1()}
          style={{
            width: length,
            color: "black",
            textAlign: "left"
          }}
        >
          <span style={{ fontSize: 8 }}>
            {item.routeNm === "도보" ? "도보" : item.fname}
          </span>
        </Bar>
      );
    });
  };

  const renderBar = () => {
    return makcha.map((item, idx) => {
      let length = Math.floor((Number(item.time) / totalTime) * 100);
      if (length < 24) length = 24;
      length = String(length) + "%";
      return (
        <Bar
          key={uuidv1()}
          style={{
            width: length,
            backgroundColor: lineColors[item.routeNm],
            color: "white"
          }}
        >
          {item.time}분
        </Bar>
      );
    });
  };

  return (
    <Container>
      <TextContainer>
        <Text>
          지하철 {totalTime}분 | 막차 {lastTimeList[0].lastTimeDay.slice(0, 5)}
        </Text>
        <p>
          {totalDistance.toFixed(1)}km |{" "}
          {String(Math.floor(props.route.price / 1000)) +
            "," +
            String(props.route.price % 1000)}
          원 | {makcha[0].time}분
        </p>
      </TextContainer>
      <BarContainer style={{ marginBottom: 0 }}>{renderBar()}</BarContainer>
      <BarContainer style={{ marginTop: 0 }}>{renderStn()}</BarContainer>
    </Container>
  );
};

export default Card;
