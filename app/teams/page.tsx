"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";

type Team = {
  id: number;
  name: string;
  logo: string;
  owner: string;
  ownerImage: string;
  description: string;
  iconPlayer: string; // ✅ NEW
};

export default function TeamsPage() {

  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const teams: Team[] = [
    {
      id: 1,
      name: "Vaishya Titans",
      logo: "/team1.png",
      owner: "Raghav Shetti",
      ownerImage: "/owner1.png",
      description: "A dominant force known for power hitters and fearless gameplay.",
      iconPlayer: "Harsha S",
    },
    {
      id: 2,
      name: "The Shetti's XI",
      logo: "/team2-new.png",
      owner: "Ajay Shetti",
      ownerImage: "/owner2.png",
      description: "A balanced squad with strong match-winning performers.",
      iconPlayer: "Milind Gaonkar",
    },
    {
      id: 3,
      name: "KVS Cricketers",
      logo: "/team3-new.png",
      owner: "Akshay Shetti",
      ownerImage: "/owner3.png",
      description: "Energetic and aggressive team with strong leadership.",
      iconPlayer: "Nikhil Gullapur",
    },
    {
      id: 4,
      name: "Vaishya Power House",
      logo: "/team4.png",
      owner: "Harsha Gaonkar",
      ownerImage: "/owner4.png",
      description: "Upcoming team ready to challenge the best in the league.",
      iconPlayer: "Vijay Shetti",
    },
  ];

  // 👉 TEAM DETAIL PAGE
  if (selectedTeam) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
        <Navbar />

        <div className="px-6 py-12">

          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-8 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            ← Back to Teams
          </button>

          <div className="max-w-4xl mx-auto text-center">

            <Image
              src={selectedTeam.logo}
              alt="team"
              width={160}
              height={160}
              className="mx-auto mb-6"
            />

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {selectedTeam.name}
            </h1>

            <div className="
              bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl
              transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]
            ">
              <div className="relative mx-auto w-fit">
                <Image
                  src={selectedTeam.ownerImage}
                  alt="owner"
                  width={140}
                  height={140}
                  className="mx-auto rounded-full border-4 border-yellow-400"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-yellow-400/30 bg-[#111827] px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
                  Owner
                </div>
              </div>

              <p className="text-gray-400 mt-4">Team Owner</p>

              <h2 className="text-2xl font-semibold text-yellow-400 mt-2">
                {selectedTeam.owner}
              </h2>

              {/* ✅ ICON PLAYER ADDED */}
              <p className="text-sm text-gray-400 mt-3">
                🎯 Icon Player:
                <span className="text-orange-400 ml-2 font-medium">
                  {selectedTeam.iconPlayer}
                </span>
              </p>

              <p className="text-gray-300 mt-6 leading-relaxed">
                {selectedTeam.description}
              </p>

            </div>

            <div className="mt-10 text-gray-500">
              Players will be displayed here soon...
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 👉 TEAMS GRID
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
      <Navbar />

      <div className="px-8 py-12">

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

                transition-all duration-300 ease-in-out
                hover:-translate-y-2
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]
                hover:border-yellow-400/40
                active:scale-95

                cursor-pointer
                group
              "
            >

              {index < 4 && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 blur-xl"></div>
              )}

              <Image
                src={team.logo}
                alt={team.name}
                width={140}
                height={140}
                className="mb-4 transition duration-300 group-hover:scale-105"
              />

              <h2 className="text-lg font-semibold text-center">
                {team.name}
              </h2>

              <p className="text-sm text-gray-400 mt-2 italic">
                Owner: <span className="text-yellow-400">{team.owner}</span>
              </p>

              {/* ✅ ICON PLAYER IN CARD */}
              <p className="text-sm text-gray-400 mt-1 italic">
                Icon: <span className="text-orange-400">{team.iconPlayer}</span>
              </p>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
