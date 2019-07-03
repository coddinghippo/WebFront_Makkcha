import React from "react";
import styled from "styled-components";
import { Input } from "antd";

const Container = styled.div`
  flex: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled(Input.Search)`
  width: 90%;
  height: 2.2rem;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const Search = props => (
  <Container>
    <SearchBox />
  </Container>
);

export default Search;
