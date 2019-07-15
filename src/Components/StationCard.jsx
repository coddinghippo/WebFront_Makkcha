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
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 2.4rem;
  margin-right: 1rem;
  background: ${props => props.lineColor};
`;

const LineInner = styled.div`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 2rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.lineColor};
`;

const StationInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const StationCard = props => {
  const { color, stationName, lineName } = props;
  return (
    <InfoContainer>
      <IconContainer>
        <LineIcon lineColor={color}>
          <LineInner lineColor={color}>{lineName.slice(0, 1)}</LineInner>
        </LineIcon>

        <StationInfo>
          {/* <Text
            size="smallFontSize"
            //  style={{ marginLeft: "0.6rem" }}
          >
            {endStationName + " 방향"}
          </Text> */}
          <Text size="largeFontSize" weight="bold">
            {stationName}
          </Text>
        </StationInfo>
      </IconContainer>
    </InfoContainer>
  );
};

export default StationCard;
