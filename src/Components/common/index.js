import styled from "styled-components";
import { fontSize } from "../../Styles/_mixin";

export const Text = styled.p`
  font-size: ${props => fontSize[props.size] || fontSize.normalFontSize};
  font-weight: ${props => props.weight};
  line-height: ${props => props.lineHeight || "1rem"};
`;

export const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

export const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 90%;
  max-width: 90%;
  height: 1rem;
  background: sky-blue;
`;

export const Bar = styled.div`
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

export const TextContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
