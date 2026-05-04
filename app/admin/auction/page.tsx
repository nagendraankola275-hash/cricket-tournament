"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, setDoc, onSnapshot } from "firebase/firestore";

export default function AdminAuctionPage() {

  // 🔐 AUTH
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "Naags@3570";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("Wrong password");
    }
  };

  // 🧾 PLAYER DATA
  const [players, setPlayers] = useState<any[]>([]);

  const [player, setPlayer] = useState("");
  const [status, setStatus] = useState("WAITING");
  const [team, setTeam] = useState("");
  const [credits, setCredits] = useState("");

  // ✅ PLAYER VISIBILITY
  const [isVisible, setIsVisible] = useState(true);

  // ✅ AUCTION VISIBILITY (NEW)
  const [showAuction, setShowAuction] = useState(false);

  // 🔥 FETCH PLAYERS
  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(collection(db, "players"));
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(list);
    };

    fetchPlayers();
  }, []);

  // 🔥 FETCH AUCTION VISIBILITY
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "settings", "visibility"),
      (docSnap) => {
        if (docSnap.exists()) {
          setShowAuction(docSnap.data().showAuction === true);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔥 SYNC PLAYER DATA
  useEffect(() => {
    if (!player) return;

    const selected = players.find((p) => p.id === player);

    if (selected) {
      setStatus(selected.status || "WAITING");
      setTeam(selected.team || "");
      setCredits(selected.credits || "");
      setIsVisible(selected.isVisible !== false);
    }
  }, [player, players]);

  // 🚀 UPDATE PLAYER
  const handleUpdate = async () => {
    if (!player) return alert("Select player");

    try {
      await updateDoc(doc(db, "players", player), {
        status,
        team: status === "SOLD" ? team : "",
        credits: status === "SOLD" ? Number(credits) : 0,
        isVisible,
      });

      alert("Player updated successfully 🔥");

      setPlayer("");
      setStatus("WAITING");
      setTeam("");
      setCredits("");
      setIsVisible(true);

    } catch (error) {
      console.error(error);
      alert("Error updating player");
    }
  };

  // 🚀 TOGGLE AUCTION
  const toggleAuction = async () => {
    await setDoc(
      doc(db, "settings", "visibility"),
      {
        showAuction: !showAuction,
      },
      { merge: true }
    );

    alert(!showAuction ? "Auction is LIVE 🚀" : "Auction is HIDDEN ❌");
  };

  // 🔐 LOGIN SCREEN
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 w-[300px] text-center">

          <h2 className="text-xl font-semibold mb-6">Admin Access</h2>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 rounded bg-black border border-white/20"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-yellow-400 text-black py-2 rounded font-semibold"
          >
            Enter
          </button>

        </div>
      </div>
    );
  }

  // 🔥 ADMIN PANEL
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-6 py-12">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold text-center mb-10">
          🏏 Auction Admin Panel
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">

          {/* 🔥 AUCTION TOGGLE */}
          <div className="mb-6 text-center">
            <button
              onClick={toggleAuction}
              className={`w-full py-2 rounded-lg font-semibold ${
                showAuction ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {showAuction ? "Hide Auction ❌" : "Show Auction 🚀"}
            </button>
          </div>

          {/* PLAYER */}
          <select
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black"
          >
            <option value="">Select Player</option>

            {players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}

          </select>

          {/* STATUS */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black"
          >
            <option value="WAITING">WAITING</option>
            <option value="SOLD">SOLD</option>
            <option value="UNSOLD">UNSOLD</option>
          </select>

          {/* VISIBILITY */}
          <div className="mb-4 flex items-center justify-between">
            <span>Show in Auction</span>

            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`px-4 py-1 rounded ${
                isVisible ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {isVisible ? "Visible" : "Hidden"}
            </button>
          </div>

          {/* IF SOLD */}
          {status === "SOLD" && (
            <>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full mb-4 p-2 rounded bg-black"
              >
                <option value="">Select Team</option>
                <option value="Vaishya Titans">Vaishya Titans</option>
                <option value="The Shetti's XI">The Shetti's XI</option>
                <option value="KVS Cricketers">KVS Cricketers</option>
                <option value="Vaishya Power House">Vaishya Power House</option>
              </select>

              <input
                type="number"
                placeholder="Enter Credits"
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                className="w-full mb-4 p-2 rounded bg-black"
              />
            </>
          )}

          {/* SUBMIT */}
          <button
            onClick={handleUpdate}
            className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold"
          >
            Update Player
          </button>

        </div>

      </div>

    </div>
  );
}