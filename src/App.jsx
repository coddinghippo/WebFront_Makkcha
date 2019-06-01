import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./Styles/global_styles";
import Main from "./Routes/Main";
import Landing from "./Routes/Landing";

const AppContainer = styled.div``;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppContainer className="app">
          <Route exac path="/main" component={Main} />
          <Route exact path="/" component={Landing} />
        </AppContainer>
      </BrowserRouter>
    </>
  );
};

export default App;
