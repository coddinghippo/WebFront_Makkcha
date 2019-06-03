import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./Styles/global_styles";
import Landing from "./Routes/Landing";

const AppContainer = styled.div``;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer className="app">
          <Route exact path="/" component={Landing} />
        </AppContainer>
      </BrowserRouter>
    </>
  );
};

export default App;
