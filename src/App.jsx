import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./Styles/global_styles";
import Landing from "./Routes/Landing";
import Feedback from "./Routes/Feedback";
import Map from "./Components/Map";
import { DataProvider } from "./contexts";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

class App extends Component {
  render() {
    return (
      <DataProvider>
        <GlobalStyle />
        <BrowserRouter>
          <AppContainer className="app">
            <Route exact path="/" component={Landing} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/map" component={Map} />
          </AppContainer>
        </BrowserRouter>
      </DataProvider>
    );
  }
}

export default App;
