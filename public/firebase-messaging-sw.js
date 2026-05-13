self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  const targetUrl = event.notification?.data?.link || "/";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if ("focus" in client && client.url.includes(self.location.origin)) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }

      return undefined;
    })
  );
});

importScripts("https://www.gstatic.com/firebasejs/12.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBmB-o8afYWa4KWF-uS7RDjKxVNOYjq5Mc",
  authDomain: "cricket-tournament-6a617.firebaseapp.com",
  projectId: "cricket-tournament-6a617",
  storageBucket: "cricket-tournament-6a617.appspot.com",
  messagingSenderId: "899544200181",
  appId: "1:899544200181:web:f5432ee90031b97beaa6bc",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || "BPL Update";
  const notificationOptions = {
    body: payload.notification?.body || "New tournament update available.",
    icon: "/bpl-logo.png",
    data: {
      link: payload?.fcmOptions?.link || payload?.data?.link || "/",
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
