/*global kakao*/

import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Button } from "antd";
import SearchCard from "../Components/SearchCard";
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

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 1;
`;

const StyledButton = styled(Button)`
  width: 30%;
`;

class Map extends Component {
  constructor(props) {
    super(props);
    const {
      startX,
      startY,
      endX,
      endY,
      startAddr,
      endAddr
    } = this.props.data.pos;
    this.state = {
      startX,
      startY,
      endX,
      endY,
      startAddr,
      endAddr,
      type: "start"
    };
  }

  componentDidMount() {
    // Kakao Map
    let el = document.getElementById("map");
    let { startX, startY, endX, endY } = this.state;

    let map;
    let markerPos;
    map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(startY, startX),
      level: 4
    });
    markerPos = new kakao.maps.LatLng(startY, startX);
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
        if (this.state.type === "start") {
          const startAddr = res.data.documents[0].address.address_name;
          this.setState({ startX: x, startY: y, startAddr });
          this.props.actions.setPos({
            ...this.props.data.pos,
            startX: x,
            startY: y,
            startAddr
          });
        } else {
          const endAddr = res.data.documents[0].address.address_name;
          this.setState({ endX: x, endY: y, endAddr });
          this.props.actions.setPos({
            ...this.props.data.pos,
            endX: x,
            endY: y,
            endAddr
          });
        }
      });

      marker.setPosition(latlng);
      // this.openNotification();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.data.pos.startAddr !== this.props.data.pos.startAddr &&
      this.props.data.pos.type === "start"
    ) {
      const { map } = this.state;
      const { startX, startY } = this.props.data.pos;
      // 이동할 위도 경도 위치를 생성합니다
      let moveLatLon = new kakao.maps.LatLng(
        parseFloat(startY),
        parseFloat(startX)
      );

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      map.setCenter(moveLatLon);
      let markerPos = new kakao.maps.LatLng(startY, startX);
      let marker = new kakao.maps.Marker({
        position: markerPos
      });
      marker.setMap(map);
    }
    if (
      prevProps.data.pos.endAddr !== this.props.data.pos.endAddr &&
      this.props.data.pos.type === "end"
    ) {
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
    const { addr, type } = this.state;

    return (
      <MapContainer>
        <KakaoMap id="map" />
        <SearchContainer>
          <SearchCard>
            <Button
              shape="round"
              onClick={() => this.setState({ type: "start" })}
            >
              찾기
            </Button>
            <Button
              shape="round"
              onClick={() => this.setState({ type: "end" })}
            >
              찾기
            </Button>
          </SearchCard>
        </SearchContainer>

        <ButtonContainer>
          <StyledButton shape="round" type="danger">
            <Link to="/">취소</Link>
          </StyledButton>
          <StyledButton type="primary" shape="round">
            <Link to="/">확인</Link>
          </StyledButton>
        </ButtonContainer>
      </MapContainer>
    );
  }
}

export default useData(Map);
