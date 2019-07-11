/*global kakao*/

import React, { Component } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import { Container } from "./common";

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    const { startX, startY } = props.history.location.state;
    this.state = { startX, startY, visible: false };
  }

  componentDidMount() {
    let el = document.getElementById("map");
    let { startX, startY } = this.state;
    this.setState({ startX, startY });

    let map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(startY, startX),
      level: 4
    });

    let markerPos = new kakao.maps.LatLng(startY, startX);
    let marker = new kakao.maps.Marker({
      position: markerPos
      // image: markerImage
    });
    marker.setMap(map);
    // this.setState({ map });

    kakao.maps.event.addListener(map, "click", mouseEvent => {
      const latlng = mouseEvent.latLng;
      let startY = latlng.getLat();
      let startX = latlng.getLng();
      this.setState({ startX, startY });
      marker.setPosition(latlng);
      this.showModal();
    });
  }

  showModal() {
    this.setState({
      visible: true
    });
  }

  handleOk(e) {
    console.log(e);
    this.setState({
      visible: false
    });
    const { startX, startY } = this.state;
    const startLocation = { startX, startY };
    localStorage.setItem("startLocation", JSON.stringify({ startLocation }));
    window.location.href = "/";
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.x !== this.state.x) {
  //     const { x, y, map } = this.state;

  //     let markerPos = new kakao.maps.LatLng(y, x);
  //     let marker = new kakao.maps.Marker({
  //       position: markerPos
  //       // image: markerImage
  //     });
  //     marker.setMap(map);
  //   }
  // }

  render() {
    console.log(this.props);
    return (
      <Container>
        <KakaoMap id="map" />
        <Modal
          title="목적지 변경"
          visible={this.state.visible}
          onOk={e => this.handleOk(e)}
          onCancel={e => this.handleCancel(e)}
        >
          <p>목적지를 변경하시겠습니까?</p>
        </Modal>
      </Container>
    );
  }
}

export default Map;
