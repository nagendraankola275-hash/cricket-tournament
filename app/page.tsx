"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PeopleConnected from "./components/PeopleConnected";

const teams = [
  {
    name: "Vaishya Titans",
    logo: "/team1.png",
    owner: "/owner1.png",
    ownerName: "Raghav Shetti",
  },
  {
    name: "The Shetti's XI",
    logo: "/team2-new.png",
    owner: "/owner2.png",
    ownerName: "Ajay Shetti",
  },
  {
    name: "KVS Cricketers",
    logo: "/team3-new.png",
    owner: "/owner3.png",
    ownerName: "KVS Akshay",
  },
  {
    name: "Vaishya Power House",
    logo: "/team4.png",
    owner: "/owner4.png",
    ownerName: "Harsha Gaonkar",
  },
];

const sponsors = [
  {
    image: "/sponsor1.png",
    title: "Food Sponsor",
    description: "Food sponsored by D N Shetti, Sadashivgad, Karwar.",
  },
  {
    image: "/sponsor2.png",
    title: "Trophy Sponsor",
    description: "Trophy sponsored by Geetha Shetti, Mundgod.",
  },
  {
    image: "/sponsor3.png",
    title: "Cash Prize Sponsor",
    description:
      "Cash prize sponsored by Mukta Subray Shetti and Umesh Venkatesh Shetti, Badageri, Sirsi.",
  },
  {
    image: "/sponsor4.png",
    title: "Special Awards Sponsor",
    description:
      "Shrikanth Keni is sponsoring the Man of the Series award, Best Batsman award, Best Bowler award, and 30+ six-hit match balls.",
  },
];

const reelTeams = [...teams, ...teams];
const reelSponsors = [...sponsors, ...sponsors];

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

  const getTouchDeviceState = () =>
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const [timeLeft, setTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });
  const [isTouchDevice, setIsTouchDevice] = useState(getTouchDeviceState);

  useEffect(() => {
    const updateViewport = () => {
      setIsTouchDevice(getTouchDeviceState());
    };

    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

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

        <Image
          src="/sringeri.png"
          alt=""
          width={140}
          height={140}
          className={`absolute top-28 left-[20px] w-[92px] opacity-70 ${
            isTouchDevice ? "hidden xl:block" : "hidden lg:block"
          } lg:left-[60px] lg:w-[140px] ${
            isTouchDevice ? "xl:left-[32px] xl:w-[110px]" : ""
          } ${isTouchDevice ? "xl:top-32" : ""}`}
        />

        <Image
          src="/ganesha.png"
          alt=""
          width={150}
          height={150}
          className={`absolute top-28 right-[20px] w-[98px] opacity-80 ${
            isTouchDevice ? "hidden xl:block" : "hidden lg:block"
          } lg:right-[60px] lg:w-[150px] ${
            isTouchDevice ? "xl:right-[32px] xl:w-[116px]" : ""
          } ${isTouchDevice ? "xl:top-32" : ""}`}
        />
      </div>

      <section className="relative z-10 xl:pb-[280px]">
        <div className="flex flex-col items-center justify-center text-center px-4 py-10">
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
            <div className="mt-8 w-full max-w-5xl xl:hidden">
              <div className="overflow-hidden rounded-[28px] border border-white/8 bg-[#0b1220]/40 px-3 py-3 backdrop-blur-sm shadow-[0_18px_45px_rgba(0,0,0,0.22)]">
                <div className="mb-3 flex items-center justify-between px-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-400/80">
                    Featured Teams
                  </p>
                  <p className="text-xs text-gray-400">Swipe feel reel</p>
                </div>
                <div className="touch-team-strip">
                  {reelTeams.map((team, index) => (
                    <div
                      key={`touch-team-${team.name}-${index}`}
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
                        <p className="mt-1 truncate text-xs text-yellow-300/85">
                          {team.ownerName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pb-8 w-full flex justify-center px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/10 shadow-xl">
            {[
              { value: timeLeft.d, label: "DAYS" },
              { value: String(timeLeft.h).padStart(2, "0"), label: "HRS" },
              { value: String(timeLeft.m).padStart(2, "0"), label: "MIN" },
              { value: String(timeLeft.s).padStart(2, "0"), label: "SEC" },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl bg-black/80 flex items-center justify-center text-white text-lg md:text-3xl font-bold">
                  {item.value}
                </div>
                <p className="text-xs text-gray-300 mt-2">{item.label}</p>
              </div>
            ))}

            <div className="hidden md:block h-14 w-[2px] bg-gradient-to-b from-yellow-400 via-orange-500 to-yellow-400" />

            <div className="text-center md:text-left">
              <p className="text-xs text-gray-300 uppercase">Event Date</p>
              <p className="text-xl font-bold text-white">31 MAY 2026</p>
            </div>
          </div>
        </div>

        <div className="px-4 pb-10 md:px-6">
          <div className="mx-auto w-full max-w-6xl xl:max-w-[980px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="mb-5 flex items-center justify-between gap-4 px-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-yellow-300/90">
                  Sponsor List
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
                  Tournament Supporters
                </h2>
              </div>
              <p className="text-xs text-gray-400">Reel style showcase</p>
            </div>

            <div className="touch-team-strip">
              {reelSponsors.map((sponsor, index) => (
                <div
                  key={`sponsor-${sponsor.title}-${index}`}
                  className="mr-4 flex w-[290px] shrink-0 gap-4 rounded-[26px] border border-white/10 bg-[#101722]/88 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <Image
                    src={sponsor.image}
                    alt={sponsor.title}
                    width={92}
                    height={92}
                    className="h-[92px] w-[92px] rounded-2xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-yellow-300">
                      {sponsor.title}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-200">
                      {sponsor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-4 pb-12 md:px-6">
          <div className="mx-auto w-full max-w-6xl xl:max-w-[980px] overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
            <div className="mb-5 flex items-center justify-between gap-4 px-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-yellow-300/90">
                  Teams & Owners
                </p>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold text-white">
                  Team Reel Showcase
                </h2>
              </div>
              <p className="text-xs text-gray-400">Reel style showcase</p>
            </div>

            <div className="touch-team-strip">
              {reelTeams.map((team, index) => (
                <div
                  key={`team-showcase-${team.name}-${index}`}
                  className="mr-4 flex w-[340px] shrink-0 items-center gap-4 rounded-[26px] border border-white/10 bg-[#101722]/88 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <Image
                    src={team.logo}
                    alt={team.name}
                    width={108}
                    height={108}
                    className="h-[108px] w-[108px] shrink-0 rounded-2xl object-contain"
                  />

                  <div className="min-w-0 text-left">
                    <p className="text-base font-semibold text-yellow-300">
                      {team.name}
                    </p>

                    <Image
                      src={team.owner}
                      alt={`${team.name} owner`}
                      width={68}
                      height={68}
                      className="mt-3 h-[68px] w-[68px] rounded-full border-2 border-yellow-400 object-cover"
                    />

                    <p className="mt-3 text-sm font-medium leading-6 text-gray-200">
                      {team.ownerName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

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
                Power. Passion. Pressure. One ground, one spotlight, one
                unforgettable cricket battle.
              </p>
            </div>
          </div>
        </div>
      )}

      <PeopleConnected />
    </div>
  );
}
