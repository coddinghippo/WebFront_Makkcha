import firebase from "firebase";
import "@firebase/messaging";

import keys from "./config/keys";

const config = {
  messagingSenderId: keys.messagingSenderId
};

firebase.initializeApp(config);

let messaging;

// Check browser support
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export { messaging };
