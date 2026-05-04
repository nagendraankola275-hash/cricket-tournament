"use client";

import Navbar from "../components/Navbar";

export default function ContactPage() {

  const contacts = [
    { name: "Prasad", phone: "9035907644", photo: "/contacts/prasad.jpg" },
    { name: "Vaibhav", phone: "7892512424", photo: "/contacts/vaibhav.jpg" },
    { name: "Nilesh", phone: "8861533602", photo: "/contacts/nilesh.jpg" },
    { name: "Nitish", phone: "8050834290", photo: "/contacts/nitish.jpg" },
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
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center justify-between hover:scale-105 transition duration-300"
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">

                {/* IMAGE */}
                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                />

                {/* TEXT */}
                <div>
                  <p className="text-lg font-semibold">{person.name}</p>
                  <p className="text-gray-400 text-sm">Tap to call</p>
                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="text-yellow-400 font-bold text-lg">
                {person.phone}
              </div>

            </a>
          ))}

        </div>

      </div>

    </div>
  );
}