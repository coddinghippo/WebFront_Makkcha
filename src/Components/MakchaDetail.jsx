import React, { Component } from "react";
import styled from "styled-components";
import { Button, Statistic, Icon } from "antd";
import { fontSize, lineColors } from "../Styles/_mixin";
import { Text } from "./common";
import { lineChar } from "../Styles/_mixin";

const { Countdown } = Statistic;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: white;
  flex: inherit;
  max-height: 35vh;
  background: #000033;
`;

const LocContainer = styled.div`
  display: flex;
  flex: 1;
  max-height: 1rem;
`;

const TimerContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center;
`;

const Textcontainer = styled.div`
  display: flex;
  flex-direction: column;
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
            <Icon
              type="environment"
              theme="filled"
              style={{ marginRight: "1rem" }}
            />
            <Text size="normalFontSize">{addr}</Text>
          </LocContainer>

          <TimerContainer>
            <>
              <Textcontainer>
                <Text size="largeFontSize" weight="bold" lineHeight="1.5rem">
                  막차까지
                </Text>
                <Text size="smallFontSize">(현재 위치 기준)</Text>
              </Textcontainer>
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
              onClick={() => window.alert("준비 중입니다")}
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
