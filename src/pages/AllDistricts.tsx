import React from "react";
import districts from "../data/districts.json";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import MissionSection from "../components/MissionSection";
import Footer from "../components/Footer";

const DistrictsPage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
  <Header />
  <main className="flex-1 p-4 mt-10  md:p-10 bg-peach-100">
    <h1 className="text-3xl font-bold text-center text-peach-600 mb-8 mt-10">
      Districts of Jharkhand
    </h1>
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {districts
  .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical sort
  .map((district) => (
    <div
      key={district.id}
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-peach-300 flex flex-col-reverse md:flex-row"
    >
      {/* Info */}
      <div className="p-4 flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h2 className="text-xl font-semibold text-peach-600 mb-2">
            {district.name}
          </h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              <span className="font-medium">Area:</span> {district.area} km²
            </li>
            <li>
              <span className="font-medium">Blocks:</span> {district.blocks}
            </li>
            <li>
              <span className="font-medium">Population:</span> {district.population}
            </li>
            <li>
              <span className="font-medium">Villages:</span> {district.villages}
            </li>
          </ul>
        </div>
        <div className="mt-4">
          <Link
            to={`/district/${district.id}`}
            className="inline-block px-4 py-2 rounded-lg bg-peach-500 hover:bg-peach-600 text-white text-sm font-semibold transition"
          >
            Explore {district.name}
          </Link>
        </div>
      </div>

      {/* Image */}
      <div className="w-full md:w-1/2 aspect-video md:aspect-auto max-h-64 md:max-h-50">
        <img
          src={`${district.image}`}
          alt={`${district.name}`}
          className="w-full h-full object-cover transition-opacity"
        />
      </div>
    </div>
))}

    </div>
  </main>
  <MissionSection />
  <Footer />
</div>

  );
};

export default DistrictsPage;