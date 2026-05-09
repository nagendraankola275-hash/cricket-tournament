"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  writeBatch,
} from "firebase/firestore";

type Player = {
  id: string;
  name: string;
  status?: string;
  team?: string;
  credits?: number;
  isVisible?: boolean;
  auctionOrder?: number;
};

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
  const [players, setPlayers] = useState<Player[]>([]);

  const [player, setPlayer] = useState("");
  const [playerSearch, setPlayerSearch] = useState("");
  const [status, setStatus] = useState("WAITING");
  const [team, setTeam] = useState("");
  const [credits, setCredits] = useState("");

  // ✅ PLAYER VISIBILITY
  const [isVisible, setIsVisible] = useState(true);

  // ✅ AUCTION VISIBILITY (NEW)
  const [showAuction, setShowAuction] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      const list: Player[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Player, "id">),
      }));
      setPlayers(list);
    });

    return () => unsubscribe();
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

  const handlePlayerChange = (playerId: string) => {
    setPlayer(playerId);

    const selected = players.find((p) => p.id === playerId);

    if (!selected) {
      setStatus("WAITING");
      setTeam("");
      setCredits("");
      setIsVisible(true);
      return;
    }

    setStatus(selected.status || "WAITING");
    setTeam(selected.team || "");
    setCredits(selected.credits ? String(selected.credits) : "");
    setIsVisible(true);
  };

  const filteredPlayers = players.filter((playerItem) =>
    playerItem.name.toLowerCase().includes(playerSearch.toLowerCase().trim())
  );

  const handleSearchChange = (value: string) => {
    setPlayerSearch(value);

    const query = value.toLowerCase().trim();

    if (!query) {
      return;
    }

    const exactMatch = players.find(
      (playerItem) => playerItem.name.toLowerCase() === query
    );

    if (exactMatch) {
      handlePlayerChange(exactMatch.id);
      return;
    }

    const startsWithMatch = players.find((playerItem) =>
      playerItem.name.toLowerCase().startsWith(query)
    );

    if (startsWithMatch) {
      handlePlayerChange(startsWithMatch.id);
      return;
    }

    const containsMatches = players.filter((playerItem) =>
      playerItem.name.toLowerCase().includes(query)
    );

    if (containsMatches.length === 1) {
      handlePlayerChange(containsMatches[0].id);
    }
  };

  // 🚀 UPDATE PLAYER
  const handleUpdate = async () => {
    if (!player) return alert("Select player");

    try {
      const selected = players.find((p) => p.id === player);
      const highestAuctionOrder = players.reduce((max, current) => {
        return Math.max(max, current.auctionOrder ?? 0);
      }, 0);

      const nextAuctionOrder =
        isVisible && !selected?.auctionOrder ? highestAuctionOrder + 1 : selected?.auctionOrder ?? 0;

      await updateDoc(doc(db, "players", player), {
        status,
        team: status === "SOLD" ? team : "",
        credits: status === "SOLD" ? Number(credits) : 0,
        isVisible,
        auctionOrder: isVisible ? nextAuctionOrder : selected?.auctionOrder ?? 0,
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

  const resetAuctionList = async () => {
    try {
      const batch = writeBatch(db);

      players.forEach((playerData) => {
        batch.update(doc(db, "players", playerData.id), {
          status: "WAITING",
          team: "",
          credits: 0,
          isVisible: false,
          auctionOrder: 0,
        });
      });

      await batch.commit();

      setPlayer("");
      setStatus("WAITING");
      setTeam("");
      setCredits("");
      setIsVisible(true);

      alert("Auction list reset successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Error resetting auction list");
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

          <div className="mb-6 text-center">
            <button
              onClick={resetAuctionList}
              className="w-full rounded-lg bg-slate-700 py-2 font-semibold text-white hover:bg-slate-600"
            >
              Reset Auction List
            </button>
          </div>

          <input
            type="text"
            placeholder="Search player name"
            value={playerSearch}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black border border-white/10"
          />

          {/* PLAYER */}
          <select
            value={player}
            onChange={(e) => handlePlayerChange(e.target.value)}
            className="w-full mb-4 p-2 rounded bg-black"
          >
            <option value="">Select Player</option>

            {filteredPlayers.map((p) => (
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
                <option value="The Shetti's XI">The Shetti&apos;s XI</option>
                <option value="KVS Cricketers">KVS Cricketers</option>
                <option value="Vaishya Power House">Vaishya Power House</option>
              </select>

              <input
                type="number"
                placeholder="Enter Points"
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
