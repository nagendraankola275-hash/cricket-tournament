"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Teams", path: "/teams" },
    { name: "Matches", path: "/matches" },
    { name: "Auction Live", path: "/auction-live" },
    { name: "Gallery", path: "/gallery" },
    { name: "Icon Players", path: "/iconic-players" },
    { name: "Sponsor List", path: "/sponsors" },
    { name: "Player List", path: "/player-list" },
    { name: "Updates", path: "/updates" },
    { name: "Location", path: "/location" },
    { name: "Contact Us", path: "/contact" },
  ];

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  return (
    <div className="w-full bg-[#020617]/80 backdrop-blur-md border-b border-white/10 text-white sticky top-0 z-50">
      <div className="relative flex min-h-[72px] items-center px-4 py-3 md:px-10">
        {!isHomePage && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-white transition hover:border-yellow-400/60 hover:text-yellow-300"
          >
            ←
          </button>
        )}

        <Link
          href="/"
          className="shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/bpl-banner.png"
            alt="BPL"
            width={200}
            height={60}
            className="h-[36px] w-auto transition hover:scale-105 md:h-[50px]"
          />
        </Link>

        <div className="hidden w-full items-center justify-center gap-6 pl-6 text-sm font-medium lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className="relative group"
                >
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

        {!isHomePage && (
          <p className="ml-3 hidden text-sm font-medium text-gray-300 md:block lg:hidden">
            Back
          </p>
        )}

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="ml-auto text-3xl leading-none text-white lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col items-center gap-4 border-t border-white/10 bg-[#020617] px-4 py-4 lg:hidden">
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
