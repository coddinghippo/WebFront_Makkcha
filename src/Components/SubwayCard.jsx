import React from "react";
import uuidv1 from "uuid/v1";
import { lineColors } from "../Styles/_mixin";
import { Card, Text, BarContainer, Bar, TextContainer } from "./common";

const SubwayCard = props => {
  const { totalTime, price, runTime, lastTime } = props;
  console.log("props");
  console.log(props);

  // Render SubwayBar for each route
  const renderVehicleBar = (totalTime, runTime) => {
    return runTime.map(item => {
      let length = Math.floor((Number(item.time) / totalTime) * 100);
      if (length < 24 && item.type !== "도보") length = 24;
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
          {item.type !== "도보" ? `${item.time}분` : null}
        </Bar>
      );
    });
  };

  const renderVehicleIcon = (totalTime, runTime) => {
    return runTime.map(item => {
      let length = Math.floor((Number(item.time) / totalTime) * 100);
      let icon = "fas fa-train";
      if (length < 24 && item.type !== "도보") length = 24;

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
          <span>막차 {lastTime.slice(0, 5)}</span> | {totalTime}분 소요
          {/* {String(Math.floor(price / 1000)) + "," + String(price % 1000)}원 |
          도보? */}
        </Text>
      </TextContainer>
      <BarContainer style={{ marginBottom: 0 }}>
        {renderVehicleBar(totalTime, runTime)}
      </BarContainer>
      <BarContainer style={{ marginTop: "0.5rem" }}>
        {renderVehicleIcon(totalTime, runTime)}
      </BarContainer>
    </Card>
  );
};

export default SubwayCard;
