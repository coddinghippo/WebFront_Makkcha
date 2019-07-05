import React, { Component } from "react";
import styled from "styled-components";
import { Button, Statistic, Icon } from "antd";
import { fontSize, lineColors, lineChar } from "../Styles/_mixin";
import { Text } from "./common";
import StationCard from "./StationCard";
import { makchaApi } from "../api";
import { askForPermissioToReceiveNotifications } from "../push-notification";

const { Countdown } = Statistic;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
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
  flex: 4;
  padding-top: 2rem;
  padding-bottom: 1.5rem;
  justify-content: space-between;
  align-items: center;
`;

const StationCardContainer = styled.div`
  height: 100%;
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  justify-content: space-between;
`;

const CountdownContainer = styled(StationCardContainer)`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  align-items: flex-end;
  justify-content: space-between;
`;

const VerticalLine = styled.div`
  margin-left: 1.5rem;
  width: 10px;
  height: 16%;
  border-left: 2px dotted #fff;
`;

const StyledButton = styled.button`
  color: ${props => (props.pushAllow ? "#1890ff" : "white")};
  padding: 0.5rem;
  background: #000033;
  font-size: ${fontSize.smallFontSize};
  width: 5rem;
  border: ${props =>
    props.pushAllow ? "1px solid #1890ff" : "1px solid white"};
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

    const { sub, addr, pushAllow } = props;
    this.state = {
      sub,
      remain: sub.routeList[0].remain,
      addr,
      pushAllow
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

  onDestinationButtonClick() {
    const userToken = localStorage.getItem("userToken");

    if (this.state.pushAllow) makchaApi.disallowPush(userToken);
    localStorage.setItem("loc", "");
    localStorage.setItem("userToken", "");
    this.setState({ pushAllow: false });
    this.props.toggleComponent();
  }

  onPushButtonClick() {
    // When user allows push
    const userToken = localStorage.getItem("userToken");
    if (!this.state.pushAllow) {
      const userToken = localStorage.getItem("userToken");
      const { sub } = this.props;
      let formData = new FormData();

      formData.append("lastSub", sub.routeList[0].lastTime);

      if (!userToken) {
        askForPermissioToReceiveNotifications().then(userToken => {
          if (userToken !== null && userToken !== undefined) {
            localStorage.setItem("userToken", userToken);
          }
          makchaApi.allowPush(formData, userToken);
          this.setState({ pushAllow: !this.state.pushAllow });
        });
      } else {
        makchaApi.allowPush(formData, userToken);
        this.setState({ pushAllow: !this.state.pushAllow });
      }
    }

    // When user disallows push
    else {
      makchaApi.disallowPush(userToken);
      localStorage.setItem("userToken", "");
      this.setState({ pushAllow: !this.state.pushAllow });
    }
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
              <div>
                <Text size="largeFontSize">막차까지</Text>
                <Text size="smallFontSize">(현재 위치 기준)</Text>
              </div>
              <StationCard
                lineColor={lineList[0].lineColor}
                lineName={lineList[0].lineName}
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
              <div style={{ display: "flex" }}>
                <StyledButton
                  onClick={() => this.onDestinationButtonClick()}
                  pushAllow={false}
                >
                  <i className="fas fa-home" />
                  {startStation}
                </StyledButton>
                <StyledButton
                  onClick={() => this.onPushButtonClick()}
                  pushAllow={this.state.pushAllow}
                >
                  푸시 알림
                </StyledButton>
              </div>
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
