import React, { Component } from "react";
import styled from "styled-components";
import { Spin, Icon, Button } from "antd";
import { Link } from "react-router-dom";
import MakchaDetail from "./MakchaDetail";
import DefaultOption from "./DefaultOption";
import { Text, Container } from "./common";
import { makchaApi, dataHandler } from "../api";
import TaxiCard from "./TaxiCard";
import { useData } from "../contexts";
import AddressForm from "./AddressForm";

const ContentContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: center;
  & .anticon-spin {
    position: absolute;
    top: 3rem;
  }
`;

const MakchaContainer = styled.div`
  display: flex;
  flex: 1;
  max-height: 16rem;
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

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { currentPos: { startX: null, startY: null } };
  }

  componentDidMount() {
    const { endLocation } = this.props.data.pos;
    console.log("endlocation", this.props.data.pos);
    if (endLocation) {
      const { endX, endY } = endLocation;
      window.navigator.geolocation.getCurrentPosition(pos => {
        const startX = pos.coords.longitude;
        const startY = pos.coords.latitude;
        this.props.actions.setPos({ endX, endY, startX, startY });
        this.setState({ currentPos: { endX, endY, startX, startY } });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPos.startX !== this.state.currentPos.startX) {
      const { startX, startY } = this.state.currentPos;
      this.getCurrentPosFromGPS(startX, startY);
      this.getData(startY, startX);
      this.props.actions.setPos(this.state.currentPos);
    }
  }

  getData(startY, startX) {
    const { endX, endY } = this.state.currentPos;
    console.log("success");

    makchaApi.getData({ startX, startY, endX, endY }).then(res => {
      const { bus, busNSub, sub, taxi, pushAllow } = dataHandler(res.data);
      this.props.actions.setData({ bus, busNSub, sub, taxi, pushAllow });
      console.log("push", pushAllow);
      this.setState({
        bus,
        busNSub,
        sub,
        taxi,
        pushAllow
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
    localStorage.setItem("endLocation", "");
  }

  renderMain() {
    const {
      currentPos,
      bus,
      sub,
      busNSub,
      taxi,
      pushAllow,
      userToken
    } = this.state;
    if (sub) {
      return (
        <>
          <MakchaContainer>
            <MakchaDetail />
          </MakchaContainer>
          <ContentContainer>
            {/* <OptinList
              taxi={taxi}
              sub={sub}
              defaultSub={defaultSub}
              bus={bus}
              busNSub={busNSub}
            /> */}
            {sub.routeList.length ? (
              <DefaultOption sub={sub} subOnlyList={sub.subOnly.subOnlyList} />
            ) : (
              <TaxiCard taxi={taxi} />
            )}
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
    console.log(this.props);
    // const { taxiInfo, subwayPathOptionList, defaultInfo } = this.state.data;
    // const { currentPos, bus, sub, busNSub, taxi, defaultSub } = this.state;
    return (
      <Container>
        {localStorage.getItem("endLocation") ? (
          this.renderMain()
        ) : (
          <AddressForm />
        )}
      </Container>
    );
  }
}

export default useData(Main);
