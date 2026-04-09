"use client";

import Navbar from "../components/Navbar";

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center px-4 py-12">

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
          Sponsors & <span className="text-yellow-400">Contributors</span>
        </h1>

        {/* MESSAGE CARD */}
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl text-center">

          <p className="text-gray-300 text-base md:text-lg">
            Contributors list will be released soon.
          </p>

        </div>

      </div>

    </div>
  );
}