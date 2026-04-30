"use client";

import Navbar from "../components/Navbar";

export default function MatchesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
      <Navbar />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-12">
        <h1 className="mb-10 text-center text-4xl font-bold md:text-5xl">
          Match <span className="text-yellow-400">Updates</span>
        </h1>

        <div className="w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-xl backdrop-blur-md">
          <div className="relative border-b border-white/10 bg-gradient-to-r from-[#101722] via-[#182132] to-[#101722] px-6 py-8">
            <div className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-yellow-400/10 blur-2xl" />
            <div className="absolute -right-8 bottom-4 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl" />

            <div className="relative flex items-center justify-center gap-6">
              <div className="relative h-16 w-16 rounded-full border-2 border-yellow-400/70 bg-[#0f172a]">
                <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-[0_0_18px_rgba(239,68,68,0.45)]" />
              </div>
              <div className="relative h-16 w-7 rotate-[28deg] rounded-full bg-gradient-to-b from-[#f6d47a] to-[#b7791f] shadow-[0_0_18px_rgba(245,158,11,0.35)]" />
            </div>

            <p className="relative mt-6 text-center text-xs font-semibold uppercase tracking-[0.34em] text-yellow-300/90">
              Match Announcement
            </p>
          </div>

          <div className="px-6 py-8 text-center md:px-10">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Official Match Schedule Will Be Announced Soon
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-gray-200 md:text-lg">
              The full match schedule for Bangalore Premier League 2026 will be
              released shortly. Stay tuned for fixture details, timings, and
              venue updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
