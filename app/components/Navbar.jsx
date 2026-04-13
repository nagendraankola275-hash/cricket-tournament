"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // ✅ detect touch device
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    setIsTouchDevice(touch);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "Matches", path: "/matches" },
    { name: "Sponsors", path: "/sponsors" },
    { name: "Player List", path: "/player-list" },
    { name: "Updates", path: "/updates" },
    { name: "Location", path: "/location" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="w-full bg-[#020617]/80 backdrop-blur-md border-b border-white/10 text-white sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 md:px-10 py-4">

        {/* LOGO */}
        <Link href="/">
          <Image
            src="/bpl-banner.png"
            alt="BPL"
            width={200}
            height={60}
            className="h-[50px] w-auto hover:scale-105 transition"
          />
        </Link>

        {/* ✅ DESKTOP MENU (disable on touch devices) */}
        {!isTouchDevice && (
          <div className="hidden md:flex items-center gap-10 text-sm font-medium">

            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link key={item.name} href={item.path} className="relative group">
                  <span
                    className={`transition ${
                      isActive ? "text-yellow-400" : "text-gray-300"
                    } group-hover:text-yellow-400`}
                  >
                    {item.name}
                  </span>

                  <span
                    className={`
                      absolute left-0 -bottom-1 h-[2px] w-full
                      bg-gradient-to-r from-yellow-400 to-orange-500
                      transition-transform duration-300 origin-left
                      ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }
                    `}
                  ></span>
                </Link>
              );
            })}
          </div>
        )}

        {/* ✅ DESKTOP BUTTON (disable on touch devices) */}
        {!isTouchDevice && (
          <div className="hidden md:block">
            <Link
              href="/player-registration"
              className="
                px-6 py-2 rounded-full
                bg-gradient-to-r from-yellow-400 to-orange-500
                text-black font-semibold
                hover:scale-105 transition
                shadow-[0_0_20px_rgba(255,165,0,0.4)]
              "
            >
              Player Registration Form
            </Link>
          </div>
        )}

        {/* ✅ MOBILE MENU BUTTON (always for touch devices) */}
        {isTouchDevice && (
          <button
            className="text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        )}

      </div>

      {/* MOBILE MENU */}
      {menuOpen && isTouchDevice && (
        <div className="flex flex-col items-center gap-4 pb-4 bg-[#020617]">

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              {item.name}
            </Link>
          ))}

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