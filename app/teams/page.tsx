"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

type Team = {
  id: number;
  name: string;
  logo: string;
  owner: string;
  ownerImage: string;
  description: string;
  iconPlayer: string;
  iconImage: string;
  iconImageClassName?: string;
};

type AuctionPlayer = {
  id: string;
  name: string;
  role?: string;
  team?: string;
  status?: string;
  auctionOrder?: number;
};

const normalizeName = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const playerImageAliases: Record<string, string> = {
  "chetan m bandikatte": "/players/chetan_m_bandikatte.jpg",
  "chethan m bandikatte": "/players/chetan_m_bandikatte.jpg",
  "vinayak p balehittal": "/players/vinayak_p_balehittal.jpg",
  "vinayak balehittal": "/players/vinayak_p_balehittal.jpg",
  "chetan prakash vaidya": "/players/chetan_prakash_vaidya.jpg",
  "chethan prakash vaidya": "/players/chetan_prakash_vaidya.jpg",
  "nitish shetti": "/players/nitish_shetti.jpg",
  "harsha s": "/players/harsha_shetty.jpg",
};

const getPlayerImage = (name: string) => {
  const normalizedName = normalizeName(name);
  const aliasMatch = playerImageAliases[normalizedName];

  if (aliasMatch) {
    return aliasMatch;
  }

  return `/players/${normalizedName.replace(/\s+/g, "_")}.jpg`;
};

const teams: Team[] = [
  {
    id: 1,
    name: "Vaishya Titans",
    logo: "/team1.png",
    owner: "Raghav Shetti",
    ownerImage: "/owner1.png",
    description: "A dominant force known for power hitters and fearless gameplay.",
    iconPlayer: "Harsha S",
    iconImage: "/Icon1.png",
    iconImageClassName: "object-[center_28%]",
  },
  {
    id: 2,
    name: "The Shetti's XI",
    logo: "/team2-new.png",
    owner: "Ajay Shetti",
    ownerImage: "/owner2.png",
    description: "A balanced squad with strong match-winning performers.",
    iconPlayer: "Milind Gaonkar",
    iconImage: "/Icon2.png",
    iconImageClassName: "object-[center_26%]",
  },
  {
    id: 3,
    name: "KVS Cricketers",
    logo: "/team3-new.png",
    owner: "Akshay Shetti",
    ownerImage: "/owner3.png",
    description: "Energetic and aggressive team with strong leadership.",
    iconPlayer: "Nikhil Gullapur",
    iconImage: "/Icon4.png",
    iconImageClassName: "object-[center_30%]",
  },
  {
    id: 4,
    name: "Vaishya Power House",
    logo: "/team4.png",
    owner: "Harsha Gaonkar",
    ownerImage: "/owner4.png",
    description: "Upcoming team ready to challenge the best in the league.",
    iconPlayer: "Vijay Shetti",
    iconImage: "/Icon3.png",
    iconImageClassName: "object-[center_18%]",
  },
];

