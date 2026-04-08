"use client";

import Image from "next/image";

const teams = [
  {
    id: 1,
    name: "Bangalore Blasters",
    logo: "/team1.png",
  },
  {
    id: 2,
    name: "Royal Strikers",
    logo: "/team2.png",
  },
  {
    id: 3,
    name: "Thunder Warriors",
    logo: "/team3.png",
  },
  {
    id: 4,
    name: "Golden Eagles",
    logo: "/team4.png",
  },
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-8 py-12">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Teams
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {teams.map((team) => (
          <div
            key={team.id}
            className="
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              p-6
              flex flex-col items-center
              hover:scale-105 hover:border-yellow-400/40
              transition duration-300
              cursor-pointer
            "
          >
            {/* LOGO */}
            <Image
              src={team.logo}
              alt={team.name}
              width={120}
              height={120}
              className="object-contain mb-4"
            />

            {/* NAME */}
            <h2 className="text-lg font-semibold text-center">
              {team.name}
            </h2>
          </div>
        ))}

      </div>
    </div>
  );
}