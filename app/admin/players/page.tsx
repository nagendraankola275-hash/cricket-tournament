"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

// ✅ TYPE
type Player = {
  name: string;
  phone: string;
  role: string;
};

export default function AdminPlayersPage() {
  // 🔐 AUTH STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const ADMIN_PASSWORD = "Naags@3570";

  // ✅ PLAYER STATE
  const [players, setPlayers] = useState<Player[]>([
    { name: "", phone: "", role: "" },
  ]);

  // ✅ VISIBILITY STATE
  const [showPlayers, setShowPlayers] = useState(false);

  // 🔑 LOGIN
  const handleLogin = () => {
    if (inputPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Wrong password ❌");
    }
  };

  // ✏️ INPUT CHANGE
  const handleChange = (
    index: number,
    field: keyof Player,
    value: string
  ) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  // ➕ ADD PLAYER FIELD
  const addPlayerField = () => {
    setPlayers([...players, { name: "", phone: "", role: "" }]);
  };

  // 💾 SAVE PLAYERS
  const handleSubmit = async () => {
    try {
      for (let player of players) {
        if (player.name && player.phone && player.role) {
          await addDoc(collection(db, "players"), {
            ...player,
            createdAt: new Date(),
          });
        }
      }

      alert("Players added successfully ✅");
      setPlayers([{ name: "", phone: "", role: "" }]);
    } catch (error) {
      console.error(error);
      alert("Error adding players ❌");
    }
  };

  // 🔥 REAL-TIME VISIBILITY LISTENER (FIXED)
  useEffect(() => {
    const ref = doc(db, "settings", "visibility"); // ✅ correct (small s)

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
        console.error("Snapshot error:", error);
      }
    );

    return () => unsub();
  }, []);

  // 🔥 TOGGLE FUNCTION (SAFE)
  const togglePlayersVisibility = async () => {
    const ref = doc(db, "settings", "visibility"); // ✅ correct (small s)

    await setDoc(ref, {
      showPlayers: !showPlayers,
    });

    setShowPlayers(!showPlayers);
  };

  // 🔒 LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <h1 className="text-2xl mb-4">Admin Access</h1>

          <input
            type="password"
            placeholder="Enter Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="px-4 py-2 rounded bg-black text-white mb-4 w-full"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black py-2 rounded"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  // ✅ ADMIN UI
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Admin - Add Players
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {players.map((player, index) => (
          <div
            key={index}
            className="bg-[#111827] p-4 rounded-xl border border-white/10"
          >
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Player Name"
                value={player.name}
                onChange={(e) =>
                  handleChange(index, "name", e.target.value)
                }
                className="p-3 rounded bg-[#1f2937]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={player.phone}
                onChange={(e) =>
                  handleChange(index, "phone", e.target.value)
                }
                className="p-3 rounded bg-[#1f2937]"
              />

              <select
                value={player.role}
                onChange={(e) =>
                  handleChange(index, "role", e.target.value)
                }
                className="p-3 rounded bg-[#1f2937]"
              >
                <option value="">Select Role</option>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All-Rounder">All-Rounder</option>
                <option value="Wicket Keeper">Wicket Keeper</option>
              </select>
            </div>
          </div>
        ))}

        {/* ➕ ADD */}
        <button
          onClick={addPlayerField}
          className="w-full py-3 bg-blue-500 rounded"
        >
          + Add Player
        </button>

        {/* 🚀 SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-yellow-400 text-black rounded"
        >
          Submit Players 🚀
        </button>

        {/* 🔥 TOGGLE */}
        <button
          onClick={togglePlayersVisibility}
          className={`w-full py-3 rounded mt-4 text-white ${
            showPlayers ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {showPlayers ? "Hide Players ❌" : "Show Players ✅"}
        </button>
      </div>
    </div>
  );
}