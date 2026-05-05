"use client";

import Navbar from "../components/Navbar";
import { useState } from "react";

export default function ContactPage() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const contacts = [
    { name: "Prasad", phone: "9035907644", photo: "/contacts/prasad.jpg" },
    { name: "Vaibhav", phone: "7892512424", photo: "/contacts/vaibhav.jpg" },
    { name: "Nilesh", phone: "8861533602", photo: "/contacts/nilesh.jpg" },
    { name: "Nitish", phone: "8050834290", photo: "/contacts/nitish.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1e] via-[#0f1425] to-[#1a1f35] text-white">

      <Navbar />

      <div className="flex flex-col items-center justify-center px-6 py-12">

        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          Contact <span className="text-yellow-400">Us</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">

          {contacts.map((person, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-5 flex items-center justify-between hover:scale-105 transition duration-300"
            >
              <div className="flex items-center gap-4">

                <img
                  src={person.photo}
                  alt={person.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(person.photo);
                  }}
                />

                <div>
                  <p className="text-lg font-semibold">{person.name}</p>
                  <p className="text-gray-400 text-sm">Tap to call</p>
                </div>

              </div>

              <a
                href={`tel:${person.phone}`}
                className="text-yellow-400 font-bold text-lg"
              >
                {person.phone}
              </a>

            </div>
          ))}

        </div>

      </div>

      {/* 🔥 FIXED MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between p-4 text-white">
            <span className="text-lg font-semibold">Profile Photo</span>
            <button
              onClick={() => setSelectedImage(null)}
              className="text-2xl"
            >
              ✕
            </button>
          </div>

          {/* IMAGE AREA */}
          <div className="flex-1 flex items-center justify-center px-4 pb-6">

            <img
              src={selectedImage}
              alt="preview"
              className="max-w-full max-h-[80vh] object-contain"
            />

          </div>

        </div>
      )}

    </div>
  );
}