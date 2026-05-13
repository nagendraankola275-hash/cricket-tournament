"use client";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, isSupported, onMessage } from "firebase/messaging";
import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmB-o8afYWa4KWF-uS7RDjKxVNOYjq5Mc",
  authDomain: "cricket-tournament-6a617.firebaseapp.com",
  projectId: "cricket-tournament-6a617",
  storageBucket: "cricket-tournament-6a617.appspot.com",
  messagingSenderId: "899544200181",
  appId: "1:899544200181:web:f5432ee90031b97beaa6bc",
};

const messagingApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const subscribeToPushNotifications = async () => {
  if (typeof window === "undefined") {
    return { ok: false, message: "Notifications are only available in the browser." };
  }

  if (!("Notification" in window) || !("serviceWorker" in navigator)) {
    return { ok: false, message: "This browser does not support push notifications." };
  }

  const messagingSupported = await isSupported().catch(() => false);

  if (!messagingSupported) {
    return { ok: false, message: "Firebase messaging is not supported on this device." };
  }

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  if (!vapidKey) {
    return { ok: false, message: "Missing NEXT_PUBLIC_FIREBASE_VAPID_KEY." };
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    return { ok: false, message: "Notification permission was not granted." };
  }

  await navigator.serviceWorker.register("/firebase-messaging-sw.js");
  const registration = await navigator.serviceWorker.ready;
  const messaging = getMessaging(messagingApp);
  const token = await getToken(messaging, {
    vapidKey,
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    return { ok: false, message: "Unable to create notification token." };
  }

  const tokenDocId = encodeURIComponent(token);

  await setDoc(
    doc(db, "pushTokens", tokenDocId),
    {
      token,
      platform: "web",
      userAgent: navigator.userAgent,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  onMessage(messaging, (payload) => {
    const notificationTitle = payload.notification?.title || "BPL Update";
    const notificationBody =
      payload.notification?.body || "New update available on the website.";

    if (document.visibilityState === "visible") {
      console.log("Foreground push received:", payload);
      window.dispatchEvent(
        new CustomEvent("bpl-foreground-notification", {
          detail: {
            title: notificationTitle,
            body: notificationBody,
          },
        })
      );
    }
  });

  return { ok: true, message: "Notifications enabled successfully." };
};
