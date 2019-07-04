import React, { Component } from "react";
import styled from "styled-components";
import { Timeline } from "antd";
import { lineColors, lineChar } from "../Styles/_mixin";
import SubwayCard from "./SubwayCard";
import { Container } from "./common";

const Item = styled(Timeline.Item)`
  margin-left: 2rem;
`;

const SubwayContainer = styled.div``;

const TimelineContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  & li {
    margin-top: 1rem;
    & p {
      margin-left: 1rem;
    }
  }
`;

const LineInner = styled.div`
  color: ${props => props.color};
  width: ${props => (props.type === "도보" ? "1rem" : "2rem")};
  height: ${props => (props.type === "도보" ? "1rem" : "2rem")};
  border-radius: ${props => (props.type === "도보" ? "1rem" : "2rem")};
  border: 2px solid ${props => props.color};
  background: white;
  // margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
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
            <LineInner color={route.color} type={route.type}>
              {route.type === "도보" ? null : route.type.slice(0, 1)}
            </LineInner>
          }
        >
          <p>
            {route.stationName ? route.stationName + " | " : null}
            {route.time}분 소요
          </p>
        </Item>
      );
    });
  }

  render() {
    return (
      <Container>
        <SubwayContainer>{this.renderSubwayRoutes()}</SubwayContainer>
        <TimelineContainer>
          <Timeline>{this.renderTimeline()}</Timeline>
        </TimelineContainer>
      </Container>
    );
  }
}

export default DefaultOption;
