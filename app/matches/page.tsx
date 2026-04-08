"use client";

const matches = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  teamA: "Bangalore Blasters",
  teamB: "Royal Strikers",
  date: "May 31, 2026",
  time: "6:00 PM",
  venue: "Bangalore Stadium",
  status: i < 5 ? "Completed" : i < 10 ? "Live" : "Upcoming",
}));

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-6 py-10">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Match Schedule
      </h1>

      {/* MATCH LIST */}
      <div className="max-w-5xl mx-auto space-y-6">

        {matches.map((match) => (
          <div
            key={match.id}
            className="
              bg-white/5 backdrop-blur-lg
              border border-white/10
              rounded-xl
              px-6 py-5
              flex flex-col md:flex-row md:items-center md:justify-between
              hover:border-yellow-400/40
              transition
            "
          >
            {/* TEAMS */}
            <div className="text-lg font-semibold">
              {match.teamA} <span className="text-gray-400">vs</span> {match.teamB}
            </div>

            {/* DATE + TIME */}
            <div className="text-sm text-gray-400 mt-2 md:mt-0">
              {match.date} • {match.time}
            </div>

            {/* STATUS */}
            <div
              className={`
                mt-3 md:mt-0 px-4 py-1 rounded-full text-xs font-semibold
                ${
                  match.status === "Live"
                    ? "bg-red-500/20 text-red-400"
                    : match.status === "Completed"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }
              `}
            >
              {match.status}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
