"use client";

import { useState } from "react";
import Image from "next/image";

export default function TeamsPage() {

  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const teams = [
    {
      id: 1,
      name: "Vaishya Titans",
      logo: "/team1.png",
      owner: "Raghav Shetti",
      ownerImage: "/owner1.png",
      description: "A dominant force known for power hitters and fearless gameplay.",
    },
    {
      id: 2,
      name: "The Shetti's XI",
      logo: "/team2-new.png",
      owner: "Ajay Shetti",
      ownerImage: "/owner2.png",
      description: "A balanced squad with strong match-winning performers.",
    },
    {
       id: 3,
       name: "KVS Cricketers",
       logo: "/team3-new.png",   // ✅ FIXED HERE
       owner: "KVS Akshay",
       ownerImage: "/owner3.png",
       description: "Energetic and aggressive team with strong leadership.",
    },
    {
      id: 4,
      name: "Golden Eagles",
      logo: "/team4.png",
      owner: "Team Owner",
      ownerImage: "/team4.png",
      description: "Upcoming team ready to challenge the best in the league.",
    },
  ];

  // 👉 IF TEAM SELECTED → SHOW FULL PAGE
  if (selectedTeam) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-6 py-12">

        {/* BACK BUTTON */}
        <button
          onClick={() => setSelectedTeam(null)}
          className="mb-8 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
        >
          ← Back to Teams
        </button>

        {/* TEAM SECTION */}
        <div className="max-w-4xl mx-auto text-center">

          {/* TEAM LOGO */}
          <Image
            src={selectedTeam.logo}
            alt="team"
            width={160}
            height={160}
            className="mx-auto mb-6"
          />

          {/* TEAM NAME */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {selectedTeam.name}
          </h1>

          {/* OWNER CARD */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">

            <Image
              src={selectedTeam.ownerImage}
              alt="owner"
              width={140}
              height={140}
              className="mx-auto rounded-full border-4 border-yellow-400"
            />

            <p className="text-gray-400 mt-4">Team Owner</p>

            <h2 className="text-2xl font-semibold text-yellow-400 mt-2">
              {selectedTeam.owner}
            </h2>

            {/* INTRO */}
            <p className="text-gray-300 mt-6 leading-relaxed">
              {selectedTeam.description}
            </p>

          </div>

          {/* FUTURE PLAYERS SECTION */}
          <div className="mt-10 text-gray-500">
            Players will be displayed here soon...
          </div>

        </div>

      </div>
    );
  }

  // 👉 DEFAULT TEAMS GRID
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-8 py-12">

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Teams
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {teams.map((team, index) => (
          <div
            key={team.id}
            onClick={() => setSelectedTeam(team)}
            className="
              relative
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              p-6
              flex flex-col items-center
              hover:scale-105 hover:border-yellow-400/40
              hover:shadow-[0_0_30px_rgba(255,165,0,0.4)]
              transition duration-300
              cursor-pointer
            "
          >

            {/* GLOW */}
            {index < 2 && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 blur-xl"></div>
            )}

            <Image
              src={team.logo}
              alt={team.name}
              width={140}
              height={140}
              className="mb-4"
            />

            <h2 className="text-lg font-semibold text-center">
              {team.name}
            </h2>

            <p className="text-sm text-gray-400 mt-2 italic">
              Owner: <span className="text-yellow-400">{team.owner}</span>
            </p>

          </div>
        ))}

      </div>

    </div>
  );
}