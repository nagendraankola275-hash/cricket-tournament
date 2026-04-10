"use client";

import Navbar from "../components/Navbar";

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 py-12">

        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center">
          Latest <span className="text-yellow-400">Updates</span>
        </h1>

        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">

          <p className="text-gray-300 text-lg">
            • Players  Auction  Registration  Form  is  opened  Register  soon 
          </p>

        </div>

      </div>

    </div>
  );
}