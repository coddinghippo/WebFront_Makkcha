import React, { Component } from "react";
import styled from "styled-components";
import { Button, Statistic, Icon } from "antd";
import { fontSize, lineColors, lineChar } from "../Styles/_mixin";
import { Text } from "./common";
import StationCard from "./StationCard";
import { askForPermissioToReceiveNotifications } from "../push-notification";

const { Countdown } = Statistic;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-bottom: 0;
  color: white;
  flex: inherit;
  max-height: 35vh;
  background: #000033;
`;

const LocContainer = styled.div`
  display: flex;
  flex: 1;
  max-height: 1rem;
  align-items: center;
`;

const TimerContainer = styled.div`
  display: flex;
  flex: 3;
  justify-content: space-between;
  align-items: center;
`;

const StationCardContainer = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CountdownContainer = styled(StationCardContainer)`
  align-items: flex-end;
`;

const VerticalLine = styled.div`
  margin-left: 1.5rem;
  width: 10px;
  height: 16%;
  border-left: 2px dotted #fff;
`;

const StyledButton = styled.button`
  color: ${props => (props.toggle ? "#1890ff" : "white")};
  padding: 0.5rem;
  background: #000033;
  width: 60%;
  border: ${props => (props.toggle ? "1px solid #1890ff" : "1px solid white")};
  border-radius: 2rem;
`;

const NowButton = styled.div`
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  height: 1.5rem;
  width: 5rem;
  font-size: 0.8rem;
  margin-right: 0.7rem;
`;

export default class MakchaDetail extends Component {
  constructor(props) {
    super(props);

    const { sub, addr } = props;
    this.state = {
      sub,
      remain: sub.routeList[0].remain,
      addr,
      toggle: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.sub !== this.props.sub ||
      prevProps.addr !== this.props.addr
    ) {
      const { addr, sub } = this.props;
      const { remain } = sub.routeList[0];
      this.setState({ addr, remain });
    }
  }

  onPushButtonClick() {
    askForPermissioToReceiveNotifications();
    this.setState({ toggle: !this.state.toggle });
  }

  onFinish() {
    console.log(`Finished`);
  }

  renderDetail() {
    const { remain, addr, sub } = this.state;
    const { subOnly } = sub;
    const deadline = Date.now() + 1000 * remain;
    const { subOnlyList, lineList } = subOnly;

    if (remain) {
      const startStation = subOnlyList[0].displayName;
      const endStation = subOnlyList[1].displayName;

      return (
        <>
          <LocContainer>
            <NowButton>
              <Icon
                type="environment"
                theme="filled"
                style={{ marginRight: "0.3rem" }}
              />
              현위치
            </NowButton>
            <Text size="normalFontSize"> {addr}</Text>
          </LocContainer>

          <TimerContainer>
            <StationCardContainer>
              <StationCard
                lineColor={lineList[0].lineColor}
                lineName={lineList[0].lineName}
                endStationName={endStation}
                startStationName={startStation}
              />
              <VerticalLine />
              <StationCard
                lineColor={lineList[lineList.length - 1].lineColor}
                lineName={lineList[lineList.length - 1].lineName}
                endStationName={endStation}
                startStationName={startStation}
              />
            </StationCardContainer>
            <CountdownContainer>
              <Countdown
                value={deadline}
                onFinish={this.onFinish}
                valueStyle={{
                  color: "white",
                  fontSize: fontSize.superLargeFontSize,
                  // fontSize: "2.4rem",
                  lineHeight: 1
                }}
                // format="H시간 m분 ss초"
              />

              <StyledButton
                onClick={() => this.onPushButtonClick()}
                toggle={this.state.toggle}
              >
                푸시 알림
              </StyledButton>
            </CountdownContainer>
          </TimerContainer>
        </>
      );
    } else return null;
  }

  render() {
    return <Container>{this.renderDetail()}</Container>;
  }
}
