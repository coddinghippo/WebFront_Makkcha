import React, { Component } from "react";
import styled from "styled-components";
import { Statistic } from "antd";
import { Text } from "./common";

const { Countdown } = Statistic;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
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
`;

export default class MakchaDetail extends Component {
  constructor(props) {
    super(props);
    const { defaultInfo, addr } = props;
    this.state = {
      defaultInfo,
      remain: defaultInfo.reamin || null,
      addr
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.defaultInfo !== this.props.defaultInfo) {
      const { defaultInfo, addr } = this.props;
      this.setState({ defaultInfo, addr, remain: defaultInfo.remain });
    }
  }

  onFinish() {
    console.log(`Finished`);
  }

  render() {
    const { remain, addr } = this.state;
    console.log(remain);
    const deadline = Date.now() + 1000 * remain;
    return (
      <Container>
        <LocContainer>
          <Text size="normalFontSize">{addr}</Text>
        </LocContainer>
        <TimerContainer>
          <Text size="largeFontSize" weight="bold">
            막차까지
          </Text>
          <div>
            {remain ? (
              <Countdown
                title="Countdown"
                value={deadline}
                onFinish={this.onFinish}
                valueStyle={{ color: "white" }}
              />
            ) : (
              <p>준비중입니다</p>
            )}
          </div>
        </TimerContainer>
        <InfoContainer>
          <Text size="largeFontSize" weight="bold">
            {/* {defaultInfo.length
            ? defaultInfo.[0].startStationName
            : "준비중"} */}
          </Text>
        </InfoContainer>
      </Container>
    );
  }
}
