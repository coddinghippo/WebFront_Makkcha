import React from "react";
import uuidv1 from "uuid/v1";
import { Card, Text, BarContainer, Bar, TextContainer } from "./common";

const BusNSubwayCard = props => {
  const { price, runTime, total, routeType } = props;

  // Render SubwayBar for each route
  console.log(props);
  const renderEachBar = (total, runTime) => {
    return runTime.map(item => {
      let length = Math.floor((Number(item.time) / total) * 100);
      if (length < 24) length = 24;
      length = String(length) + "%";
      return (
        <Bar
          className="haha"
          key={uuidv1()}
          style={{
            width: length,
            backgroundColor: item.color,
            color: "white"
          }}
        >
          {item.type === "도보" ? "도보" : null}
          {Math.floor(Number(item.time))}분
        </Bar>
      );
    });
  };

  return (
    <Card>
      <TextContainer>
        <Text weight="bold" lineHeight="2rem">
          버스 + 지하철 {Math.floor(total)}분
        </Text>
        <Text weight="normal">
          {String(Math.floor(price / 1000)) + "," + String(price % 1000)}원 |{" "}
          {routeType}
        </Text>
      </TextContainer>
      <BarContainer className="nana" style={{ marginBottom: 0 }}>
        {renderEachBar(total, runTime)}
      </BarContainer>
      <BarContainer style={{ marginTop: 0 }} />
    </Card>
  );
};

export default BusNSubwayCard;
