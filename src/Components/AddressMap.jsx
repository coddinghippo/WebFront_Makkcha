/*global kakao*/

import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Modal, Button, notification } from "antd";
import SearchCard from "./SearchCard";
import { useData } from "../contexts";
import { makchaApi } from "../api";

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

const StyledButton = styled(Button)`
  width: 30%;
`;

class AddressMap extends Component {
  componentDidMount() {
    // Kakao Map
    let el = document.getElementById("map");
    let endX = 127.0445056;
    let endY = 37.5109245;

    let map;
    let markerPos;
    map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(endY, endX),
      level: 4
    });
    markerPos = new kakao.maps.LatLng(endY, endX);
    let marker = new kakao.maps.Marker({
      position: markerPos
    });
    marker.setMap(map);
    this.setState({ map });

    kakao.maps.event.addListener(map, "click", mouseEvent => {
      const latlng = mouseEvent.latLng;
      let y = latlng.getLat();
      let x = latlng.getLng();
      makchaApi.getPosFromGPS(x, y).then(res => {
        const endAddr = res.data.documents[0].address.address_name;
        this.setState({ endX: x, endY: y, endAddr });
        this.props.actions.setPos({
          ...this.props.data.pos,
          endX: x,
          endY: y,
          endAddr
        });
      });

      marker.setPosition(latlng);
      // this.openNotification();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.pos.endAddr !== this.props.data.pos.endAddr) {
      console.log(true);
      const { map } = this.state;
      const { endX, endY } = this.props.data.pos;
      // 이동할 위도 경도 위치를 생성합니다
      let moveLatLon = new kakao.maps.LatLng(
        parseFloat(endY),
        parseFloat(endX)
      );

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.setCenter(moveLatLon);
      let markerPos = new kakao.maps.LatLng(endY, endX);
      let marker = new kakao.maps.Marker({
        position: markerPos
      });
      marker.setMap(map);
    }
  }

  render() {
    return (
      <MapContainer>
        <KakaoMap id="map" />
      </MapContainer>
    );
  }
}

export default useData(AddressMap);
