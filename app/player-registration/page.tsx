"use client";

export default function PlayerRegistrationPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-start pt-20 px-4">

      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
        Player Registration Form
      </h1>

      {/* OPEN FULL FORM BUTTON */}
      <a
        href="https://forms.gle/mMVayS2yT7oB5sKr8" // ✅ NEW LINK
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition"
      >
        Open Full Form 🚀
      </a>

      {/* INFO CARD (REPLACED IFRAME) */}
      <div className="w-full max-w-2xl bg-[#111827] rounded-xl p-6 shadow-lg text-center">
        <p className="text-gray-300">
          Click the button above to complete your registration.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          The form will open in a new tab.
        </p>
      </div>

    </div>
  );
}