import React from "react";
import { Card, Text, BarContainer, Bar, TextContainer } from "./common";

const TaxiCard = props => {
  const { taxi } = props;

  return (
    <Card>
      <TextContainer>
        <Text weight="bold" lineHeight="2rem">
          택시 {taxi.time}분
        </Text>
        <Text>
          {(taxi.distance / 1000).toFixed(1)}km | 약{" "}
          {String(Math.floor(taxi.price / 1000)) +
            "," +
            String(taxi.price % 1000)}
          원
        </Text>
      </TextContainer>
      <BarContainer>
        <Bar
          style={{
            width: "100%",
            backgroundColor: "#ffd300",
            color: "white"
          }}
        >
          {taxi.time}분
        </Bar>
      </BarContainer>
    </Card>
  );
};

export default TaxiCard;
