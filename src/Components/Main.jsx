import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Spin, Icon } from "antd";
import OptinList from "./OptinList";
import MakchaDetail from "./MakchaDetail";
import keys from "../config/keys";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContentContainer = styled.div`
  flex: 10;
  display: flex;
  justify-content: center;
  & #spin {
    margin: 0 auto;
  }
`;

const MakchaContainer = styled.div`
  display: flex;
  flex: 3;
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
        subwayPathOptionList: { routeList: [{}] },
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
      this.getTrainData(latitude, longitude);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startX !== this.state.startX) {
      const { startX, startY } = this.state;
      this.getTrainData(startY, startX);
      this.getCurrentPosFromGPS(startX, startY);
    }
  }

  getTrainData(lat, long) {
    const { endX, endY } = this.state;
    let url = `https://api.makkcha.com/searchMakcha?startX=${long}&startY=${lat}&endX=${endX}&endY=${endY}`;

    // // Json-server Option
    // let url = "http://localhost:3004/db/";
    axios.get(url).then(res =>
      this.setState({
        data: {
          ...res.data,
          defaultInfo: res.data.subwayPathOptionList.routeList[0]
        }
      })
    );
  }

  getCurrentPosFromGPS(x, y) {
    let url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${x}&y=${y}&input_coord=WGS84`;
    let headers = { Authorization: `KakaoAK ${keys.KakaoAK}` };
    axios.get(url, { headers }).then(res =>
      this.setState({
        currentAddr: res.data.documents[0].address.address_name
      })
    );
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
          {Object.keys(this.state.data).length ? (
            <OptinList
              taxiInfo={taxiInfo}
              subwayPathOptionList={subwayPathOptionList}
              defaultInfo={subwayPathOptionList.routeList[0]}
              data={this.state.data}
              onButtonPress={this.onButtonPress.bind(this)}
            />
          ) : (
            <Spin indicator={antIcon} id="spin" />
          )}
        </ContentContainer>
      </Container>
    );
  }
}
