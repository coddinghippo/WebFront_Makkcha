import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import { fontSize } from "../Styles/_mixin";
import { Container } from "./common";
import TaxiCard from "./TaxiCard";
import SubwayCard from "./SubwayCard";

const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  width: 100%;
  bottom: 0;
`;

const StyledButton = styled(Button)`
  width: 90%;
  height: 3rem;
  color: white;
  background: #000033;
  border-radius: 1.5rem;
  margin-bottom: 1.3rem;
  backgrouncolor: #000;
  font-weight: bold;
  font-size: ${fontSize.largeFontSize};
`;

export default class OptinList extends Component {
  constructor(props) {
    super(props);
    const { taxiInfo, subwayPathOptionList, defaultInfo } = this.props;
    this.state = {
      taxiInfo,
      subwayPathOptionList,
      defaultInfo,
      subwayRoutes: [{ total: 0, runTime: [] }],
      walkInfo: { time: 0 }
    };
  }

  componentDidMount() {
    const { taxiInfo, subwayPathOptionList } = this.props.data;
    const { walkInfo } = this.state.subwayPathOptionList;

    this.setSubwayRouteInfo();

    this.setState({ taxiInfo, subwayPathOptionList, walkInfo });
  }

  // Set Subway routes info
  setSubwayRouteInfo() {
    const { routeList } = this.state.subwayPathOptionList;
    const subwayRoutes = [];
    const { walkInfo } = this.state.subwayPathOptionList;
    for (let idx = 0; idx < routeList.length; idx++) {
      let {
        pathStationList,
        distance,
        price
      } = this.state.subwayPathOptionList.routeList[Number(idx)];
      let runTimeArr = [{ line: "도보", time: walkInfo.time * 60 }];

      // store sum of runTime for each line
      let cum = 0;
      pathStationList.map(item => {
        let time = item.runTime;
        let line = item.line;
        if (time !== null) {
          time = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3));
          cum += time;
          return null;
        } else {
          runTimeArr.push({ line, time: cum });
          cum = 0;
          return null;
        }
      });

      runTimeArr.push({
        line: pathStationList[pathStationList.length - 1].line,
        time: cum
      });

      let total = runTimeArr.reduce((a, x) => {
        return a + x.time;
      }, 0);
      total += walkInfo.time;

      subwayRoutes.push({ runTime: runTimeArr, total, distance, price });
    }
    this.setState({ subwayRoutes });
  }

  // Render All SubwayRoutes
  renderSubwayRoutes() {
    const { subwayRoutes, defaultInfo, walkInfo } = this.state;
    if (subwayRoutes[0].runTime.length) {
      return subwayRoutes.map((route, idx) => {
        const { total, price, runTime } = route;
        return (
          <SubwayCard
            key={idx}
            defaultInfo={defaultInfo}
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
    const { taxiInfo } = this.state;
    return (
      <Container>
        {this.renderSubwayRoutes()}
        <TaxiCard taxiInfo={taxiInfo} />

        <ButtonContainer>
          <StyledButton size="large" onClick={this.props.onButtonPress}>
            목적지 재설정
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}
