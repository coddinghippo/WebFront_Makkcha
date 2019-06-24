import React, { Component } from "react";
import styled from "styled-components";
import { Spin, Icon, Button } from "antd";
import OptinList from "./OptinList";
import MakchaDetail from "./MakchaDetail";
import { Text, Container } from "./common";
import { makchaApi } from "../api";

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
  // max-height: 10rem;
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
    this.state = {
      endX: 126.91509963231,
      endY: 37.568565387939,
      currentAddr: "확인중...",
      startX: "",
      startY: "",
      data: {
        taxiInfo: {},
        subwayPathOptionList: { routeList: [] },
        defaultInfo: {}
      }
    };
  }

  componentDidMount() {
    if (localStorage.getItem("loc")) {
      const { endX, endY } = JSON.parse(
        localStorage.getItem("loc")
      ).endLocation;
      this.setState({ endX, endY });
    }
    // // Json-server Option
    // this.getTrainData(0, 0);

    // Original
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      this.setState({ startX: longitude, startY: latitude });
      this.getData(latitude, longitude);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startX !== this.state.startX) {
      const { startX, startY } = this.state;
      this.getData(startY, startX);
      this.getCurrentPosFromGPS(startX, startY);
    }
  }

  getData(startY, startX) {
    const { endX, endY } = this.state;

    makchaApi.getData({ startX, startY, endX, endY }).then(res =>
      this.setState({
        data: {
          ...res.data,
          defaultInfo: res.data.subwayPathOptionList.routeList[0] || {}
        }
      })
    );
  }

  getCurrentPosFromGPS(x, y) {
    makchaApi.getPosFromGPS(x, y).then(res => {
      this.setState({
        currentAddr: res.data.documents[0].address.address_name
      });
    });
  }

  onButtonPress() {
    localStorage.setItem("loc", "");
    this.props.toggleComponent();
  }

  render() {
    const { taxiInfo, subwayPathOptionList, defaultInfo } = this.state.data;
    const { currentAddr } = this.state;
    return (
      <Container>
        <MakchaContainer>
          <MakchaDetail defaultInfo={defaultInfo} addr={currentAddr} />
        </MakchaContainer>
        <ContentContainer>
          {subwayPathOptionList.routeList.length ? (
            <OptinList
              taxiInfo={taxiInfo}
              subwayPathOptionList={subwayPathOptionList}
              defaultInfo={subwayPathOptionList.routeList[0]}
              data={this.state.data}
              onButtonPress={this.onButtonPress.bind(this)}
            />
          ) : (
            <SpinContainer>
              <Spin indicator={antIcon} />
              <Text size="largeFontSize">경로를 탐색 중입니다...</Text>
              <StyledButton onClick={this.onButtonPress.bind(this)}>
                목적지 다시 입력하기
              </StyledButton>
            </SpinContainer>
          )}
        </ContentContainer>
      </Container>
    );
  }
}
