import React, { useState } from "react";
import { useParams } from "react-router-dom";
import places from "../data/places.json";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TourismType() {
  const { type } = useParams();
  const tourismType = type.toLowerCase();

  const filteredPlaces = places.filter(place =>
    place.tourismType?.map(t => t.toLowerCase()).includes(tourismType)
  );

  const [visibleCount, setVisibleCount] = useState(6);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <div className="bg-peach-50 min-h-screen flex flex-col">
  <Header />
  
  {/* Main Content Section */}
  <main className="flex-grow pt-32 max-w-6xl mx-auto px-4 w-full">
    <h1 className="text-4xl font-bold text-peach-700 capitalize mb-6">
      {tourismType} Tourism
    </h1>

    {filteredPlaces.length === 0 ? (
      <p className="text-gray-600">No places found for this category.</p>
    ) : (
      <>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredPlaces.slice(0, visibleCount).map(place => (
            <div key={place.id} className="bg-white rounded-xl shadow hover:shadow-md transition">
              <img
                src={place.frontImage}
                alt={place.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-peach-700">{place.name}</h2>
                <p className="text-sm text-gray-600 line-clamp-3">{place.description}</p>
                <a
                  href={`/place/${place.id}`}
                  className="text-peach-600 mt-2 inline-block hover:underline"
                >
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredPlaces.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              className="px-5 py-2 bg-peach-600 text-white rounded-lg hover:bg-peach-700 transition"
            >
              Load More
            </button>
          </div>
        )}
      </>
    )}
  </main>

  <Footer />
</div>

  );
}
