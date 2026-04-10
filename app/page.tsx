"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {

  // 🔥 COUNTDOWN FUNCTION
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

  // ✅ FIXED STATE (NO HYDRATION ISSUE)
  const [timeLeft, setTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const teams = [
    { name: "Vaishya Titans", logo: "/team1.png", owner: "/owner1.png" },
    { name: "The Shetti's XI", logo: "/team2-new.png", owner: "/owner2.png" },
    { name: "KVS Cricketers", logo: "/team3-new.png", owner: "/owner3.png" },
    { name: "Golden Eagles", logo: "/team4.png", owner: "/team4.png" },
  ];

  // ⏱ COUNTDOWN (FIXED)
  useEffect(() => {
    const update = () => {
      setTimeLeft(getTimeLeft());
    };

    update(); // run immediately after mount

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔁 ROTATOR
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % teams.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] relative overflow-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* SIDE IMAGES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src="/sringeri.png" className="absolute top-28 left-[60px] w-[140px] opacity-70 hidden md:block" />
        <img src="/ganesha.png" className="absolute top-28 right-[60px] w-[150px] opacity-80 hidden md:block" />
      </div>

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center flex-1 relative z-10 px-4">

        {/* LOGO */}
        <Image
          src="/bpl-logo.png"
          alt="BPL"
          width={600}
          height={600}
          className="h-[220px] md:h-[300px] lg:h-[360px] w-auto object-contain drop-shadow-[0_0_50px_rgba(255,165,0,0.6)]"
          priority
        />

        {/* TITLE */}
        <h1 className="mt-8 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-white via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Bangalore Premier League
          </span>
          <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            2026
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-4 text-gray-400 text-sm md:text-base">
          Experience the thrill of cricket like never before.
        </p>

        {/* 🔥 MOBILE ROTATOR */}
        <div className="md:hidden mt-8 flex flex-col items-center text-center space-y-3">

          <Image
            src={teams[currentIndex].logo}
            alt="team"
            width={90}
            height={90}
            className="object-contain"
          />

          <Image
            src={teams[currentIndex].owner}
            alt="owner"
            width={60}
            height={60}
            className="rounded-full border-2 border-yellow-400"
          />

          <p className="text-sm font-semibold text-white">
            {teams[currentIndex].name}
          </p>

        </div>

      </div>

      {/* 🔥 DESKTOP ROTATOR */}
      <div className="hidden md:block absolute left-[40px] bottom-[120px] z-10 w-[200px]">

        <div className="flex flex-col items-center text-center space-y-3">

          <Image
            src={teams[currentIndex].logo}
            alt="team"
            width={110}
            height={110}
            className="object-contain drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]"
          />

          <Image
            src={teams[currentIndex].owner}
            alt="owner"
            width={80}
            height={80}
            className="rounded-full border-2 border-yellow-400 shadow-lg"
          />

          <p className="text-sm md:text-base font-semibold text-white">
            {teams[currentIndex].name}
          </p>

        </div>

      </div>

      {/* 🔥 COUNTDOWN */}
      <div className="pb-8 w-full flex justify-center relative z-10">

        <div className="
          flex flex-wrap justify-center items-center gap-6 md:gap-12 
          px-6 py-5 
          rounded-2xl 
          bg-white/5 backdrop-blur-md 
          border border-white/10 
          shadow-xl
        ">

          {[
            { value: timeLeft.d, label: "DAYS" },
            { value: String(timeLeft.h).padStart(2, "0"), label: "HRS" },
            { value: String(timeLeft.m).padStart(2, "0"), label: "MIN" },
            { value: String(timeLeft.s).padStart(2, "0"), label: "SEC" },
          ].map((item, i) => (
            <div key={i} className="text-center">

              <div className="
                w-14 h-14 md:w-20 md:h-20 
                rounded-xl 
                bg-black 
                flex items-center justify-center 
                text-white 
                text-lg md:text-3xl 
                font-bold
              ">
                {item.value}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {item.label}
              </p>

            </div>
          ))}

          <div className="hidden md:block h-14 w-[2px] bg-gradient-to-b from-yellow-400 via-orange-500 to-yellow-400"></div>

          <div className="text-center md:text-left">
            <p className="text-xs text-gray-400 uppercase">Event Date</p>
            <p className="text-xl font-bold text-white">
              31 MAY 2026
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}