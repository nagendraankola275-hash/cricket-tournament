"use client";

import Image from "next/image";

const teams = [
  {
    id: 1,
    name: "Vaishya Titans",
    logo: "/team1.png",
  },
  {
    id: 2,
    name: "The Shetti's XI",
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

        {teams.map((team, index) => (
          <div
            key={team.id}
            className="
              relative
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl
              p-6
              flex flex-col items-center
              hover:scale-105 hover:border-yellow-400/40
              hover:shadow-[0_0_25px_rgba(255,165,0,0.3)]
              transition duration-300
              cursor-pointer
            "
          >

            {/* 🔥 PREMIUM GLOW ONLY FIRST 2 */}
            {index < 2 && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 blur-xl"></div>
            )}

            {/* ✅ FIXED LOGO SIZE (IMPORTANT FIX) */}
            <div className="w-[140px] h-[140px] flex items-center justify-center mb-4 relative z-10">
              <Image
                src={team.logo}
                alt={team.name}
                width={140}
                height={140}
                className={`
                  object-contain max-h-full max-w-full
                  ${index < 2
                    ? "drop-shadow-[0_0_25px_rgba(255,165,0,0.6)]"
                    : "opacity-80"
                  }
                `}
              />
            </div>

            {/* NAME */}
            <h2 className="text-lg font-semibold text-center relative z-10">
              {team.name}
            </h2>

          </div>
        ))}

      </div>
    </div>
  );
}