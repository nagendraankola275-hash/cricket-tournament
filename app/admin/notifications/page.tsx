"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export default function AdminNotificationsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("https://bpl2026.in/");
  const [statusMessage, setStatusMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [version, setVersion] = useState(Date.now());

  const ADMIN_PASSWORD = "Naags@3570";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setStatusMessage("");
    } else {
      setStatusMessage("Wrong password");
    }
  };

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setStatusMessage("Title and body are required.");
      return;
    }

    setSending(true);
    setStatusMessage("");

    try {
      const cleanTitle = title.trim();
      const cleanBody = body.trim();
      const cleanLink = link.trim() || "https://bpl2026.in/";

      await setDoc(
        doc(db, "settings", "liveAnnouncement"),
        {
          title: cleanTitle,
          body: cleanBody,
          link: cleanLink,
          active: true,
          version,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      const response = await fetch("/api/notifications/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          title: cleanTitle,
          body: cleanBody,
          link: cleanLink,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        sent?: number;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Unable to send MSG91 SMS.");
      }

      setStatusMessage(
        result.sent
          ? `Live update sent on website and MSG91 SMS sent to ${result.sent} player number(s).`
          : result.message || "Live announcement sent to website visitors."
      );
      setTitle("");
      setBody("");
      setVersion(Date.now());
    } catch (error) {
      console.error(error);
      setStatusMessage(
        error instanceof Error ? error.message : "Unable to send notification."
      );
    } finally {
      setSending(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617] px-4 text-white">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <h1 className="mb-5 text-2xl font-semibold">Admin Notifications</h1>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded bg-black px-4 py-3"
          />
          <button
            onClick={handleLogin}
            className="w-full rounded bg-yellow-400 py-3 font-semibold text-black"
          >
            Enter
          </button>
          {statusMessage && (
            <p className="mt-4 text-sm text-red-300">{statusMessage}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl rounded-[30px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.26)] md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/85">
          Admin Notifications
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">
          Send Live Update
        </h1>
        <p className="mt-3 text-sm leading-7 text-gray-300 md:text-base">
          Use this page whenever you publish a new update, gallery item, player reveal, or match announcement. People currently viewing the website will see a floating update message, and player phone numbers can receive MSG91 SMS when the provider is configured.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3"
          />

          <textarea
            placeholder="Notification message"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3"
          />

          <input
            type="text"
            placeholder="Open link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 py-3 font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? "Sending..." : "Send Live Update + SMS"}
          </button>

          {statusMessage && (
            <p className="text-sm text-gray-300">{statusMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
