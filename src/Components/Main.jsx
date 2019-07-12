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
import Search from "./Search";
import SearchCard from "./SearchCard";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

class Main extends Component {
  constructor(props) {
    super(props);
    const { startX, startY, endX, endY } = this.props.data.pos;
    this.state = { startX, startY, endX, endY };
  }

  componentDidMount() {
    if (this.props.data.pos.startX) {
      const { startX, startY, endX, endY } = this.props.data.pos;
      this.setState({ startX, startY, endX, endY });
    }
    if (!this.props.data.pos.startX && !this.state.startX && this.state.endX) {
      const { endX, endY } = this.state;
      window.navigator.geolocation.getCurrentPosition(pos => {
        const startX = pos.coords.longitude;
        const startY = pos.coords.latitude;
        let startAddr, endAddr;
        this.getCurrentPosFromGPS({ startX, startY, endX, endY }).then(res => {
          startAddr = res[0].data.documents[0].address.address_name;
          endAddr = res[1].data.documents[0].address.address_name;
          this.setState({ endX, endY, startX, startY, startAddr, endAddr });
          this.props.actions.setPos({
            endX,
            endY,
            startX,
            startY,
            startAddr,
            endAddr
          });
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startX !== this.state.startX) {
      this.getData();
    }
  }

  getData() {
    const { endX, endY, startX, startY } = this.state;
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

  getCurrentPosFromGPS({ startX, startY, endX, endY }) {
    return Promise.all([
      makchaApi.getPosFromGPS(startX, startY),
      makchaApi.getPosFromGPS(endX, endY)
    ]);
  }

  render() {
    const { startX, startY, endX, endY, startAddr, endAddr } = this.state;
    return this.props.data.pos ? (
      <Container>
        <StyledLink to="/map">
          <SearchCard />
        </StyledLink>
      </Container>
    ) : (
      <AddressForm />
    );
  }
}

export default useData(Main);
