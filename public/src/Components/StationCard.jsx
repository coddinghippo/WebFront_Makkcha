import React from "react";
import styled from "styled-components";
import { fontSize, lineColors, lineChar } from "../Styles/_mixin";
import { Text } from "./common";

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconContainer = styled.div`
  display: flex;
`;

const LineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  background: white;
  margin-right: 1rem;
`;

const LineInner = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 2.4rem;
  background: ${props => props.lineColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const StationCard = props => {
  const { lineColor, lineName, endStationName, startStationName } = props;
  return (
    <InfoContainer>
      <IconContainer>
        <LineIcon>
          <LineInner lineColor={lineColor}>{lineName.slice(0, 1)}</LineInner>
        </LineIcon>
        <StationInfo>
          <Text
            size="smallFontSize"
            //  style={{ marginLeft: "0.6rem" }}
          >
            {endStationName + " 방향"}
          </Text>
          <Text size="largeFontSize" weight="bold">
            {startStationName}
          </Text>
        </StationInfo>
      </IconContainer>
    </InfoContainer>
  );
};

export default StationCard;
