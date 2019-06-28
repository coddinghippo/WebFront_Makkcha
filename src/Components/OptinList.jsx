import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { fontSize } from "../Styles/_mixin";
import { Container } from "./common";
import TaxiCard from "./TaxiCard";
import SubwayCard from "./SubwayCard";
import BusNSubwayCard from "./BusNSubWayCard";

const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: space-around;
  width: 100%;
  bottom: 0;
  padding: 1.3rem;
`;

const Option = styled.div`
  margin-bottom: 5rem;
  // &:first-of-type {
  //   border-bottom: 3rem solid grey;
  // }
`;

// const ResetButton = styled(Button)`
//   // width: 90%;
//   height: 3rem;
//   color: white;
//   background: #000033;
//   border-radius: 1.5rem;
//   margin-bottom: 1.3rem;
//   backgrouncolor: #000;
//   font-weight: bold;
//   font-size: ${fontSize.largeFontSize};
// `;

const StyledButton = styled(Button)`
  height: 3rem;
  background: #000033;
`;

export default class OptinList extends Component {
  constructor(props) {
    super(props);
    const { taxi, sub, defaultSub, busNSub, bus } = this.props;

    this.state = {
      taxi,
      sub,
      bus,
      busNSub,
      defaultSub
    };
  }

  // Render Bus and Subway Routes
  renderBusNSubwayRoutes() {
    const { busNSub } = this.state;
    const { routes } = busNSub;
    let routeType = "최소 시간 기준";
    if (routes) {
      return routes.map((item, idx) => {
        const { runTime, distance, price, totalTime } = item;
        if (idx === 1) routeType = "최소 환승 기준";
        return (
          <BusNSubwayCard
            key={idx}
            distance={distance}
            total={totalTime}
            price={price}
            routeType={routeType}
            runTime={runTime}
          />
        );
      });
    }
  }

  // Render All SubwayRoutes
  renderSubwayRoutes() {
    const { sub, defaultSub } = this.state;
    const { routes, walkInfo } = sub;

    if (routes[0].runTime.length) {
      return routes.map((route, idx) => {
        const { total, price, runTime } = route;
        return (
          <SubwayCard
            key={idx}
            defaultSub={defaultSub}
            walkInfo={walkInfo}
            total={total}
            price={price}
            runTime={runTime}
          />
        );
      });
    } else return null;
  }

  render() {
    const { taxi } = this.state;
    return (
      <Container>
        <Option>
          {this.renderSubwayRoutes()}
          <TaxiCard taxi={taxi} />
          {this.renderBusNSubwayRoutes()}
        </Option>
        <ButtonContainer>
          <StyledButton
            type="primary"
            shape="round"
            size="large"
            block={true}
            onClick={() => {}}
          >
            피드백 하기
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}
