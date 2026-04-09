"use client";

import Image from "next/image";

const teams = [
  {
    id: 1,
    name: "Vaishya Titans",
    logo: "/team1.png",
    owner: "Raghav Shetti",
  },
  {
    id: 2,
    name: "The Shetti's XI",
    logo: "/team2-new.png", // ✅ FIXED (no ?v=2)
    owner: "Ajay Shetti",
  },
  {
    id: 3,
    name: "Thunder Warriors",
    logo: "/team3.png",
    owner: "Team Owner",
  },
  {
    id: 4,
    name: "Golden Eagles",
    logo: "/team4.png",
    owner: "Team Owner",
  },
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-8 py-12">

      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Our Teams
      </h1>

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
              hover:shadow-[0_0_30px_rgba(255,165,0,0.4)]
              transition duration-300
              cursor-pointer
              group
            "
          >

            {index < 2 && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 blur-xl"></div>
            )}

            <div className="w-[140px] h-[140px] flex items-center justify-center mb-4 relative z-10">
              <Image
                src={team.logo}
                alt={team.name}
                width={140}
                height={140}
                className={`
                  object-contain max-h-full max-w-full transition duration-300
                  ${index < 2
                    ? "drop-shadow-[0_0_25px_rgba(255,165,0,0.7)] group-hover:scale-110"
                    : "opacity-80 group-hover:scale-105"
                  }
                `}
              />
            </div>

            <h2 className="text-lg font-semibold text-center relative z-10">
              {team.name}
            </h2>

            <p className="text-sm text-gray-400 mt-2 relative z-10 italic">
              Owner: <span className="text-yellow-400 font-medium">{team.owner}</span>
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}