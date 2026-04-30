"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const getTouchDeviceState = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const [isTouchDevice, setIsTouchDevice] = useState(getTouchDeviceState);

  useEffect(() => {
    const updateTouchState = () => {
      setIsTouchDevice(getTouchDeviceState());
    };

    window.addEventListener("resize", updateTouchState);
    return () => window.removeEventListener("resize", updateTouchState);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "Matches", path: "/matches" },
    { name: "Sponsor List", path: "/sponsors" },
    { name: "Player List", path: "/player-list" },
    { name: "Updates", path: "/updates" },
    { name: "Location", path: "/location" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <div className="w-full bg-[#020617]/80 backdrop-blur-md border-b border-white/10 text-white sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="relative flex items-center justify-between px-4 md:px-10 py-4">

        {/* LOGO */}
        <Link href="/" className="shrink-0 md:absolute md:left-10 md:top-1/2 md:-translate-y-1/2">
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
          <div className="hidden w-full md:flex items-center justify-center gap-8 lg:gap-10 text-sm font-medium">

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

        {!isTouchDevice && (
          <Link
            href="/iconic-players"
            className="hidden md:inline-flex md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2 rounded-full border border-yellow-400/50 bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,165,0,0.25)] transition hover:scale-105"
          >
            Iconic Players
          </Link>
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

          <Link
            href="/iconic-players"
            onClick={() => setMenuOpen(false)}
            className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2 text-sm font-semibold text-black"
          >
            Iconic Players
          </Link>

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

        </div>
      )}
    </div>
  );
}
