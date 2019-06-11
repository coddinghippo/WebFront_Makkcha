import React, { Component } from "react";
import styled from "styled-components";
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
    this.state = {};
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(pos =>
      alert(`lat: ${pos.coords.latitude} / long: ${pos.coords.longitude}`)
    );
  }

  render() {
    return (
      <Container>
        <ImageContent />
        <IconContainer>
          <Icon src={train} />
          <Icon src={drink} />
          <Icon src={med} />
          <Icon src={delivery} />
          <Icon src={food} />
        </IconContainer>
        <ContentContainer>
          <FloatContent />
        </ContentContainer>
      </Container>
    );
  }
}
