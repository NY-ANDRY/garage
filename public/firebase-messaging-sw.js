// importScripts('https://www.gstatic.com/firebasejs/12.8.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/12.8.0/firebase-messaging-compat.js');

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBqj800od4AEAls_-i0HohmX7hQA36jj-I",
  authDomain: "garage-44cc0.firebaseapp.com",
  databaseURL: "https://garage-44cc0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "garage-44cc0",
  storageBucket: "garage-44cc0.firebasestorage.app",
  messagingSenderId: "984512474289",
  appId: "1:984512474289:web:6a4162d7f8ddae20d78690",
  measurementId: "G-0GMMY6VPJN"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/test.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});