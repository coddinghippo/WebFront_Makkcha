import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import FloatContent from "./FloatContent";
import ImageContent from "./ImageContent";
import train from "../icons/1.png";
import drink from "../icons/2.png";
import med from "../icons/3.png";
import delivery from "../icons/4.png";
import food from "../icons/5.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const IconContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Icon = styled.img`
  width: 2.2rem;
`;

const ContentContainer = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`;

// const clearStorage = props => {
//   localStorage.setItem("addr", "");
//   props.toggleComponent();
// };

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { endX: 126.91509963231, endY: 37.568565387939 };
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(pos => {
      // alert(`lat: ${pos.coords.latitude} / long: ${pos.coords.longitude}`)
      const { latitude, longitude } = pos.coords;
      console.log("pos: ", pos);
      this.setState({ startX: longitude, startY: latitude });
      this.getTrainData(latitude, longitude);
    });
  }
  // x: long, y: lat
  // startX: 127.07684413348886, startY: 37.51428097145118

  getTrainData(lat, long) {
    const { endX, endY } = this.state;
    let url = `https://makkcha.com/searchMakcha?startX=${long}&startY=${lat}&endX=${endX}&endY=${endY}`;
    axios.get(url).then(res => this.setState({ data: res.data }));
  }

  render() {
    return (
      <Container>
        <ImageContent />
        <IconContainer>
          <Icon src={train} onClick={() => this.getTrainData()} />
          <Icon src={drink} />
          <Icon src={med} />
          <Icon src={delivery} />
          <Icon src={food} />
        </IconContainer>
        <ContentContainer>
          <FloatContent data={this.state.data} />
        </ContentContainer>
      </Container>
    );
  }
}
