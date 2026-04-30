"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";

const players = [
  { image: "/Icon1.png", name: "Harsha S", imageClassName: "object-[center_28%]" },
  { image: "/Icon2.png", name: "Milind Gaonkar", imageClassName: "object-[center_26%]" },
  { image: "/Icon3.png", name: "Vijay Shetti", imageClassName: "object-[center_18%]" },
  { image: "/Icon4.png", name: "Nikhil Gullapur", imageClassName: "object-[center_30%]" },
];

export default function IconicPlayersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#08101d] via-[#0e1628] to-[#171f33] text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.24)] md:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-yellow-300/90">
              Iconic Players
            </p>
            <h1 className="mt-3 text-3xl md:text-5xl font-bold text-white">
              Featured Player Icons
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-gray-300">
              Meet the four iconic players featured for Bangalore Premier League 2026.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {players.map((player) => (
              <div
                key={player.name}
                className="rounded-[28px] border border-white/10 bg-[#101722]/88 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                <Image
                  src={player.image}
                  alt={player.name}
                  width={180}
                  height={180}
                  className={`mx-auto h-[180px] w-[180px] rounded-full border-2 border-yellow-400 object-cover shadow-lg ${player.imageClassName}`}
                />
                <p className="mt-5 text-lg font-semibold text-white">
                  {player.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
