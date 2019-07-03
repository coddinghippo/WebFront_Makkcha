import firebase from "firebase";
import keys from "./config/keys";

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: keys.messagingSenderId
  });

  //   navigator.serviceWorker.register("/sw.js").then(registration => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
};

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("userToken:", token);

    return token;
  } catch (error) {
    console.error(error);
  }
};
