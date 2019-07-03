import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./Styles/global_styles";
import Landing from "./Routes/Landing";
import Feedback from "./Routes/Feedback";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <AppContainer className="app">
            <Route exact path="/" component={Landing} />
            <Route path="/feedback" component={Feedback} />
          </AppContainer>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
