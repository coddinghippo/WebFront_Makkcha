import styled from "styled-components";
import { fontSize } from "../../Styles/_mixin";

export const Text = styled.p`
  font-size: ${props => fontSize[props.size] || fontSize.normalFontSize};
  font-weight: ${props => props.weight};
  line-height: ${props => props.lineHeight || "1rem"};
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;
