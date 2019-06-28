import React, { Component } from "react";
import styled from "styled-components";
import { Spin, Icon, Button } from "antd";
import OptinList from "./OptinList";
import MakchaDetail from "./MakchaDetail";
import { Text, Container } from "./common";
import { makchaApi, dataHandler } from "../api";

const ContentContainer = styled.div`
  display: flex;
  flex: 5;
  justify-content: center;
  & .anticon-spin {
    position: absolute;
    top: 3rem;
  }
`;

const MakchaContainer = styled.div`
  display: flex;
  flex: 2;
`;

const SpinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
  color: #000033;
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
`;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPos: { startX: null, startY: null } };
  }

  componentDidMount() {
    if (localStorage.getItem("loc")) {
      const { endX, endY } = JSON.parse(
        localStorage.getItem("loc")
      ).endLocation;
      this.setState({ currentPos: { ...this.state.currentPos, endX, endY } });
    }

    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      this.setState({
        currentPos: {
          ...this.state.currentPos,
          startX: longitude,
          startY: latitude
        }
      });
      // this.getData(latitude, longitude);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPos.startX !== this.state.currentPos.startX) {
      const { startX, startY } = this.state.currentPos;
      this.getCurrentPosFromGPS(startX, startY);
      this.getData(startY, startX);
    }
  }

  getData(startY, startX) {
    const { endX, endY } = this.state.currentPos;
    console.log("success");

    makchaApi.getData({ startX, startY, endX, endY }).then(res => {
      const { bus, busNSub, defaultSub, sub, taxi } = dataHandler(res.data);
      this.setState({
        bus,
        busNSub,
        defaultSub,
        sub,
        taxi
      });
    });
  }

  getCurrentPosFromGPS(startX, startY) {
    makchaApi.getPosFromGPS(startX, startY).then(res => {
      this.setState({
        currentPos: {
          ...this.state.currentPos,
          addr: res.data.documents[0].address.address_name,
          startX,
          startY
        }
      });
    });
  }

  onButtonPress() {
    localStorage.setItem("loc", "");
    this.props.toggleComponent();
  }

  renderMain() {
    const { currentPos, bus, sub, busNSub, taxi, defaultSub } = this.state;
    if (defaultSub) {
      return (
        <>
          <MakchaContainer>
            <MakchaDetail
              defaultSub={defaultSub}
              addr={currentPos.addr}
              onButtonPress={this.onButtonPress.bind(this)}
            />
          </MakchaContainer>
          <ContentContainer>
            <OptinList
              taxi={taxi}
              sub={sub}
              defaultSub={defaultSub}
              bus={bus}
              busNSub={busNSub}
            />
          </ContentContainer>
        </>
      );
    } else
      return (
        <SpinContainer>
          <Spin indicator={antIcon} />
          <Text size="largeFontSize">경로를 탐색 중입니다...</Text>
          <StyledButton onClick={this.onButtonPress.bind(this)}>
            목적지 다시 입력하기
          </StyledButton>
        </SpinContainer>
      );
  }

  render() {
    // console.log(this.props, this.state);
    // const { taxiInfo, subwayPathOptionList, defaultInfo } = this.state.data;
    // const { currentPos, bus, sub, busNSub, taxi, defaultSub } = this.state;
    return <Container>{this.renderMain()}</Container>;
  }
}
