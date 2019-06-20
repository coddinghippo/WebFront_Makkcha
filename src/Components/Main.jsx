import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Spin, Icon } from "antd";
import FloatContent from "./FloatContent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContentContainer = styled.div`
  flex: 10;
  display: flex;
  justify-content: center;
`;

// const clearStorage = props => {
//   localStorage.setItem("addr", "");
//   props.toggleComponent();
// };

const MakchaContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  color: white;
  flex: 3;
  background: #000033;
`;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { endX: 126.91509963231, endY: 37.568565387939, data: {} };
  }

  componentDidMount() {
    if (localStorage.getItem("loc")) {
      const { endX, endY } = JSON.parse(
        localStorage.getItem("loc")
      ).endLocation;
      // console.log("hi there", endX, endY);
      this.setState({ endX, endY });
    }
    window.navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      this.setState({ startX: longitude, startY: latitude });
      this.getTrainData(latitude, longitude);
    });
  }
  // x: long, y: lat
  // startX: 127.07684413348886, startY: 37.51428097145118

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startX !== this.state.startX) {
      const { startX, startY } = this.state;
      this.getTrainData(startY, startX);
    }
  }

  getTrainData(lat, long) {
    const { endX, endY } = this.state;
    let url = `https://makkcha.com/searchMakcha?startX=${long}&startY=${lat}&endX=${endX}&endY=${endY}`;
    // let url = "http://localhost:4000/db/";
    axios.get(url).then(res => this.setState({ data: res.data }));
  }

  getMakchaTimer({ hr, min, sec }) {
    const { pathOptionList } = this.state.data;

    const makcha = pathOptionList
      ? pathOptionList[0].route.lastTimeList[0].lastTimeDay
      : null;
    console.log(makcha);
  }

  render() {
    const { pathOptionList } = this.state.data;
    const date = new Date();
    const time = {
      hr: date.getHours(),
      min: date.getMinutes(),
      sec: date.getSeconds()
    };
    // console.log(time.hr, time.min, time.sec);
    return (
      <Container>
        <MakchaContainer>
          <p>
            endX: {this.state.endx} endY: {this.state.endY}
          </p>
          <div>
            <span>막차까지 </span>
            <span>
              {pathOptionList
                ? pathOptionList[0].route.lastTimeList[0].lastTimeDay
                : "준비중입니다"}
            </span>
            <span>{this.getMakchaTimer(time)}</span>
          </div>
        </MakchaContainer>
        <ContentContainer>
          {Object.keys(this.state.data).length ? (
            <FloatContent data={this.state.data} />
          ) : (
            <Spin indicator={antIcon} />
          )}
        </ContentContainer>
      </Container>
    );
  }
}
