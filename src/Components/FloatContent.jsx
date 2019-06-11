import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 0.5rem;
  border: 1px solid #eee;
  width: 94%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Line = styled.div`
  border-bottom: 2px solid #bbb;
  height: 1rem;
  margin-bottom: 1rem;
  width: 60%;
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  height: 1rem;
  background: sky-blue;
`;

const Bar = styled.div`
  text-align: center;
`;

export default class FloatContent extends Component {
  state = {
    pathList: [
      { line: 6, time: 15 },
      { line: 2, time: 13 },
      { line: 5, time: 27 },
      { line: 4, time: 12 }
    ]
  };

  componentDidMount() {
    const total = this.state.pathList.reduce((a, obj) => a + obj.time, 0);
    this.setState({ total });
  }

  renderBar() {
    const list = this.state.pathList;
    const { total } = this.state;
    const colors = [
      "##CCCCCC",
      "#003DA5",
      "#009D3E",
      "#EF7C1C",
      "#00A5DE",
      "#996CAC",
      "#CD7C2F",
      "#747F00",
      "#EA545D",
      "#A17E46"
    ];
    return list.map((path, idx) => {
      let length = String(parseInt((path.time / total) * 100)) + "%";
      return (
        <Bar
          key={idx}
          style={{
            width: length,
            height: "20px",
            backgroundColor: colors[path.line],
            color: "white"
          }}
        >
          {path.time}분
        </Bar>
      );
    });
  }

  render() {
    return (
      <Container>
        <Line />
        <BarContainer>{this.renderBar()}</BarContainer>
      </Container>
    );
  }
}
