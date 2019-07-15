import React, { Component } from "react";
import styled from "styled-components";
import SubwayCard from "./SubwayCard";
import StationCard from "./StationCard";
import { useData } from "../contexts";
import { Container, Text } from "./common";

const MakchaDetail = styled.div`
  padding: 1rem;
  width: 100%;
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
      <Container>
        <MakchaDetail>
          {this.renderStartStn()}
          <Text size="extraLargeFontSize">00:03:15</Text>
        </MakchaDetail>
        <SubwayCard
          totalTime={totalTime}
          price={price}
          runTime={runTime}
          lastTime={lastTime}
        />
      </Container>
    );
  }
}

export default PathCard;
