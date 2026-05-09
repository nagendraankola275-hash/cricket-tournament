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
  auctionOrder?: number;
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

      const visiblePlayers = list
        .filter((p) => p.isVisible === true)
        .sort((a, b) => {
          const aOrder = a.auctionOrder ?? Number.MAX_SAFE_INTEGER;
          const bOrder = b.auctionOrder ?? Number.MAX_SAFE_INTEGER;

          if (aOrder !== bOrder) {
            return aOrder - bOrder;
          }

          return a.name.localeCompare(b.name);
        });
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
            <div className="hidden md:grid md:grid-cols-4 gap-4 px-4 py-3 bg-white/10 rounded-t-xl text-sm font-semibold text-gray-300">
              <p>Player</p>
              <p>Status</p>
              <p>Team</p>
              <p>Points</p>
            </div>

            {/* DATA */}
            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-t-none md:rounded-b-xl">

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
                    className={`border-b border-white/10 px-4 py-4 text-sm last:border-b-0 ${
                      teamLogo ? "pb-6 md:py-4" : ""
                    }`}
                  >
                    <div className="grid gap-3 md:grid-cols-4 md:gap-4 md:items-center">
                      {/* PLAYER */}
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 md:hidden">
                          Player
                        </p>
                        <p>{p.name}</p>
                      </div>

                      {/* STATUS */}
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 md:hidden">
                          Status
                        </p>
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
                      </div>

                      {/* TEAM */}
                      <div className="relative md:static">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 md:hidden">
                          Team
                        </p>
                        <div className="md:hidden pr-28">
                          <p>{p.team || "-"}</p>
                        </div>
                        {teamLogo && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 md:hidden">
                            <Image
                              src={teamLogo}
                              alt={p.team || "Team"}
                              width={84}
                              height={84}
                              className="h-20 w-20 shrink-0 rounded-2xl object-contain bg-white/10 p-2"
                            />
                          </div>
                        )}
                        <div className="hidden md:flex items-center gap-2">
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
                      </div>

                      {/* CREDITS */}
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400 md:hidden">
                          Points
                        </p>
                        <p>{p.credits ? p.credits : "-"}</p>
                      </div>
                    </div>
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
