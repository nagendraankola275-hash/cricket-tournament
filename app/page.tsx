"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import PeopleConnected from "./components/PeopleConnected";

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
          className={`absolute top-28 left-[20px] w-[92px] opacity-70 ${
            isTouchDevice ? "hidden xl:block" : "hidden lg:block"
          } lg:left-[60px] lg:w-[140px] ${
            isTouchDevice ? "xl:left-[32px] xl:w-[110px]" : ""
          } ${
            isTouchDevice ? "xl:top-32" : ""
          }`}
        />

        <img
          src="/ganesha.png"
          alt=""
          className={`absolute top-28 right-[20px] w-[98px] opacity-80 ${
            isTouchDevice ? "hidden xl:block" : "hidden lg:block"
          } lg:right-[60px] lg:w-[150px] ${
            isTouchDevice ? "xl:right-[32px] xl:w-[116px]" : ""
          } ${
            isTouchDevice ? "xl:top-32" : ""
          }`}
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
            <div className="relative h-[220px] overflow-hidden rounded-[28px] border border-white/8 bg-[#0b1220]/40 px-3 py-3 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.22)] md:hidden">
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
        <div className="relative z-10 hidden w-full px-6 pb-12 md:block xl:hidden">
          <div className="relative mx-auto mt-6 max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-2 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <Image
              src="/media-image.png"
              alt="Cricket battle media banner"
              width={1600}
              height={900}
              className="h-auto w-full rounded-[24px] object-cover"
            />
            <div className="absolute inset-2 rounded-[24px] bg-gradient-to-t from-[#07101d]/88 via-[#07101d]/18 to-transparent" />
            <div className="absolute inset-x-8 bottom-8">
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-yellow-300/90">
                Cricket Battle
              </p>
              <h3 className="mt-3 max-w-2xl text-4xl font-extrabold leading-tight text-white">
                Where Rivalries Ignite
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
                  And Champions Rise
                </span>
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-200">
                Power. Passion. Pressure. One ground, one spotlight, one unforgettable cricket battle.
              </p>
            </div>
          </div>
        </div>
      )}

      <PeopleConnected />   // ✅ ADD THIS LINE HERE

    </div>
  );
}
