"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

export default function Home() {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const targetDate = new Date("2026-05-31T00:00:00");

    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) return;

      setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));
      setHoursLeft(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutesLeft(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
      setSecondsLeft(Math.floor((diff % (1000 * 60)) / 1000));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] relative">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="flex flex-col items-center justify-center text-center flex-1 px-4 md:px-6 py-6 relative z-10">

        {/* LOGO */}
        <Image
          src="/bpl-logo.png"
          alt="BPL Logo"
          width={600}
          height={600}
          className="h-[140px] md:h-[220px] lg:h-[300px] w-auto object-contain drop-shadow-[0_0_40px_rgba(255,165,0,0.6)]"
          priority
        />

        {/* TITLE */}
        <h1 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-white via-orange-200 to-yellow-400 bg-clip-text text-transparent">
            Bangalore Premier League
          </span>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent ml-2">
            2026
          </span>
        </h1>

        {/* SUBTEXT */}
        <p className="mt-4 text-gray-400 max-w-xl text-sm md:text-base">
          Experience the thrill of cricket like never before.
        </p>

      </div>

      {/* COUNTDOWN */}
      <div className="pb-6 w-full flex justify-center relative z-10">

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 px-4 md:px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl">

          {[
            { value: daysLeft, label: "DAYS" },
            { value: String(hoursLeft).padStart(2, "0"), label: "HRS" },
            { value: String(minutesLeft).padStart(2, "0"), label: "MIN" },
            { value: String(secondsLeft).padStart(2, "0"), label: "SEC" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl bg-black flex items-center justify-center text-white text-lg md:text-3xl font-bold">
                {item.value}
              </div>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1">
                {item.label}
              </p>
            </div>
          ))}

          {/* DIVIDER (DESKTOP ONLY) */}
          <div className="hidden md:block h-12 w-[2px] bg-gradient-to-b from-yellow-400 via-orange-500 to-yellow-400"></div>

          {/* DATE */}
          <div className="text-center md:text-left mt-2 md:mt-0">
            <p className="text-xs text-gray-400 uppercase">Event Date</p>
            <p className="text-lg md:text-xl font-bold text-white">
              31 MAY 2026
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}