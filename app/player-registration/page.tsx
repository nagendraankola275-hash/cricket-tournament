"use client";

export default function PlayerRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-start pt-20 px-4">

      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Player Registration
      </h1>

      {/* OPEN FORM BUTTON */}
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeCj7hdIbRN3xSKmAJiDMxn--a12VJB_i-HBJicYC3yehr3QQ/viewform"
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition"
      >
        Open Full Form
      </a>

      {/* GOOGLE FORM EMBED */}
      <div className="w-full max-w-5xl bg-[#111827] rounded-xl p-4 shadow-lg">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeCj7hdIbRN3xSKmAJiDMxn--a12VJB_i-HBJicYC3yehr3QQ/viewform?embedded=true"
          width="100%"
          height="900"
          className="rounded-lg"
          style={{ border: "none" }}
        >
          Loading…
        </iframe>
      </div>

    </div>
  );
}