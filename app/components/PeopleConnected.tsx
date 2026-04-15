"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { incrementPeople, decrementPeople } from "@/lib/peopleCounter";

const PeopleConnected = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ref = doc(db, "stats", "people");

    // ✅ increment when user opens
    incrementPeople();

    // ✅ realtime listener
    const unsub = onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().count);
      }
    });

    // ✅ decrement when leaving
    const handleExit = () => {
      decrementPeople();
    };

    window.addEventListener("beforeunload", handleExit);

    return () => {
      handleExit();
      window.removeEventListener("beforeunload", handleExit);
      unsub();
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#020617",
        color: "#38bdf8",
        padding: "10px 16px",
        borderRadius: "12px",
        fontWeight: "bold",
        zIndex: 99999,
        pointerEvents: "none",
        boxShadow: "0 0 15px rgba(56,189,248,0.4)"
      }}
    >
      🌐 PEOPLE CONNECTED: {count}
    </div>
  );
};

export default PeopleConnected;