import styled from "styled-components";
import { fontSize } from "../../Styles/_mixin";

export const Text = styled.p`
  font-size: ${props => fontSize[props.size]};
  font-weight: ${props => props.weight};
`;
