"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function UpdatesPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
  } | null>(null);
  const [imageScale, setImageScale] = useState(1);

  const updateItems = [
    {
      src: "/BPL_Match_Schedules.png",
      alt: "BPL Match Schedule",
      title: "Match Schedules",
      description:
        "Official BPL 2026 match schedules with fixtures, timings, and tournament flow.",
    },
    {
      src: "/Match_rules.png",
      alt: "BPL Tournament Match Rules",
      title: "Tournament Match Rules",
      description:
        "Official match format, power play conditions, and tournament regulations.",
    },
    {
      src: "/auction-rules.jpg",
      alt: "Auction Rules",
      title: "Auction Rules",
      description:
        "Official auction rules, bidding structure, and auction guidelines for BPL 2026.",
    },
    {
      src: "/Gallery/cashprize.png",
      alt: "Cash Prize Poster",
      title: "Cash Prize",
      description:
        "Prize distribution and featured BPL 2026 cash prize highlights.",
    },
  ];

  useEffect(() => {
    if (!selectedImage) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const preventGesture = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener("gesturestart", preventGesture, {
      passive: false,
    });
    document.addEventListener("gesturechange", preventGesture, {
      passive: false,
    });
    document.addEventListener("gestureend", preventGesture, {
      passive: false,
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] text-white">
      <Navbar />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-12">
        <h1 className="mb-10 text-center text-3xl font-bold md:text-5xl">
          Latest <span className="text-yellow-400">Updates</span>
        </h1>

        <div className="grid w-full gap-4 md:grid-cols-2">
          {updateItems.map((item) => (
            <button
              key={item.src}
              type="button"
              onClick={() =>
                {
                  setImageScale(1);
                  setSelectedImage({
                    src: item.src,
                    alt: item.alt,
                    title: item.title,
                  });
                }
              }
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/5 text-left shadow-xl backdrop-blur-md transition duration-300 hover:scale-[1.02] hover:border-yellow-400/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/92 via-[#020617]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-yellow-300/90">
                    Tap To Open
                  </p>
                  <h2 className="mt-2 text-lg font-bold text-white md:text-xl">
                    {item.title}
                  </h2>
                </div>
              </div>

              <div className="px-4 py-4">
                <p className="text-sm leading-6 text-gray-300">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => {
            setImageScale(1);
            setSelectedImage(null);
          }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4"
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/10 bg-[#09111f] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-left">
              <h2 className="text-lg font-semibold text-white md:text-2xl">
                {selectedImage.title}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setImageScale((current) => Math.max(1, current - 0.25))
                  }
                  className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-white"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImageScale((current) => Math.min(3, current + 0.25))
                  }
                  className="rounded-full border border-white/10 px-3 py-2 text-sm font-semibold text-white"
                >
                  +
                </button>
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-300">
                  Tap outside to close
                </span>
              </div>
            </div>

            <div className="relative h-[75vh] w-full overflow-auto bg-[#020617]">
              <div
                className="relative h-full w-full"
                style={{
                  transform: `scale(${imageScale})`,
                  transformOrigin: "center center",
                  transition: "transform 180ms ease",
                }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
