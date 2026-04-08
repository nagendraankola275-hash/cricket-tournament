"use client";

export default function LocationPage() {
  const ground = {
    name: "St. Benedict's Academy",
    address:
      "Post, Asirvanam, Anchepalya, Kumbalgodu, Bengaluru, Karnataka 560074",
    link: "https://www.google.com/maps?q=St+Benedicts+Academy+Bangalore",
  };

  const copyLocation = () => {
    navigator.clipboard.writeText(ground.link);
    alert("Location copied!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] text-white p-8">
      
      <h1 className="text-4xl font-bold text-center mb-10">
        📍 Match Location
      </h1>

      <div className="max-w-2xl mx-auto bg-[#0b1220] border border-gray-700 rounded-xl p-6 shadow-lg">

        <h2 className="text-2xl font-semibold mb-3">
          🏟 {ground.name}
        </h2>

        <p className="text-gray-400 mb-5">
          {ground.address}
        </p>

        {/* Map Link */}
        <a
          href={ground.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 font-medium hover:underline"
        >
          📍 Open in Google Maps
        </a>

        {/* Buttons */}
        <div className="mt-5">
          <button
            onClick={copyLocation}
            className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300"
          >
            Copy Location
          </button>
        </div>

        {/* Map Preview */}
        <iframe
          src="https://maps.google.com/maps?q=St+Benedicts+Academy+Bangalore&output=embed"
          className="w-full h-64 mt-6 rounded-lg"
        ></iframe>

      </div>
    </div>
  );
}