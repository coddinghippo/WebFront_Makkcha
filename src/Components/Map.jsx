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

    let map = new kakao.maps.Map(el, {
      center: new kakao.maps.LatLng(startY, startX),
      level: 4
    });

    let markerPos = new kakao.maps.LatLng(startY, startX);
    let marker = new kakao.maps.Marker({
      position: markerPos
    });
    marker.setMap(map);
    // this.setState({ map });

    kakao.maps.event.addListener(map, "click", mouseEvent => {
      const latlng = mouseEvent.latLng;
      let y = latlng.getLat();
      let x = latlng.getLng();
      makchaApi.getPosFromGPS(x, y).then(res => {
        if (this.state.type === "start") {
          const startAddr = res.data.documents[0].address.address_name;
          this.setState({ startX: x, startY: y, startAddr });
        } else {
          const endAddr = res.data.documents[0].address.address_name;
          this.setState({ endX: x, endY: y, endAddr });
        }
      });

      marker.setPosition(latlng);
      // this.openNotification();
    });
  }

  render() {
    const { addr, type } = this.state;
    return (
      <MapContainer>
        <KakaoMap id="map" />
        <SearchContainer>
          <SearchCard state={this.state}>
            <Button onClick={() => this.setState({ type: "start" })}>
              변경
            </Button>
            <Button onClick={() => this.setState({ type: "end" })}>변경</Button>
          </SearchCard>
        </SearchContainer>

        <ButtonContainer>
          <StyledButton type="danger">
            <Link to="/">취소</Link>
          </StyledButton>
          <StyledButton
            type="primary"
            onClick={() => this.props.actions.setPos(this.state)}
          >
            <Link to="/">확인</Link>
          </StyledButton>
        </ButtonContainer>
      </MapContainer>
    );
  }
}

export default useData(Map);
