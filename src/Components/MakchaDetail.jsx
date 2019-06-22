import React from "react";
import styled from "styled-components";
import { Text } from "./common";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  color: white;
  flex: inherit;
  background: #000033;
`;

const LocContainer = styled.div`
  display: flex;
  flex: 1;
`;

const TimerContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
`;

const MakchaDetail = props => {
  let { pathList, addr } = props;
  if (!pathList) pathList = [];
  return (
    <Container>
      <LocContainer>
        <Text size="normalFontSize">{addr}</Text>
      </LocContainer>
      <TimerContainer>
        <Text size="largeFontSize" weight="bold">
          막차까지
        </Text>
        <Text size="extraLargeFontSize" weight="bold">
          {pathList.length
            ? pathList[0].route.lastTimeList[0].lastTimeDay.slice(0, 5)
            : "준비중입니다"}
        </Text>
      </TimerContainer>
      <InfoContainer>
        <Text size="largeFontSize" weight="bold">
          선릉역
        </Text>
      </InfoContainer>
    </Container>
  );
};

export default MakchaDetail;
