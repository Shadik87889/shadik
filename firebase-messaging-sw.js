// This file MUST be named firebase-messaging-sw.js and placed in the root of your website.
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js",
);

// Initialize the Firebase app in the service worker by passing in your app's Firebase config object.
const firebaseConfig = {
  apiKey: "AIzaSyDLip1JbemlO2OOqI_P9KfWSLVhvgixUmY",
  authDomain: "shadikwebhyper.firebaseapp.com",
  projectId: "shadikwebhyper",
  storageBucket: "shadikwebhyper.firebasestorage.app",
  messagingSenderId: "93254122264",
  appId: "1:93254122264:web:181405dce44e473f4a7c6d",
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  // Added safety fallbacks here as well so it doesn't crash on empty payloads
  const notificationTitle = payload?.notification?.title || "System Alert";
  const notificationOptions = {
    body: payload?.notification?.body || "New project activity detected.",
    icon:
      "https://i.postimg.cc/yddXd3db/Chat-GPT-Image-Apr-19-2026-08-20-37-PM.png", // Your logo
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
