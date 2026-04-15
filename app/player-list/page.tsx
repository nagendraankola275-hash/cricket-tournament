"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";

type Player = {
  id: string;
  name: string;
  phone: string;
  role: string;
};

export default function PlayerListPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 VISIBILITY STATE
  const [showPlayers, setShowPlayers] = useState(false);

  // 🔥 LISTEN TO VISIBILITY (FIXED)
  useEffect(() => {
    const ref = doc(db, "settings", "visibility"); // ✅ FIXED (small s)

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setShowPlayers(snap.data().showPlayers ?? false);
        } else {
          setShowPlayers(false);
        }
      },
      (error) => {
        console.error("Visibility listener error:", error);
      }
    );

    return () => unsub();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "players"));

        const data: Player[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Player, "id">),
        }));

        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-6 py-12">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Player List
      </h1>

      {/* 🔥 VISIBILITY CHECK */}
      {!showPlayers ? (
        <p className="text-center text-gray-400">
          🚧 Players will be revealed after auction
        </p>
      ) : loading ? (
        <p className="text-center text-gray-400">Loading players...</p>
      ) : players.length === 0 ? (
        <p className="text-center text-gray-400">
          No players added yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {players.map((player) => (
            <div
              key={player.id}
              className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl
                p-6
                hover:scale-105
                transition duration-300
              "
            >
              <h2 className="text-xl font-semibold mb-2">
                {player.name}
              </h2>

              <p className="text-gray-400 text-sm">
                📞 {player.phone}
              </p>

              <p className="text-yellow-400 mt-2 font-medium">
                {player.role}
              </p>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}