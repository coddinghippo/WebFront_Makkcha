import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Timeline, Button } from "antd";
import SubwayCard from "./SubwayCard";
import { Container, Text } from "./common";
import { fontSize } from "../Styles/_mixin";
import { useData } from "../contexts";

const SubwayContainer = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 90%;
  height: 3rem;
  background: #000033;
  border-radius: 1.5rem;
  margin-bottom: 1.3rem;
  color: #fff;
  font-size: ${fontSize.normalFontSize};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  postion: absolute;
  bottom: 0;
  justify-content: center;
`;

class CardList extends Component {
  constructor(props) {
    super(props);
    const { sub } = props.data.data;
    const { subOnlyList } = sub.subOnly;
    this.state = { sub, subOnlyList };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data.data !== this.props.data.data) {
      const { sub } = this.props.data.data;
      const { subOnlyList } = sub.subOnly;
      this.setState({ sub, subOnlyList });
    }
  }

  renderSubwayRoutes() {
    const { sub } = this.state;
    const { routes, routeList, subOnly } = sub;

    if (routes[0].runTime.length) {
      const { totalTime, price, runTime } = routes[0];
      return (
        <SubwayCard
          totalTime={totalTime}
          price={price}
          runTime={runTime}
          lastTime={routeList[0].lastTime}
        />
      );
    } else return null;
  }

  render() {
    return (
      <Container
        style={{ background: "white", width: "92%", marginTop: "2rem" }}
      >
        <SubwayContainer>{this.renderSubwayRoutes()}</SubwayContainer>
        <ButtonContainer>
          <StyledButton>
            <Link to="/feedback">피드백 남기기</Link>
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}

export default useData(CardList);
