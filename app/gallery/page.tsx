"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";

const shields = [
  {
    image: "/Gallery/shield1.png",
    name: "The Shetti's XI",
  },
  {
    image: "/Gallery/shield2.png",
    name: "Vaishya Titans",
  },
  {
    image: "/Gallery/shield3.png",
    name: "Vaishya Power House",
  },
  {
    image: "/Gallery/shield4.png",
    name: "KVS Cricketers",
  },
];

const videos = [
  {
    title: "Icon & Team Showcase",
    source: "/Gallery/icon&team video.mp4",
  },
  {
    title: "Vaishya Titans Team Introduction",
    source: "/Gallery/vaishya_titans_teamintroduction.mp4",
  },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#162238_0%,#0a1020_48%,#050914_100%)] text-white">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-yellow-400/80">
            Gallery
          </p>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Tournament <span className="text-yellow-400">Highlights</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
            Explore the featured prize poster and team shields presented in a
            premium showcase for Bangalore Premier League 2026.
          </p>
        </div>

        <section className="mt-12 overflow-hidden rounded-[34px] border border-yellow-400/15 bg-white/5 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.38)] backdrop-blur-md md:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/85">
                Cash Prize
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-4xl">
                Prize Pool Reveal
              </h2>
            </div>
            <div className="hidden h-16 w-16 rounded-full bg-yellow-400/12 blur-2xl md:block" />
          </div>

          <div className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f172a]/75 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition duration-500 hover:-translate-y-1 hover:border-yellow-400/30 hover:shadow-[0_20px_50px_rgba(250,204,21,0.18)] md:p-4">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.16),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_30%)] opacity-70 transition duration-500 group-hover:opacity-100" />
            <Image
              src="/Gallery/cashprize.png"
              alt="Cash Prize Poster"
              width={1400}
              height={1800}
              className="relative w-full rounded-[22px] border border-white/8 object-cover transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-[34px] border border-white/10 bg-white/5 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.3)] backdrop-blur-md md:p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/85">
              Featured Videos
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-4xl">
              Team Video Gallery
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {videos.map((video) => (
              <div
                key={video.source}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0f172a]/78 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] transition duration-500 hover:-translate-y-1 hover:border-yellow-400/30 hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)] md:p-4"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.14),transparent_32%)] opacity-80 transition duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <h3 className="mb-4 text-lg font-semibold text-white md:text-xl">
                    {video.title}
                  </h3>
                  <video
                    controls
                    playsInline
                    className="w-full rounded-[22px] border border-white/8 bg-black object-cover"
                  >
                    <source src={video.source} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/85">
              Teams & Shields
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-4xl">
              Team Shield Collection
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {shields.map((shield, index) => (
              <div
                key={shield.name}
                className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0f172a]/78 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-2 hover:border-yellow-400/28 hover:shadow-[0_24px_60px_rgba(250,204,21,0.16)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.12),transparent_38%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.1),transparent_40%)] opacity-70 transition duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-yellow-300/80">
                      Shield 0{index + 1}
                    </p>
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-[0_0_18px_rgba(250,204,21,0.8)]" />
                  </div>

                  <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-4">
                    <Image
                      src={shield.image}
                      alt={shield.name}
                      width={900}
                      height={1100}
                      className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {shield.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
