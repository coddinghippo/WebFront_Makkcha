import React, { Component } from "react";
import styled from "styled-components";
import "intersection-observer";
import { ScrollView } from "@cantonjs/react-scroll-view";

const Container = styled(ScrollView)`
  border-radius: 0.5rem;
  border: 1px solid #eee;
  width: 94%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const TopLine = styled.div`
  border-bottom: 2px solid #bbb;
  height: 1rem;
  margin-bottom: 1rem;
  width: 60%;
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 90%;
  height: 1rem;
  background: sky-blue;
`;

const Bar = styled.div`
  text-align: center;
`;

const TextContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

const Text = styled.p`
  margin: 0.5rem 0;
  width: 90%;
  font-weight: 700;
`;

export default class FloatContent extends Component {
  state = {
    pathList: [
      { line: 6, time: 5 },
      { line: 2, time: 13 },
      { line: 5, time: 27 },
      { line: 4, time: 12 }
    ],
    pharmList: [
      {
        title: "센느약국",
        addr: "서울특별시 강남구 테헤란로4길 6 상가 122호",
        tel: "02-501-2450"
      }
    ]
  };

  componentDidMount() {
    const total = this.state.pathList.reduce((a, obj) => a + obj.time, 0);
    this.setState({ total });
  }

  handleEndReached() {
    console.log("load more");
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
      <Container onEndReached={this.handleEndReached}>
        {/* <TopLine /> */}
        <Card>
          <TextContainer>
            <Text>{this.state.total}분</Text>
            <p>21.3km | 약 1,350원 | 도보 4분</p>
          </TextContainer>
          <BarContainer>{this.renderBar()}</BarContainer>
        </Card>
        <Card>
          <TextContainer>
            <Text>{this.state.total}분</Text>
            <p>21.3km | 약 1,350원 | 도보 4분</p>
          </TextContainer>
          <BarContainer>{this.renderBar()}</BarContainer>
        </Card>
        <Card>
          <TextContainer>
            <Text>{this.state.total}분</Text>
            <p>21.3km | 약 1,350원 | 도보 4분</p>
          </TextContainer>
          <BarContainer>{this.renderBar()}</BarContainer>
        </Card>
        <Card>
          <TextContainer>
            <Text>{this.state.total}분</Text>
            <p>21.3km | 약 1,350원 | 도보 4분</p>
          </TextContainer>
          <BarContainer>{this.renderBar()}</BarContainer>
        </Card>
        <Card>
          <TextContainer>
            <Text>{this.state.total}분</Text>
            <p>21.3km | 약 1,350원 | 도보 4분</p>
          </TextContainer>
          <BarContainer>{this.renderBar()}</BarContainer>
        </Card>
      </Container>
    );
  }
}
