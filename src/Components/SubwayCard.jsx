import React from "react";
import uuidv1 from "uuid/v1";
import { lineColors } from "../Styles/_mixin";
import { Card, Text, BarContainer, Bar, TextContainer } from "./common";

const SubwayCard = props => {
  const { defaultSub, walkInfo, total, price, runTime } = props;

  // Render SubwayBar for each route
  const renderEachSubwayBar = (total, runTime) => {
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
          {item.type === "도보" ? "도보" : null}
          {Math.floor(Number(item.time) / 60)}분
        </Bar>
      );
    });
  };

  return (
    <Card>
      <TextContainer>
        <Text weight="bold" lineHeight="2rem">
          지하철 {Math.floor(total / 60)}분
        </Text>
        <Text weight="normal">
          {String(Math.floor(price / 1000)) + "," + String(price % 1000)}원 |
          막차 {defaultSub.lastTime.slice(0, 5)} | 도보 {walkInfo.time}분
        </Text>
      </TextContainer>
      <BarContainer className="nana" style={{ marginBottom: 0 }}>
        {renderEachSubwayBar(total, runTime)}
      </BarContainer>
      <BarContainer style={{ marginTop: 0 }} />
    </Card>
  );
};

export default SubwayCard;
