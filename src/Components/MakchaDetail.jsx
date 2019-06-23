import React, { Component } from "react";
import styled from "styled-components";
import { Button, Statistic, Icon } from "antd";
import { fontSize, lineColors } from "../Styles/_mixin";
import { lineChar, Text } from "./common";

const { Countdown } = Statistic;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: white;
  flex: inherit;
  background: #000033;
`;

const LocContainer = styled.div`
  display: flex;
  flex: 1;
`;

const TimerContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
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
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 2.4rem;
  background: ${props => lineColors[props.line]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  color: white;
  position: absolute;
  right: 1rem;
`;

export default class MakchaDetail extends Component {
  constructor(props) {
    super(props);
    const { defaultInfo, addr } = props;
    this.state = {
      defaultInfo,
      remain: defaultInfo.remain || 0,
      addr
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.defaultInfo !== this.props.defaultInfo ||
      prevProps.addr !== this.props.addr
    ) {
      const { defaultInfo, addr } = this.props;
      this.setState({ defaultInfo, addr, remain: defaultInfo.remain });
    }
  }

  onFinish() {
    console.log(`Finished`);
  }

  renderDetail() {
    const { defaultInfo, remain, addr } = this.state;
    const deadline = Date.now() + 1000 * remain;

    if (remain) {
      const {
        startStationName,
        line,
        endStationName
      } = defaultInfo.pathStationList[0];

      return (
        <>
          <LocContainer>
            <Icon
              type="environment"
              theme="filled"
              style={{ marginRight: "1rem" }}
            />
            <Text size="normalFontSize">{addr}</Text>
          </LocContainer>

          <TimerContainer>
            <>
              <Text size="largeFontSize" weight="bold">
                막차까지
              </Text>
              <Countdown
                value={deadline}
                onFinish={this.onFinish}
                valueStyle={{
                  color: "white",
                  fontSize: fontSize.extraLargeFontSize
                }}
              />
            </>
          </TimerContainer>

          <InfoContainer>
            <LineIcon>
              <LineInner line={line}>{lineChar[line]}</LineInner>
            </LineIcon>
            <Text size="largeFontSize" weight="bold">
              {startStationName + "역"}
            </Text>
            <Text size="smallFontSize" style={{ marginLeft: "0.6rem" }}>
              {endStationName + " 방향"}
            </Text>

            <StyledButton
              type="ghost"
              shape="round"
              onClick={() => window.alert("알림을 설정했습니다")}
            >
              알림 받기
            </StyledButton>
          </InfoContainer>
        </>
      );
    } else return null;
  }

  render() {
    return <Container>{this.renderDetail()}</Container>;
  }
}
