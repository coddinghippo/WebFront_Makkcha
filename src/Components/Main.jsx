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
    if (!this.state.startX && this.state.endX) {
      const { endX, endY } = this.state;
      window.navigator.geolocation.getCurrentPosition(pos => {
        const startX = pos.coords.longitude;
        const startY = pos.coords.latitude;
        this.props.actions.setPos({ endX, endY, startX, startY });
        this.setState({ endX, endY, startX, startY });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startX !== this.state.startX) {
      const { startX, startY } = this.state;
      this.getCurrentPosFromGPS();
      this.getData();
      this.props.actions.setPos(this.state);
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

  getCurrentPosFromGPS() {
    const { startX, startY, endX, endY } = this.state;
    console.log(startX, startY, endX, endY);
    makchaApi.getPosFromGPS(startX, startY).then(res => {
      this.setState({
        startAddr: res.data.documents[0].address.address_name
      });
    });
    makchaApi.getPosFromGPS(endX, endY).then(res => {
      this.setState({
        endAddr: res.data.documents[0].address.address_name
      });
    });
  }

  render() {
    const { startX, startY, endX, endY, startAddr, endAddr } = this.state;
    return this.props.data.pos ? (
      <Container>
        <StyledLink
          to={{
            pathname: "/map",
            state: { x: startX, y: startY, addr: startAddr }
          }}
        >
          <Search addr={startAddr} />
        </StyledLink>
        <StyledLink
          to={{ pathname: "/map", state: { x: endX, y: endY, addr: endAddr } }}
        >
          <Search addr={endAddr} />
        </StyledLink>
      </Container>
    ) : (
      <AddressForm />
    );
  }
}

export default useData(Main);
