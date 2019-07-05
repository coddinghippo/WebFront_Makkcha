import React, { Component } from "react";
import styled from "styled-components";
import { Timeline } from "antd";
import SubwayCard from "./SubwayCard";
import { Container, Text } from "./common";
import { fontSize } from "../Styles/_mixin";

const Item = styled(Timeline.Item)`
  margin-left: 2rem;
`;

const SubwayContainer = styled.div``;

const TimelineContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: stretch;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  & li {
    height: 100%;
    & p {
      margin-left: 1rem;
    }
  }
  & .ant-timeline-item-last {
    height: 0;
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

const TextContainer = styled.div`
  display: flex;
`;

class DefaultOption extends Component {
  constructor(props) {
    super(props);
    const { sub, subOnlyList } = this.props;
    this.state = { sub, subOnlyList };
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
    const { sub, subOnlyList } = this.state;
    console.log(`sub`);
    console.log(sub);
    const { runTime } = sub.routes[0];

    const lastTransfer = runTime[runTime.length - 1];
    const lastStationName = subOnlyList[subOnlyList.length - 1].displayName;
    const routes = runTime.slice();

    routes.push({
      ...lastTransfer,
      stationName: lastStationName
    });

    return routes.map((route, idx) => {
      return route.type !== "도보" ? (
        <Item
          key={idx}
          dot={
            <LineInner color={route.color} type={route.type}>
              {route.type === "도보" ? null : route.type.slice(0, 1)}
            </LineInner>
          }
        >
          {" "}
          <TextContainer>
            <Text size={fontSize.largeFontSize} weight="bold">
              {route.stationName}
            </Text>
            <Text>
              {routes[idx - 1].type !== route.type && idx !== 1
                ? `${route.type} 환승`
                : null}
            </Text>
          </TextContainer>
          {/* <p>
            {route.stationName ? route.stationName + " | " : null}
            {route.time}분 소요
          </p> */}
        </Item>
      ) : null;
    });
  }

  render() {
    return (
      <Container>
        <SubwayContainer>{this.renderSubwayRoutes()}</SubwayContainer>
        <TimelineContainer>
          <Timeline
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            {this.renderTimeline()}
          </Timeline>
        </TimelineContainer>
      </Container>
    );
  }
}

export default DefaultOption;
