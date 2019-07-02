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
  background: white;
  margin-right: 1rem;
`;

const LineInner = styled.div`
  color: white;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 2.4rem;
  background: ${props => lineColors[props.line]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

class DefaultOption extends Component {
  constructor(props) {
    super(props);
    const { sub, defaultSub } = this.props;
    this.state = { sub, defaultSub };
  }

  renderSubwayRoutes() {
    const { sub, defaultSub } = this.state;
    const { routes, walkInfo } = sub;

    if (routes[0].runTime.length) {
      const { total, price, runTime } = routes[0];
      return (
        <SubwayCard
          defaultSub={defaultSub}
          walkInfo={walkInfo}
          total={total}
          price={price}
          runTime={runTime}
        />
      );
    } else return null;
  }

  renderTimeline() {
    const { sub, defaultSub } = this.state;
    const { runTime } = sub.routes[0];
    return runTime.map((route, idx) => {
      return (
        <Item
          key={idx}
          color={lineColors[route.type]}
          dot={
            <LineIcon>
              <LineInner line={route.type}>{lineChar[route.type]}</LineInner>
            </LineIcon>
          }
        >
          {route.type}
        </Item>
      );
    });
  }

  render() {
    console.log(this.props);
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
