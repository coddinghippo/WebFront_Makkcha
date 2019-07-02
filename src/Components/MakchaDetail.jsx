import React, { Component } from "react";
import styled from "styled-components";
import { Button, Statistic, Icon } from "antd";
import { fontSize, lineColors, lineChar } from "../Styles/_mixin";
import { Text } from "./common";
import StationCard from "./StationCard";

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

const StyledButton = styled(Button)`
  color: white;
  width: 60%;
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

    const { defaultSub, addr } = props;
    this.state = {
      defaultSub,
      remain: defaultSub.remain,
      addr
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.defaultInfo !== this.props.defaultInfo ||
      prevProps.addr !== this.props.addr
    ) {
      const { defaultSub, addr } = this.props;
      this.setState({ defaultSub, addr, remain: defaultSub.remain });
    }
  }

  onFinish() {
    console.log(`Finished`);
  }

  renderDetail() {
    const { defaultSub, remain, addr } = this.state;
    const deadline = Date.now() + 1000 * remain;

    if (remain) {
      const {
        startStationName,
        line,
        endStationName
      } = defaultSub.pathStationList[0];

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
                line={line}
                endStationName={endStationName}
                startStationName={startStationName}
              />
              <VerticalLine />
              <StationCard
                line="2"
                endStationName={endStationName}
                startStationName={startStationName}
              />
            </StationCardContainer>
            <CountdownContainer>
              <Countdown
                value={deadline}
                onFinish={this.onFinish}
                valueStyle={{
                  color: "white",
                  fontSize: fontSize.superLargeFontSize,
                  lineHeight: 1
                }}
              />
              <StyledButton
                type="ghost"
                shape="round"
                onClick={this.props.onButtonPress}
              >
                목적지 재설정
              </StyledButton>
            </CountdownContainer>
          </TimerContainer>

          {/* <TextContainer>
            <Text size="largeFontSize" weight="bold" lineHeight="1.5rem">
              막차
            </Text>

            <StyledButton
              type="ghost"
              shape="round"
              onClick={this.props.onButtonPress}
            >
              목적지 재설정
            </StyledButton>
          </TextContainer> */}
        </>
      );
    } else return null;
  }

  render() {
    return <Container>{this.renderDetail()}</Container>;
  }
}
