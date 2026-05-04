"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

export default function AuctionLivePage() {

  const [players, setPlayers] = useState<any[]>([]);
  const [showAuction, setShowAuction] = useState(false);

  useEffect(() => {

    // 🔥 PLAYERS LISTENER
    const unsubscribePlayers = onSnapshot(collection(db, "players"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      const visiblePlayers = list.filter((p) => p.isVisible === true);
      setPlayers(visiblePlayers);
    });

    // 🔥 SETTINGS LISTENER (FIXED)
    const unsubscribeSettings = onSnapshot(
      doc(db, "settings", "visibility"),
      (docSnap) => {
        if (docSnap.exists()) {
          console.log("Visibility data:", docSnap.data()); // DEBUG
          setShowAuction(docSnap.data().showAuction === true); // ✅ FIX
        }
      }
    );

    return () => {
      unsubscribePlayers();
      unsubscribeSettings();
    };

  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">

      <Navbar />

      <div className="px-6 py-12 max-w-6xl mx-auto">

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          🏏 Auction Live
        </h1>

        {/* 🔥 MAIN CONDITION */}
        {!showAuction ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">
              🚧 Auction will be revealed before the auction
            </p>
          </div>
        ) : (
          <div>

            {/* TABLE HEADER */}
            <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-white/10 rounded-t-xl text-sm font-semibold text-gray-300">
              <p>Player</p>
              <p>Status</p>
              <p>Team</p>
              <p>Credits</p>
            </div>

            {/* DATA */}
            <div className="bg-white/5 border border-white/10 rounded-b-xl">

              {players.length === 0 && (
                <div className="p-10 text-center text-gray-400">
                  No players found...
                </div>
              )}

              {players.map((p) => (
                <div
                  key={p.id}
                  className="grid grid-cols-4 gap-4 px-4 py-3 border-b border-white/10 text-sm items-center"
                >
                  {/* PLAYER */}
                  <p>{p.name}</p>

                  {/* STATUS */}
                  <p
                    className={
                      p.status === "SOLD"
                        ? "text-green-400 font-semibold"
                        : p.status === "UNSOLD"
                        ? "text-red-400 font-semibold"
                        : "text-yellow-400 font-semibold"
                    }
                  >
                    {p.status || "WAITING"}
                  </p>

                  {/* TEAM */}
                  <p>{p.team || "-"}</p>

                  {/* CREDITS */}
                  <p>{p.credits ? `${p.credits} Cr` : "-"}</p>
                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}