"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function PlayerRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
    paymentId: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "players"), {
        name: formData.name,
        phone: formData.phone,
        role: formData.role,
        paymentId: formData.paymentId,
        createdAt: new Date(),
      });

      setSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        role: "",
        paymentId: "",
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex flex-col items-center justify-center px-4">

      {/* TITLE */}
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center whitespace-nowrap">
        Players Registration Google Form
      </h1>

      {/* FORM */}
      <div className="bg-[#111827] p-6 rounded-xl w-full max-w-md shadow-lg">

        {submitted ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-400">
              ✅ Registration Submitted!
            </h2>
            <p className="mt-2 text-gray-300">
              Player added successfully 🚀
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Player Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded bg-[#1f2937] border border-gray-600"
            />

            {/* PHONE */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="p-3 rounded bg-[#1f2937] border border-gray-600"
            />

            {/* ROLE */}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="p-3 rounded bg-[#1f2937] border border-gray-600"
            >
              <option value="">Select Role</option>
              <option value="Batsman">Batsman</option>
              <option value="Bowler">Bowler</option>
              <option value="All-Rounder">All-Rounder</option>
              <option value="Wicket Keeper">Wicket Keeper</option>
            </select>

            {/* PAYMENT ID */}
            <input
              type="text"
              name="paymentId"
              placeholder="UPI Transaction / Payment Reference ID"
              value={formData.paymentId}
              onChange={handleChange}
              required
              className="p-3 rounded bg-[#1f2937] border border-gray-600"
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-2 rounded font-semibold hover:scale-105 transition"
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}