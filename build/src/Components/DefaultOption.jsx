import React, { Component } from "react";
import styled from "styled-components";
import { Timeline } from "antd";
import { lineColors, lineChar } from "../Styles/_mixin";
import SubwayCard from "./SubwayCard";
import { Container } from "./common";

const Item = styled(Timeline.Item)`
  margin: 2rem;
`;

const TimelineContainer = styled.div`
  padding: 1rem;
`;

const LineIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  background: ${props => props.color};
  margin-right: 1rem;
`;

const LineInner = styled.div`
  color: ${props => props.color};
  width: 2rem;
  height: 2rem;
  border-radius: 2.4rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class DefaultOption extends Component {
  constructor(props) {
    super(props);
    const { sub } = this.props;
    this.state = { sub };
  }

  renderSubwayRoutes() {
    const { sub } = this.state;
    const { routes, routeList, subOnly } = sub;

    if (routes[0].runTime.length) {
      const { totalTime, price, runTime } = routes[0];
      return (
        <SubwayCard
          totalTime={totalTime}
          price={price}
          runTime={runTime}
          lastTime={routeList[0].lastTime}
        />
      );
    } else return null;
  }

  renderTimeline() {
    const { sub } = this.state;
    console.log(`sub`);
    console.log(sub);
    const { runTime } = sub.routes[0];
    return runTime.map((route, idx) => {
      return (
        <Item
          key={idx}
          dot={
            <LineIcon color={route.color}>
              <LineInner color={route.color}>
                {route.type === "도보" ? "도보" : route.type.slice(0, 1)}
              </LineInner>
            </LineIcon>
          }
        >
          <span>{route.stationName ? route.stationName + " | " : null}</span>
          <span>{route.time}분 소요</span>
        </Item>
      );
    });
  }

  render() {
    return (
      <Container>
        {this.renderSubwayRoutes()}
        <TimelineContainer>
          <Timeline>{this.renderTimeline()}</Timeline>
        </TimelineContainer>
      </Container>
    );
  }
}

export default DefaultOption;
