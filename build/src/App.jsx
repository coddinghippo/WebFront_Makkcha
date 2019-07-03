import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import { messaging } from "./firebase";
import { GlobalStyle } from "./Styles/global_styles";
import Landing from "./Routes/Landing";
import Feedback from "./Routes/Feedback";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const INSTANCE_TOKEN = "instanceToken";

class App extends Component {
  componentDidMount() {
    this.notificationPermission();
  }

  async notificationPermission() {
    let permissionGranted = false;
    try {
      /* request permission if not granted */
      if (Notification.permission !== "granted") {
        await messaging.requestPermission();
      }
      /* get instance token if not available */
      if (localStorage.getItem(INSTANCE_TOKEN) !== null) {
        permissionGranted = true;
      } else {
        const token = await messaging.getToken(); // returns the same token on every invocation until refreshed by browser
        localStorage.setItem(INSTANCE_TOKEN, token);
        permissionGranted = true;
      }
    } catch (err) {
      console.log(err);
      if (
        err.hasOwnProperty("code") &&
        err.code === "messaging/permission-default"
      )
        console.log("You need to allow the site to send notifications");
      else if (
        err.hasOwnProperty("code") &&
        err.code === "messaging/permission-blocked"
      )
        console.log(
          "Currently, the site is blocked from sending notifications. Please unblock the same in your browser settings"
        );
      else console.log("Unable to subscribe you to notifications");
    } finally {
      return permissionGranted;
    }
  }

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
