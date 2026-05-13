"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { subscribeToPushNotifications } from "@/lib/pushNotifications";

type Announcement = {
  title: string;
  body: string;
  link?: string;
  active?: boolean;
  version?: number;
};

export default function NotificationPrompt() {
  const pathname = usePathname();
  const [toast, setToast] = useState<Announcement | null>(null);
  const [permissionState, setPermissionState] = useState<
    NotificationPermission | "unsupported" | "unknown"
  >("unknown");
  const [promptDismissed, setPromptDismissed] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const firstSnapshotRef = useRef(true);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (announcement: Announcement) => {
    setToast(announcement);

    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = window.setTimeout(() => {
      setToast(null);
    }, 8000);
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!("Notification" in window)) {
      setPermissionState("unsupported");
      return;
    }

    setPermissionState(Notification.permission);
    setPromptDismissed(
      window.localStorage.getItem("bpl-notification-prompt-dismissed") === "true"
    );
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }

    const unsubscribe = onSnapshot(
      doc(db, "settings", "liveAnnouncement"),
      (snapshot) => {
        if (!snapshot.exists()) {
          return;
        }

        const data = snapshot.data() as Announcement;

        if (firstSnapshotRef.current) {
          firstSnapshotRef.current = false;
          return;
        }

        if (data.active !== false && data.title && data.body) {
          showToast(data);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/admin") || typeof window === "undefined") {
      return;
    }

    const handleForegroundPush = (
      event: Event & {
        detail?: Announcement;
      }
    ) => {
      if (event.detail?.title && event.detail?.body) {
        showToast(event.detail);
      }
    };

    window.addEventListener(
      "bpl-foreground-notification",
      handleForegroundPush as EventListener
    );

    return () => {
      window.removeEventListener(
        "bpl-foreground-notification",
        handleForegroundPush as EventListener
      );
    };
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        window.clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const handleEnableNotifications = async () => {
    setIsSubscribing(true);
    setSubscriptionMessage("");

    try {
      const result = await subscribeToPushNotifications();
      setSubscriptionMessage(result.message);

      if (typeof window !== "undefined" && "Notification" in window) {
        setPermissionState(Notification.permission);
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  const dismissPrompt = () => {
    setPromptDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("bpl-notification-prompt-dismissed", "true");
    }
  };

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {permissionState !== "granted" &&
        permissionState !== "unsupported" &&
        !promptDismissed && (
          <div className="fixed inset-x-4 bottom-5 z-[70] mx-auto max-w-xl rounded-[28px] border border-cyan-400/25 bg-[#08111d]/95 p-5 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-md md:inset-x-auto md:bottom-6 md:left-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Direct Phone Alerts
            </p>
            <p className="mt-2 text-base font-semibold md:text-lg">
              Allow notifications to get floating update messages on your phone
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              When we send a live update from the admin panel, people who allow
              notifications here will get a direct floating alert like a
              WhatsApp message.
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-xs uppercase tracking-[0.2em] text-cyan-100/90">
              Tap Enable Alerts once on this phone
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleEnableNotifications}
                disabled={isSubscribing}
                className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubscribing ? "Enabling..." : "Enable Alerts"}
              </button>
              <button
                type="button"
                onClick={dismissPrompt}
                className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-slate-200"
              >
                Not now
              </button>
            </div>
            {subscriptionMessage && (
              <p className="mt-3 text-sm text-slate-300">{subscriptionMessage}</p>
            )}
          </div>
        )}

      {toast && (
        <button
          type="button"
          onClick={() => {
            if (toast.link) {
              window.location.href = toast.link;
              return;
            }

            setToast(null);
          }}
          className="fixed bottom-5 right-5 z-[70] max-w-sm rounded-2xl border border-yellow-400/20 bg-[#101722]/95 p-4 text-left text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-md"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300">
            Live Update
          </p>
          <p className="mt-2 text-sm font-semibold text-white">{toast.title}</p>
          <p className="mt-2 text-sm text-gray-200">{toast.body}</p>
          {toast.link && (
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.22em] text-orange-300">
              Tap to open
            </p>
          )}
        </button>
      )}
    </>
  );
}
