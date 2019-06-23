import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import uuidv1 from "uuid/v1";
import { lineColors } from "../Styles/_mixin";
import { parse } from "@babel/core";

const Container = styled.div`
  display: flex;
  width: 100%;
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

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 90%;
  max-width: 90%;
  height: 1rem;
  background: sky-blue;
  // &:first-child {
  //   border-top-left-radius: 5px;
  //   border-bottom-left-radius: 5px;
  // }
`;

const Bar = styled.div`
  text-align: center;
  height: 20px;
  &:first-of-type {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
  }
  &:last-of-type {
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
  }
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

const ButtonContainer = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  width: 100%;
  bottom: 0;
`;

const StyledButton = styled(Button)`
  width: 90%;
  height: 3rem;
  color: white;
  background: #000033;
  border-radius: 1.5rem;
  margin-bottom: 1.3rem;
  backgrouncolor: #000;
  font-weight: bold;
`;

export default class OptinList extends Component {
  constructor(props) {
    super(props);
    const { taxiInfo, subwayPathOptionList, defaultInfo } = this.props;
    this.state = {
      taxiInfo,
      subwayPathOptionList,
      defaultInfo,
      runTime: { total: null, runTime: {} }
    };
  }

  // // Json-server Option

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.taxiInfo !== this.props.taxiInfo) {
      const { taxiInfo, subwayPathOptionList } = this.props.data;
      this.getTime(0);
      this.setState({ taxiInfo, subwayPathOptionList });
    }
  }

  getTime(idx) {
    // get routeList idx as a param
    const { pathStationList } = this.state.subwayPathOptionList.routeList[idx];

    // store sum of runTime for each line
    let cum = 0;
    let runTimeObj = {};
    pathStationList.map(item => {
      let time = item.runTime;
      if (time !== null) {
        time = parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3));
        cum += time;
        runTimeObj[item.line] = cum;
      } else {
        runTimeObj[item.line] = cum;
        cum = 0;
      }
    });
    let total = 0;
    Object.keys(runTimeObj).forEach(key => (total += runTimeObj[key]));
    this.setState({ runTime: { runTime: runTimeObj, total } });
  }

  renderBar() {
    const { total, runTime } = this.state.runTime;
    const results = [];
    Object.keys(runTime).forEach(key => {
      // console.log(runTime[key], total);
      let length = Math.floor((Number(runTime[key]) / total) * 100);
      // if (length < 24) length = 24;
      length = String(length) + "%";
      results.push(
        <Bar
          className="haha"
          key={uuidv1()}
          style={{
            width: length,
            backgroundColor: lineColors[key],
            color: "white"
          }}
        >
          {Math.floor(runTime[key] / 60)}분
        </Bar>
      );
    });
    return results.map(item => item);
  }

  // renderStn() {
  //   const makcha = this.state.makcha;
  //   const totalTime = makcha.reduce((a, x) => a + x.time, 0);

  //   return makcha.map((item, idx) => {
  //     let length = Math.floor((Number(item.time) / totalTime) * 100);
  //     if (length < 24) length = 24;
  //     length = String(length) + "%";
  //     return (
  //       <Bar
  //         key={uuidv1()}
  //         style={{
  //           width: length,
  //           color: "black",
  //           textAlign: "left"
  //         }}
  //       >
  //         <span style={{ fontSize: 8 }}>
  //           {item.routeNm === "도보" ? "도보" : item.fname}
  //         </span>
  //       </Bar>
  //     );
  //   });

  // }

  render() {
    // console.log(this.state.defaultOption);
    // Object.keys(this.props).forEach(key => console.log(this.props[key]));
    const { taxiInfo, defaultInfo } = this.state;
    const { total, runTime } = this.state.runTime;
    // const totalTime = makcha.reduce((a, x) => a + x.time, 0);
    // const totalDistance = makcha.reduce((a, x) => a + x.distance, 0) / 1000;
    // const { lastTimeList } = this.state.route;
    // if (this.state.subwayPathOptionList) this.getTime(0);
    console.log(this.state);
    // console.log(this.state);
    return (
      <Container speed={0.8} horizontal={false}>
        <Card>
          <TextContainer>
            <Text>
              지하철 {Math.floor(total / 60)}분 | 막차 {defaultInfo.lastTime}
            </Text>
            {/* <p>
              {totalDistance.toFixed(1)}km |{" "}
              {String(Math.floor(this.state.route.price / 1000)) +
                "," +
                String(this.state.route.price % 1000)}
              원 | {makcha[0].time}분
            </p> */}
          </TextContainer>
          <BarContainer className="nana" style={{ marginBottom: 0 }}>
            {this.renderBar()}
          </BarContainer>
          <BarContainer style={{ marginTop: 0 }}>
            {/* {this.renderStn()} */}
          </BarContainer>
        </Card>

        {/* <Card makcha={makcha} route={route} />
        <Card makcha={makcha} route={route} /> */}

        <Card>
          <TextContainer>
            <Text>택시 {taxiInfo.time}분</Text>
            <p>
              {(taxiInfo.distance / 1000).toFixed(1)}km | 약{" "}
              {String(Math.floor(taxiInfo.price / 1000)) +
                "," +
                String(taxiInfo.price % 1000)}
              원
            </p>
          </TextContainer>
          <BarContainer>
            <Bar
              style={{
                width: "100%",
                backgroundColor: "#ffd300",
                color: "white"
              }}
            >
              {taxiInfo.time}분
            </Bar>
          </BarContainer>
        </Card>
        <ButtonContainer>
          <StyledButton size="large" onClick={this.props.onButtonPress}>
            목적지 재설정
          </StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}
