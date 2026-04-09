"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function RegistrationPage() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const querySnapshot = await getDocs(collection(db, "players"));

      const playersData: any[] = [];

      querySnapshot.forEach((doc) => {
        playersData.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPlayers(playersData);
    };

    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b1220] text-white p-6">

      <h1 className="text-3xl font-bold mb-6 text-center">
        Registered Players
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {players.map((player) => (
          <div
            key={player.id}
            className="bg-[#111827] p-4 rounded-xl shadow"
          >
            <h2 className="text-xl font-semibold text-yellow-400">
              {player.name}
            </h2>
            <p className="text-gray-300">📞 {player.phone}</p>
            <p className="text-gray-400">Role: {player.role}</p>
            <p className="text-green-400 text-sm mt-2">
              💳 Payment Ref: {player.paymentId}
            </p>
          </div>
        ))}

      </div>

    </div>
  );
}