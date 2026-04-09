"use client";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white px-6 py-16 flex flex-col items-center">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Player Registration
      </h1>

      {/* BUTTON */}
      <button
        onClick={() =>
          window.open(
            "https://forms.gle/mMVayS2yT7oB5sKr8",
            "_blank"
          )
        }
        className="
          bg-gradient-to-r from-yellow-400 to-orange-500
          text-black
          px-8 py-3
          rounded-full
          font-semibold
          text-lg
          hover:scale-105
          transition duration-300
          shadow-lg shadow-orange-500/20
        "
      >
        Open Full Form 🚀
      </button>

      {/* INFO CARD */}
      <div className="mt-12 max-w-2xl text-center bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-2xl">
        <p className="text-gray-300">
          Click the button above to complete your registration.
          <br />
          The form will open in a new tab.
        </p>
      </div>

    </div>
  );
}