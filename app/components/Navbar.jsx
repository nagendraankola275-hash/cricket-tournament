"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#020617] border-b border-white/5 text-white">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/bpl-banner.png"
            alt="BPL"
            width={200}
            height={60}
            className="h-[50px] w-auto"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-sm text-gray-300">

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
            Player List
          </Link>

          {/* ✅ ADDED */}
          <Link href="/updates" className="hover:text-yellow-400 transition">
            Updates
          </Link>

          <Link href="/location" className="hover:text-yellow-400 transition">
            Location
          </Link>

          <Link href="/contact" className="hover:text-yellow-400 transition">
            Contact Us
          </Link>

        </div>

        {/* RIGHT BUTTON */}
        <div className="hidden md:block">
          <Link
            href="/player-registration"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition"
          >
            Player Registration Form
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-4 bg-[#020617]">

          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/teams" onClick={() => setMenuOpen(false)}>Teams</Link>
          <Link href="/matches" onClick={() => setMenuOpen(false)}>Matches</Link>
          <Link href="/sponsors" onClick={() => setMenuOpen(false)}>Sponsors</Link>
          <Link href="/registration" onClick={() => setMenuOpen(false)}>Player List</Link>

          {/* ✅ ADDED */}
          <Link href="/updates" onClick={() => setMenuOpen(false)}>
            Updates
          </Link>

          <Link href="/location" onClick={() => setMenuOpen(false)}>Location</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</Link>

          <Link
            href="/player-registration"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold"
          >
            Player Registration
          </Link>

        </div>
      )}
    </div>
  );
}