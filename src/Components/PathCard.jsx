import React, { Component } from "react";
import styled from "styled-components";
import SubwayCard from "./SubwayCard";
import StationCard from "./StationCard";
import { useData } from "../contexts";
import { Container, Text } from "./common";

const StyledContainer = styled(Container)`
  border-radius: 0.5rem;
  background: white;
`;

const MakchaDetail = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  justify-content: space-between;
`;

const StationAndTime = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  margin-left: 2rem;
`;

const ImageIcon = styled.div`
  flex: 1;
  background: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class PathCard extends Component {
  constructor(props) {
    super(props);
    const { totalTime, price, runTime, lastTime } = props;
    this.state = { totalTime, price, runTime, lastTime };
  }

  renderStartStn() {
    const { runTime } = this.state;
    for (let i = 0; i < runTime.length; i++) {
      if (runTime[i].icon === "fas fa-train") {
        const { color, stationName, lines } = runTime[i];
        return (
          <StationCard
            color={color}
            stationName={stationName}
            lineName={lines[0]}
          />
        );
      }
    }
  }

  render() {
    console.log(this.state);
    const { totalTime, price, runTime, lastTime } = this.state;
    return (
      <StyledContainer style={{ background: "white" }}>
        <MakchaDetail>
          <ImageIcon>지하철</ImageIcon>
          <StationAndTime>
            {this.renderStartStn()}
            <Text size="superLargeFontSize" lineHeight="5rem">
              00:03:15
            </Text>
          </StationAndTime>
        </MakchaDetail>
        <SubwayCard
          totalTime={totalTime}
          price={price}
          runTime={runTime}
          lastTime={lastTime}
        />
      </StyledContainer>
    );
  }
}

export default PathCard;
