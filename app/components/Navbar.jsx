"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "Matches", path: "/matches" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Registration", path: "/registration" },
    { name: "Location", path: "/location" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-6 py-4 text-white relative z-50">

        {/* LOGO */}
        <div className="text-xl font-bold">BPL</div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8 text-sm">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className="hover:text-yellow-400 transition">
              {link.name}
            </Link>
          ))}
        </div>

        {/* DESKTOP BUTTON */}
        <div className="hidden md:block">
          <Link href="/player-registration">
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg">
              Player Registration
            </button>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-[#0a0f1e] z-50 flex flex-col items-center justify-center text-white">

          <button
            className="absolute top-6 right-6 text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>

          <div className="flex flex-col gap-6 text-xl text-center">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
            ))}

            <Link href="/player-registration" onClick={() => setMenuOpen(false)}>
              <button className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                Player Registration
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}