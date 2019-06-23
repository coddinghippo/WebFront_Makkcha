import styled from "styled-components";
import { fontSize } from "../../Styles/_mixin";

export const Text = styled.p`
  font-size: ${props => fontSize[props.size] || fontSize.normalFontSize};
  font-weight: ${props => props.weight};
`;

export const lineChar = {
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  kyeongkang: "경강",
  kyung: "중앙",
  chun: "경춘",
  kong: "공항",
  bun: "분",
  서해선: "서해",
  suin: "수인",
  sinbun: "신분",
  yongin: "용인",
  우이신설경전철: "우이",
  경전철의정부: "의정",
  in: "인1",
  in2: "인2"
};
