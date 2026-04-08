"use client";

const players = [
  { id: 1, name: "Nagendra", role: "All-Rounder" },
  { id: 2, name: "Prasad", role: "Batsman" },
  { id: 3, name: "Ravi", role: "Bowler" },
  { id: 4, name: "Kiran", role: "All-Rounder" },
  { id: 5, name: "Manoj", role: "Batsman" },
  { id: 6, name: "Suresh", role: "Bowler" },
  { id: 7, name: "Ajay", role: "All-Rounder" },
  { id: 8, name: "Vikas", role: "Batsman" },
  { id: 9, name: "Arjun", role: "Bowler" },
  { id: 10, name: "Deepak", role: "All-Rounder" },
  { id: 11, name: "Rahul", role: "Batsman" },
  { id: 12, name: "Mahesh", role: "Bowler" },
  { id: 13, name: "Rohit", role: "All-Rounder" },
  { id: 14, name: "Naveen", role: "Batsman" },
  { id: 15, name: "Sunil", role: "Bowler" },
  { id: 16, name: "Vinay", role: "All-Rounder" },
  { id: 17, name: "Harish", role: "Batsman" },
  { id: 18, name: "Girish", role: "Bowler" },
  { id: 19, name: "Lokesh", role: "All-Rounder" },
  { id: 20, name: "Karthik", role: "Batsman" },
  { id: 21, name: "Santosh", role: "Bowler" },
  { id: 22, name: "Anil", role: "All-Rounder" },
  { id: 23, name: "Shiva", role: "Batsman" },
  { id: 24, name: "Ramesh", role: "Bowler" },
  { id: 25, name: "Tejas", role: "All-Rounder" },
  { id: 26, name: "Darshan", role: "Batsman" },
  { id: 27, name: "Pavan", role: "Bowler" },
  { id: 28, name: "Kunal", role: "All-Rounder" },
  { id: 29, name: "Chandan", role: "Batsman" },
  { id: 30, name: "Yogesh", role: "Bowler" },
];

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-6 py-10">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Players List
      </h1>

      {/* LIST */}
      <div className="max-w-4xl mx-auto space-y-4">

        {players.map((player) => (
          <div
            key={player.id}
            className="
              bg-white/5 backdrop-blur-lg
              border border-white/10
              rounded-xl
              px-6 py-4
              flex justify-between items-center
              hover:border-yellow-400/40
              transition
            "
          >
            {/* NAME */}
            <span className="text-lg font-semibold">
              {player.id}. {player.name}
            </span>

            {/* ROLE */}
            <span className="text-sm text-gray-400">
              {player.role}
            </span>
          </div>
        ))}

      </div>
    </div>
  );
}