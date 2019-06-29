import React from "react";
import uuidv1 from "uuid/v1";
import { lineColors } from "../Styles/_mixin";
import { Card, Text, BarContainer, Bar, TextContainer } from "./common";

const SubwayCard = props => {
  const { defaultSub, walkInfo, total, price, runTime } = props;

  // Render SubwayBar for each route
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
            backgroundColor: lineColors[item.type],
            color: "white"
          }}
        >
          {Math.floor(Number(item.time) / 60)}분
        </Bar>
      );
    });
  };

  const renderVehicleIcon = (total, runTime) => {
    return runTime.map(item => {
      let length = Math.floor((Number(item.time) / total) * 100);
      let icon = "fas fa-train";
      if (length < 24) length = 24;

      length = String(length) + "%";
      if (item.type === "도보") icon = "fas fa-walking";

      return (
        <Bar
          className="haha"
          key={uuidv1()}
          style={{
            width: length
          }}
        >
          <i
            className={icon}
            style={{ color: lineColors[item.type], fontSize: "0.8rem" }}
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
          지하철
        </Text>
        <Text weight="normal">
          {Math.floor(total / 60)}분 소요 |{" "}
          {String(Math.floor(price / 1000)) + "," + String(price % 1000)}원 |
          막차 {defaultSub.lastTime.slice(0, 5)} | 도보 {walkInfo.time}분
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

export default SubwayCard;
