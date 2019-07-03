import React from "react";
import uuidv1 from "uuid/v1";
import { Card, Text, BarContainer, Bar, TextContainer } from "./common";

const BusNSubwayCard = props => {
  const { price, runTime, total, routeType } = props;

  // Render SubwayBar for each route
  console.log(props);
  const renderVehicleBar = (total, runTime) => {
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
          {Math.floor(Number(item.time))}분
        </Bar>
      );
    });
  };

  const renderVehicleIcon = (total, runTime) => {
    return runTime.map(item => {
      let length = Math.floor((Number(item.time) / total) * 100);
      if (length < 24) length = 24;
      length = String(length) + "%";
      return (
        <Bar
          className="haha"
          key={uuidv1()}
          style={{
            width: length
          }}
        >
          <i
            className={item.icon}
            style={{ color: item.color, fontSize: "0.8rem" }}
          >
            {" "}
            {item.type === "도보" ? null : item.type}
          </i>
        </Bar>
      );
    });
  };

  return (
    <Card>
      <TextContainer>
        <Text size="largeFontSize" weight="bold" lineHeight="2rem">
          버스 + 지하철
        </Text>
        <Text weight="normal">
          {Math.floor(total)}분 소요 |{" "}
          {String(Math.floor(price / 1000)) + "," + String(price % 1000)}원 |{" "}
          {routeType}
        </Text>
      </TextContainer>
      <BarContainer style={{ marginBottom: 0 }}>
        {renderVehicleBar(total, runTime)}
      </BarContainer>
      <BarContainer style={{ marginTop: "0.5rem" }}>
        {renderVehicleIcon(total, runTime)}
      </BarContainer>
    </Card>
  );
};

export default BusNSubwayCard;
