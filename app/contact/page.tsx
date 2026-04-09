"use client";

import Navbar from "../components/Navbar";

export default function ContactPage() {

  const contacts = [
    { name: "Prasad", phone: "9035907644" },
    { name: "Harsha", phone: "9113553575" },
    { name: "Nikhil", phone: "8762759889" },
    { name: "Vaibhav", phone: "7892512424" },
    { name: "Nilesh", phone: "8861533602" },
    { name: "Nitish", phone: "8050834290" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center px-6 py-12">

        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          Contact <span className="text-yellow-400">Us</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">

          {contacts.map((person, index) => (
            <a
              key={index}
              href={`tel:${person.phone}`}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex justify-between items-center hover:scale-105 transition"
            >
              <div>
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="text-gray-400 text-sm">Tap to call</p>
              </div>

              <div className="text-yellow-400 font-bold">
                {person.phone}
              </div>
            </a>
          ))}

        </div>

      </div>

    </div>
  );
}