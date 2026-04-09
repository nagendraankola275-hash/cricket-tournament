"use client";

import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div
      className="
        w-full flex items-center justify-between
        px-10 py-4
        bg-gradient-to-r from-[#020617]/90 via-[#020617]/70 to-[#020617]/90
        backdrop-blur-xl
        border-b border-white/5
      "
    >
      {/* LEFT - BANNER LOGO */}
      <Link href="/" className="flex items-center">
        <Image
          src="/bpl-banner.png"
          alt="BPL Banner"
          width={320}
          height={100}
          className="h-[60px] w-auto object-contain"
          priority
        />
      </Link>

      {/* CENTER MENU */}
      <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">

        <Link href="/" className="hover:text-yellow-400 transition">
          Home
        </Link>

        <Link href="/teams" className="hover:text-yellow-400 transition">
          Teams
        </Link>

        <Link href="/matches" className="hover:text-yellow-400 transition">
          Matches
        </Link>

        <Link href="/sponsors" className="hover:text-yellow-400 transition">
          Sponsors
        </Link>

        <Link href="/registration" className="hover:text-yellow-400 transition">
          Registration
        </Link>

        <Link href="/location" className="hover:text-yellow-400 transition">
          Location
        </Link>

      </div>

      {/* RIGHT BUTTON */}
      <div className="flex items-center">
        <Link
          href="/player-registration"
          className="
            px-8 py-2 rounded-full
            bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500
            text-black font-semibold
            whitespace-nowrap
            hover:scale-105
            transition
            shadow-lg shadow-orange-500/20
          "
        >
          Player Registration Form
        </Link>
      </div>
    </div>
  );
}