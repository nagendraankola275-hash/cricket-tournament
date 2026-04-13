"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const getTimeLeft = () => {
    const targetDate = new Date("2026-05-31T00:00:00");
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      s: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isLargeDesktop, setIsLargeDesktop] = useState(false);

  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touch);

    const updateViewport = () => {
      setIsLargeDesktop(window.innerWidth >= 1280);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const teams = [
    { name: "Vaishya Titans", logo: "/team1.png", owner: "/owner1.png" },
    { name: "The Shetti's XI", logo: "/team2-new.png", owner: "/owner2.png" },
    { name: "KVS Cricketers", logo: "/team3-new.png", owner: "/owner3.png" },
    { name: "Golden Eagles", logo: "/team4.png", owner: "/team4.png" },
  ];
  const reelTeams = [...teams, ...teams];

  useEffect(() => {
    const update = () => {
      setTimeLeft(getTimeLeft());
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#08101d]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/bpl-banner.png"
          alt="BPL background"
          fill
          priority
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#08101d]/96 via-[#0e1628]/88 to-[#1a1f35]/94" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/75" />
      </div>

      <Navbar />

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-12 left-[-120px] h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute right-[-140px] top-28 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />

        <img
          src="/sringeri.png"
          alt=""
          className="absolute top-28 left-[60px] w-[140px] opacity-70 hidden lg:block"
        />

        <img
          src="/ganesha.png"
          alt=""
          className="absolute top-28 right-[60px] w-[150px] opacity-80 hidden lg:block"
        />
      </div>

      <div className="flex flex-col items-center justify-center text-center relative z-10 px-4 py-10">
        <Image
          src="/bpl-logo.png"
          alt="BPL"
          width={600}
          height={600}
          className="h-[220px] md:h-[300px] lg:h-[360px] w-auto object-contain drop-shadow-[0_0_50px_rgba(255,165,0,0.55)]"
          priority
        />

        <h1 className="mt-8 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-white via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Bangalore Premier League
          </span>
          <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            2026
          </span>
        </h1>

        <p className="mt-4 max-w-xl text-gray-300 text-sm md:text-base">
          Experience the thrill of cricket like never before.
        </p>

        {isTouchDevice && (
          <div className="mt-8 w-full max-w-[240px]">
            <div className="relative h-[220px] overflow-hidden rounded-[28px] border border-white/8 bg-[#0b1220]/40 px-3 py-3 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 rounded-t-[28px] bg-gradient-to-b from-[#0b1220]/92 via-[#0b1220]/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 rounded-b-[28px] bg-gradient-to-t from-[#0b1220]/94 via-[#0b1220]/60 to-transparent" />
              <div className="team-reel-mobile">
                {reelTeams.map((team, index) => (
                  <div
                    key={`mobile-${team.name}-${index}`}
                    className="mb-3 flex min-h-[140px] flex-col items-center justify-center rounded-[22px] border border-white/7 bg-[#101722]/88 px-4 py-4 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <Image
                      src={team.logo}
                      alt={team.name}
                      width={72}
                      height={72}
                      className="object-contain"
                    />

                    <Image
                      src={team.owner}
                      alt={`${team.name} owner`}
                      width={54}
                      height={54}
                      className="mt-2 rounded-full border-2 border-yellow-400"
                    />

                    <p className="mt-2 text-sm font-semibold text-white">
                      {team.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isTouchDevice && (
        <div className="relative z-10 hidden w-full px-6 pb-8 md:block xl:hidden">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[30px] border border-white/10 bg-white/6 p-4 backdrop-blur-md shadow-xl">
            <div className="mb-3 flex items-center justify-between px-2">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-400/80">
                Featured Teams
              </p>
              <p className="text-xs text-gray-400">
                Swipe feel reel
              </p>
            </div>

            <div className="touch-team-strip">
              {[...teams, ...teams].map((team, index) => (
                <div
                  key={`touch-strip-${team.name}-${index}`}
                  className="mr-4 flex w-[220px] shrink-0 items-center gap-4 rounded-[24px] border border-white/8 bg-[#101722]/88 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={72}
                    height={72}
                    className="shrink-0 object-contain"
                  />

                  <div className="min-w-0 text-left">
                    <Image
                      src={team.owner}
                      alt={`${team.name} owner`}
                      width={52}
                      height={52}
                      className="mb-2 rounded-full border-2 border-yellow-400"
                    />
                    <p className="truncate text-sm font-semibold text-white">
                      {team.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isTouchDevice && isLargeDesktop && (
        <div className="hidden md:block absolute left-[40px] bottom-[120px] z-10 w-[220px]">
          <div className="relative h-[430px] overflow-hidden rounded-[30px] border border-white/8 bg-[#0b1220]/40 px-3 py-3 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 rounded-t-[30px] bg-gradient-to-b from-[#0b1220]/90 via-[#0b1220]/55 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 rounded-b-[30px] bg-gradient-to-t from-[#0b1220]/92 via-[#0b1220]/58 to-transparent" />
            <div className="team-reel">
              {reelTeams.map((team, index) => (
                <div
                  key={`${team.name}-${index}`}
                  className="mb-4 flex min-h-[185px] flex-col items-center justify-center rounded-[26px] border border-white/7 bg-[#101722]/88 px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={110}
                    height={110}
                    className="object-contain drop-shadow-[0_0_15px_rgba(255,165,0,0.45)]"
                  />

                  <Image
                    src={team.owner}
                    alt={`${team.name} owner`}
                    width={80}
                    height={80}
                    className="mt-3 rounded-full border-2 border-yellow-400 shadow-lg"
                  />

                  <p className="mt-3 text-sm md:text-base font-semibold text-white">
                    {team.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="pb-8 w-full flex justify-center relative z-10">
        <div
          className="
            flex flex-wrap justify-center items-center gap-6 md:gap-12
            px-6 py-5
            rounded-2xl
            bg-white/8 backdrop-blur-md
            border border-white/10
            shadow-xl
          "
        >
          {[
            { value: timeLeft.d, label: "DAYS" },
            { value: String(timeLeft.h).padStart(2, "0"), label: "HRS" },
            { value: String(timeLeft.m).padStart(2, "0"), label: "MIN" },
            { value: String(timeLeft.s).padStart(2, "0"), label: "SEC" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div
                className="
                  w-14 h-14 md:w-20 md:h-20
                  rounded-xl
                  bg-black/80
                  flex items-center justify-center
                  text-white
                  text-lg md:text-3xl
                  font-bold
                "
              >
                {item.value}
              </div>

              <p className="text-xs text-gray-300 mt-2">
                {item.label}
              </p>
            </div>
          ))}

          <div className="hidden md:block h-14 w-[2px] bg-gradient-to-b from-yellow-400 via-orange-500 to-yellow-400" />

          <div className="text-center md:text-left">
            <p className="text-xs text-gray-300 uppercase">Event Date</p>
            <p className="text-xl font-bold text-white">
              31 MAY 2026
            </p>
          </div>
        </div>
      </div>

      {isTouchDevice && (
        <div className="relative z-10 px-4 pb-12 md:hidden">
          <div className="poster-card poster-glow mx-auto max-w-sm overflow-hidden rounded-[30px] border border-white/10 bg-[#08111f]/85 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="relative px-5 pb-6 pt-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(239,68,68,0.28),transparent_38%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.28),transparent_36%),linear-gradient(135deg,rgba(10,15,28,0.92),rgba(14,22,40,0.84))]" />

              <div className="relative flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  Matchday Look
                </p>
                <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-yellow-300">
                  Live Energy
                </span>
              </div>

              <div className="relative mt-6 flex items-center justify-between gap-3">
                <div className="poster-side flex-1 rounded-[24px] border border-red-400/20 bg-gradient-to-b from-red-500/18 to-transparent px-3 py-4 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-red-400/30 bg-black/20">
                    <Image
                      src="/team2-new.png"
                      alt="Featured team"
                      width={74}
                      height={74}
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-white">
                    Fire Side
                  </p>
                  <p className="mt-1 text-xs text-red-200/80">
                    High-pressure chase
                  </p>
                </div>

                <div className="relative flex flex-col items-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
                    VS
                  </span>
                  <div className="mt-2 h-20 w-px bg-gradient-to-b from-red-400 via-yellow-300 to-blue-400" />
                </div>

                <div className="poster-side flex-1 rounded-[24px] border border-blue-400/20 bg-gradient-to-b from-blue-500/18 to-transparent px-3 py-4 text-center">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-blue-400/30 bg-black/20">
                    <Image
                      src="/team3-new.png"
                      alt="Featured challenger"
                      width={74}
                      height={74}
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-white">
                    Ice Side
                  </p>
                  <p className="mt-1 text-xs text-blue-200/80">
                    Big-match control
                  </p>
                </div>
              </div>

              <div className="relative mt-6 rounded-[24px] border border-white/10 bg-black/20 px-4 py-4 text-center">
                <p className="text-2xl font-extrabold leading-tight text-white">
                  Stadium Lights.
                  <span className="block bg-gradient-to-r from-red-400 via-yellow-300 to-blue-400 bg-clip-text text-transparent">
                    Poster Night.
                  </span>
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                  The home screen now carries a cinematic cricket-poster section instead of an empty gap.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href="/updates"
                    className="rounded-full border border-white/10 bg-white/8 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    View Updates
                  </Link>

                  <Link
                    href="/player-registration"
                    className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-3 text-center text-sm font-semibold text-black"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
