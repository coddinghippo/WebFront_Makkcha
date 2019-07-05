// import firebase from "firebase";
import firebase from "firebase/app";
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

    return new Promise(resolve => resolve(token));
  } catch (error) {
    console.error(error);
  }
};
