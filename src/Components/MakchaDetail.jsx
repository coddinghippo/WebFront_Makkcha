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
  align-items: center;
`;

const TimerContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
            <>
              <InfoContainer>
                {/* 원 막차 위치 */}
                <LineIcon>
                  <LineInner line={line}>{lineChar[line]}</LineInner>
                </LineIcon>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                  }}
                >
                  <Text
                    size="smallFontSize"
                    //  style={{ marginLeft: "0.6rem" }}
                  >
                    {endStationName + " 방향"}
                  </Text>
                  <Text size="largeFontSize" weight="bold">
                    {startStationName + "역"}
                  </Text>
                </div>
              </InfoContainer>
              <Countdown
                value={deadline}
                onFinish={this.onFinish}
                valueStyle={{
                  color: "white",
                  fontSize: fontSize.superLargeFontSize
                }}
              />
            </>
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
