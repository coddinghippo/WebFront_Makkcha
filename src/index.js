import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { initializeFirebase } from "./push-notification";

ReactDOM.render(<App />, document.getElementById("root"));
initializeFirebase();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// LocalServiceWorkerRegister();

// if (process.env.NODE_ENV === "production")

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("./assets/sw.js");
// }
