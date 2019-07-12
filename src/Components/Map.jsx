/*global kakao*/

import React, { Component } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import Search from "./Search";
import { useData } from "../contexts";

/*
startX, startY, endX, endY를 모두 받자.
Object 형태로 받자.
startX, startY만 있는 경우,
endX, endY만 있는 경우를 나눠서 생각
*/

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const KakaoMap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
  width: 100%;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    const { x, y } = props.location.state;
    console.log(props);
    const { addr } = props.location.state;
    this.state = { x, y, visible: false, addr };
  }

  componentDidMount() {
    // Kakao Map
    let el = document.getElementById("map");
    let { x, y } = this.state;
    this.setState({ x, y });

    let map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(y, x),
      level: 4
    });

    let markerPos = new kakao.maps.LatLng(y, x);
    let marker = new kakao.maps.Marker({
      position: markerPos
    });
    marker.setMap(map);
    // this.setState({ map });

    kakao.maps.event.addListener(map, "click", mouseEvent => {
      const latlng = mouseEvent.latLng;
      let y = latlng.getLat();
      let x = latlng.getLng();
      this.setState({ x, y });
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
    const { x, y } = this.state;

    window.location.href = "/";
  }

  handleCancel(e) {
    console.log(e);
    this.setState({
      visible: false
    });
  }

  render() {
    const { addr } = this.state;
    return (
      <MapContainer>
        <KakaoMap id="map" />
        <SearchContainer>
          <Search addr={addr} />
        </SearchContainer>
        <Modal
          title="목적지 변경"
          visible={this.state.visible}
          onOk={e => this.handleOk(e)}
          onCancel={e => this.handleCancel(e)}
        >
          <p>목적지를 변경하시겠습니까?</p>
        </Modal>
      </MapContainer>
    );
  }
}

export default useData(Map);
