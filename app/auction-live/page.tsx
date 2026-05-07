"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";

type Player = {
  id: string;
  name: string;
  status?: string;
  team?: string;
  credits?: number;
  isVisible?: boolean;
};

const teamLogos: Record<string, string> = {
  "Vaishya Titans": "/team1.png",
  "The Shetti's XI": "/team2-new.png",
  "KVS Cricketers": "/team3-new.png",
  "Vaishya Power House": "/team4.png",
};

export default function AuctionLivePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [showAuction, setShowAuction] = useState(false);

  useEffect(() => {

    // 🔥 PLAYERS LISTENER
    const unsubscribePlayers = onSnapshot(collection(db, "players"), (snapshot) => {
      const list: Player[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Player, "id">),
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

              {players.map((p) => {
                const teamLogo = p.team ? teamLogos[p.team] : undefined;

                return (
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
                    <div className="flex items-center gap-2">
                      {teamLogo && (
                        <Image
                          src={teamLogo}
                          alt={p.team || "Team"}
                          width={28}
                          height={28}
                          className="h-7 w-7 rounded-full object-contain bg-white/10 p-1"
                        />
                      )}
                      <p>{p.team || "-"}</p>
                    </div>

                    {/* CREDITS */}
                    <p>{p.credits ? `${p.credits} Cr` : "-"}</p>
                  </div>
                );
              })}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
