"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

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

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
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