export default function TeamsPage() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [players, setPlayers] = useState<AuctionPlayer[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "players"), (snapshot) => {
      const data: AuctionPlayer[] = snapshot.docs.map((playerDoc) => ({
        id: playerDoc.id,
        ...(playerDoc.data() as Omit<AuctionPlayer, "id">),
      }));

      setPlayers(data);
    });

    return () => unsubscribe();
  }, []);

  const getTeamPlayers = (teamName: string) =>
    players
      .filter(
        (player) => player.team === teamName && player.status === "SOLD"
      )
      .sort((a, b) => {
        const aOrder = a.auctionOrder ?? Number.MAX_SAFE_INTEGER;
        const bOrder = b.auctionOrder ?? Number.MAX_SAFE_INTEGER;

        if (aOrder !== bOrder) {
          return aOrder - bOrder;
        }

        return a.name.localeCompare(b.name);
      });

  const getIconRole = (team: Team) => {
    const exactMatch = players.find(
      (player) =>
        normalizeName(player.name) === normalizeName(team.iconPlayer)
    );

    if (exactMatch?.role) {
      return exactMatch.role;
    }

    const partialMatch = players.find((player) =>
      normalizeName(player.name).includes(normalizeName(team.iconPlayer))
    );

    return partialMatch?.role || "Icon Player";
  };

  if (selectedTeam) {
    const squadPlayers = getTeamPlayers(selectedTeam.name);
    const iconRole = getIconRole(selectedTeam);

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
        <Navbar />

        <div className="px-6 py-12">
          <button
            onClick={() => setSelectedTeam(null)}
            className="mb-8 rounded-lg bg-white/10 px-4 py-2 transition hover:bg-white/20"
          >
            ← Back to Teams
          </button>

          <div className="mx-auto max-w-6xl">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <Image
                src={selectedTeam.logo}
                alt={selectedTeam.name}
                width={160}
                height={160}
                className="mx-auto mb-6"
              />

              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                {selectedTeam.name}
              </h1>

              <div className="mx-auto mb-6 w-fit">
                <Image
                  src={selectedTeam.ownerImage}
                  alt={selectedTeam.owner}
                  width={132}
                  height={132}
                  className="rounded-full border-4 border-yellow-400"
                />
              </div>

              <p className="text-sm uppercase tracking-[0.28em] text-gray-400">
                Team Owner
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-yellow-400">
                {selectedTeam.owner}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl leading-7 text-gray-300">
                {selectedTeam.description}
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="rounded-[28px] border border-yellow-400/15 bg-white/5 p-6 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/85">
                  Icon Player
                </p>

                <div className="mt-5 overflow-hidden rounded-[26px] border border-white/10 bg-[#101722]/88 p-5 text-center">
                  <Image
                    src={selectedTeam.iconImage}
                    alt={selectedTeam.iconPlayer}
                    width={180}
                    height={180}
                    className={`mx-auto h-[180px] w-[180px] rounded-full border-2 border-yellow-400 object-cover shadow-lg ${selectedTeam.iconImageClassName || "object-center"}`}
                  />
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {selectedTeam.iconPlayer}
                  </h3>
                  <p className="mt-2 text-sm font-medium uppercase tracking-[0.24em] text-orange-400">
                    {iconRole}
                  </p>
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_16px_40px_rgba(0,0,0,0.25)]">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-300/85">
                      Team Squad
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">
                      Auctioned Players
                    </h3>
                  </div>
                  <div className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-300">
                    {squadPlayers.length} Players
                  </div>
                </div>

                {squadPlayers.length === 0 ? (
                  <div className="rounded-[24px] border border-dashed border-white/15 bg-[#101722]/60 px-6 py-10 text-center text-gray-400">
                    No players have been assigned to this team yet.
                  </div>
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {squadPlayers.map((player) => {
                      const isIconPlayer =
                        normalizeName(player.name) ===
                        normalizeName(selectedTeam.iconPlayer);

                      return (
                        <div
                          key={player.id}
                          className={`rounded-[24px] border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 ${
                            isIconPlayer
                              ? "border-yellow-400/40 bg-gradient-to-br from-yellow-400/10 via-[#111827] to-[#101722]"
                              : "border-white/10 bg-[#101722]/88"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              src={getPlayerImage(player.name)}
                              alt={player.name}
                              width={72}
                              height={72}
                              className="h-[72px] w-[72px] rounded-full border-2 border-yellow-400 object-cover"
                              onError={() => {}}
                            />

                            <div className="min-w-0">
                              <h4 className="text-lg font-semibold text-white">
                                {player.name}
                              </h4>
                              <p className="mt-1 text-sm font-medium text-yellow-300">
                                {player.role || "Player"}
                              </p>
                              {isIconPlayer && (
                                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.24em] text-orange-400">
                                  Icon Player
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
      <Navbar />

      <div className="px-8 py-12">
        <h1 className="mb-12 text-center text-4xl font-bold md:text-5xl">
          Our Teams
        </h1>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {teams.map((team, index) => (
            <div
              key={team.id}
              onClick={() => setSelectedTeam(team)}
              className="group relative flex cursor-pointer flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] active:scale-95"
            >
              {index < 4 && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 blur-xl" />
              )}

              <Image
                src={team.logo}
                alt={team.name}
                width={140}
                height={140}
                className="mb-4 transition duration-300 group-hover:scale-105"
              />

              <h2 className="text-center text-lg font-semibold">{team.name}</h2>

              <p className="mt-2 text-sm italic text-gray-400">
                Owner: <span className="text-yellow-400">{team.owner}</span>
              </p>

              <p className="mt-1 text-sm italic text-gray-400">
                Icon: <span className="text-orange-400">{team.iconPlayer}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
