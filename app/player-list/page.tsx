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

// 🔥 FINAL IMAGE FUNCTION (NO BUGS)
const getImage = (name: string) => {
  const n = name.toLowerCase().trim();

  // ✅ EXACT FIXES (TOP PRIORITY)
  if (n === "chetan m bandikatte")
    return "/players/chetan_m_bandikatte.jpg";

  if (n === "vinayak p balehittal")
    return "/players/vinayak_p_balehittal.jpg";

  if (n === "chetan prakash vaidya")
    return "/players/chetan_prakash_vaidya.jpg";

  if (n === "nitish shetti")
    return "/players/nitish_shetti.jpg";

  // ✅ AUTO FOR ALL OTHERS
  return (
    "/players/" +
    n
      .replace(/[^a-z\s]/g, "")
      .replace(/\s+/g, "_") +
    ".jpg"
  );
};

export default function PlayerListPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPlayers, setShowPlayers] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 🔥 VISIBILITY CONTROL
  useEffect(() => {
    const ref = doc(db, "settings", "visibility");

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setShowPlayers(snap.data().showPlayers ?? false);
      }
    });

    return () => unsub();
  }, []);

  // 🔥 FETCH PLAYERS
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

      {/* CONDITIONS */}
      {!showPlayers ? (
        <p className="text-center text-gray-400">
          🚧 Players will be revealed before the auction
        </p>
      ) : loading ? (
        <p className="text-center text-gray-400">
          Loading players...
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {players.map((player) => {
            const imageSrc = getImage(player.name);

            return (
              <div
                key={player.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition duration-300"
              >
                <div className="flex items-center gap-4 mb-3">

                  {/* IMAGE */}
                  <img
                    src={imageSrc}
                    alt={player.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 cursor-pointer"
                    onClick={() => setSelectedImage(imageSrc)}
                    onError={(e) => {
                      e.currentTarget.src = "/players/default.png";
                    }}
                  />

                  {/* INFO */}
                  <div>
                    <h2 className="text-lg font-semibold">
                      {player.name}
                    </h2>
                    <p className="text-yellow-400 text-sm">
                      {player.role}
                    </p>
                  </div>

                </div>

                {/* PHONE */}
                <p className="text-gray-400 text-sm">
                  📞 {player.phone}
                </p>
              </div>
            );
          })}

        </div>
      )}

      {/* FULL SCREEN IMAGE */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-h-[80vh]"
          />
        </div>
      )}
    </div>
  );
}