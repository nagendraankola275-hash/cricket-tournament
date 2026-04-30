"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";

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

export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] text-white">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-400/80">
            Sponsor List
          </p>
          <h1 className="mt-4 text-3xl md:text-5xl font-bold">
            Sponsors & <span className="text-yellow-400">Supporters</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm md:text-base text-gray-300">
            A heartfelt thank you to the supporters powering Bangalore Premier
            League 2026 on and off the field.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.title}
              className="flex flex-col gap-5 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-md shadow-xl md:flex-row"
            >
              <Image
                src={sponsor.image}
                alt={sponsor.title}
                width={180}
                height={180}
                className="h-[180px] w-full rounded-[22px] object-cover md:w-[180px]"
              />

              <div className="flex flex-1 flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-yellow-300/85">
                  {sponsor.title}
                </p>
                <p className="mt-3 text-base leading-7 text-gray-200">
                  {sponsor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
