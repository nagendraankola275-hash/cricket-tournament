"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";

export default function MatchesPage() {
  const teams = [
    { name: "KVS Cricketers", logo: "/team3-new.png" },
    { name: "Vaishya Titans", logo: "/team1.png" },
    { name: "The Shetti's XI", logo: "/team2-new.png" },
    { name: "Vaishya Power House", logo: "/team4.png" },
  ];

  const fixtures = [
    {
      label: "Match 1",
      match: "Vaishya Power House vs The Shetti's XI",
      time: "7.30 - 8.40",
      break: "5 mins break",
    },
    {
      label: "Match 2",
      match: "Vaishya Titans vs KVS Cricketers",
      time: "8.45 - 9.55",
      break: "5 mins break",
    },
    {
      label: "Match 3",
      match: "Vaishya Power House vs KVS Cricketers",
      time: "10.00 - 11.10",
      break: "5 mins break",
    },
    {
      label: "Match 4",
      match: "The Shetti's XI vs Vaishya Titans",
      time: "11.15 - 12.25",
      break: "5 mins break",
    },
    {
      label: "Match 5",
      match: "Vaishya Power House vs Vaishya Titans",
      time: "12.30 - 1.40",
      break: "5 mins break",
    },
    {
      label: "Match 6",
      match: "The Shetti's XI vs KVS Cricketers",
      time: "1.45 - 2.55",
      break: "10 mins break",
    },
    {
      label: "Final",
      match: "Table Top 1 vs Table Top 2",
      time: "3.05 - 4.35",
      break: "TBA",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white">
      <Navbar />

      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-12">
        <h1 className="mb-10 text-center text-4xl font-bold md:text-5xl">
          Match <span className="text-yellow-400">Updates</span>
        </h1>

        <div className="w-full max-w-4xl rounded-[32px] border border-cyan-400/15 bg-white/5 p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-cyan-300/90">
              Teams
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Tournament Teams
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <div
                key={team.name}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-[#09111f]/90 shadow-[0_18px_45px_rgba(0,0,0,0.24)]"
              >
                <div className="relative aspect-square overflow-hidden bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.14),transparent_45%),linear-gradient(180deg,#111827_0%,#09111f_100%)] p-4">
                  <Image
                    src={team.logo}
                    alt={team.name}
                    fill
                    className="object-contain p-5"
                  />
                </div>
                <div className="border-t border-white/10 bg-black/20 px-4 py-4 text-center">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-white">
                    {team.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 w-full max-w-4xl rounded-[32px] border border-yellow-400/15 bg-white/5 p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-yellow-300/90">
              Fixtures
            </p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Match Schedules
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              The fixture order below follows the official poster, including
              match timings, end time, and break duration.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {fixtures.map((fixture, index) => (
              <div
                key={fixture.label}
                className="rounded-[24px] border border-white/10 bg-[#0f172a]/55 p-4"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-sm font-bold text-slate-950">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-yellow-300/90">
                        {fixture.label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {fixture.match}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-300">
                    {fixture.time}
                  </p>
                </div>

                <div className="mt-4 grid gap-3 rounded-[18px] border border-white/8 bg-black/15 p-4 text-sm text-gray-200 md:grid-cols-3">
                  <p>
                    <span className="font-semibold text-yellow-300">Start - End:</span>{" "}
                    {fixture.time}
                  </p>
                  <p>
                    <span className="font-semibold text-yellow-300">Match Duration:</span>{" "}
                    {fixture.label === "Final" ? "1 hr 30 mins" : "1 hr 10 mins"}
                  </p>
                  <p>
                    <span className="font-semibold text-yellow-300">Break:</span>{" "}
                    {fixture.break}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 w-full max-w-4xl rounded-[32px] border border-orange-400/15 bg-white/5 p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-orange-300/90">
              Tournament Rules
            </p>
            <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
              Match Rules
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
              Below are the official tournament rules in text format for easy
              reading during the matches.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="rounded-[24px] border border-white/10 bg-[#0f172a]/55 p-5">
              <h3 className="text-lg font-semibold text-yellow-300">
                Match Format
              </h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-200 marker:text-yellow-300">
                <li>League: 8 overs</li>
                <li>Final: 10 overs</li>
                <li>Balls used: SIX IT L Tennis Ball</li>
                <li>League duration: 32 minutes</li>
                <li>Final duration: 40 minutes</li>
                <li>League bowling restriction: max 2 overs for 3 bowlers and 1 over each for the remaining bowlers</li>
                <li>Final bowling restriction: max 2 overs for each bowler</li>
              </ul>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-[#0f172a]/55 p-5">
              <h3 className="text-lg font-semibold text-yellow-300">
                Power Play Conditions
              </h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-200 marker:text-yellow-300">
                <li>League matches: 2 overs power play per innings</li>
                <li>League matches: maximum 2 fielders outside 30-yard circle</li>
                <li>Finals: 3 overs power play per innings</li>
                <li>Finals: maximum 2 fielders outside 30-yard circle</li>
                <li>Non-power play: maximum 5 fielders outside 30-yard circle</li>
              </ul>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-[#0f172a]/55 p-5">
              <h3 className="text-lg font-semibold text-yellow-300">
                Match Rules
              </h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-200 marker:text-yellow-300">
                <li>Extras considered: Wide, No Ball, Byes, Leg Byes</li>
                <li>Winning team gets 2 points in league matches</li>
                <li>In case of tie in league match, each team gets 1 point</li>
                <li>In case of tie in final, Super Over will be played</li>
                <li>If points are tied, NRR will be considered</li>
                <li>One bounce per over is allowed below head height</li>
                <li>Second bounce is considered as No Ball</li>
                <li>Overthrows are allowed</li>
                <li>Free hit is applicable for all No Balls</li>
                <li>No ball will be considered if field restrictions are not followed</li>
                <li>Runner allowed only in case of injury with umpire approval</li>
                <li>Field umpire decision will be final</li>
                <li>Chucking is strictly not allowed</li>
                <li>If batsman appeals, umpire decision will be final</li>
              </ul>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-[#0f172a]/55 p-5">
              <h3 className="text-lg font-semibold text-yellow-300">
                Tournament Rules
              </h3>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-gray-200 marker:text-yellow-300">
                <li>Each team will play 3 matches within their group</li>
                <li>Top 2 teams from table will qualify for the finals</li>
                <li>Captain is responsible for maintaining team discipline</li>
                <li>After first innings, teams must be present for toss immediately</li>
                <li>12th player must be present near scorer during match</li>
                <li>Team should report on time</li>
                <li>If innings are not completed in time, up to 5 runs penalty may apply</li>
                <li>In case of doubts, tournament committee decision will be final</li>
              </ul>
            </section>

            <section className="rounded-[24px] border border-white/10 bg-[#0f172a]/55 p-5 md:col-span-2">
              <h3 className="text-lg font-semibold text-yellow-300">
                General Guidelines
              </h3>
              <ul className="mt-4 grid list-disc gap-3 pl-5 text-sm leading-7 text-gray-200 marker:text-yellow-300 md:grid-cols-2">
                <li>Only Kannada Vaishya Community players are allowed</li>
                <li>Players must wear jersey and track pants</li>
                <li>Tournament strictly time bound</li>
                <li>Teams must bring their own bats</li>
                <li>Only team captains will communicate with organizers</li>
                <li>Food and water will be arranged</li>
                <li>Basic first aid available at venue</li>
                <li>Organizers are not responsible for injury or accidents</li>
                <li>Only players listed by the team captain are eligible to play</li>
                <li>Players not mentioned in the registered list will not be allowed to participate</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
