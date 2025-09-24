import React from "react";
import { Link } from "react-router-dom";

const tourismTypes = [
  {
    label: "Nature & Wildlife",
    slug: "nature",
    image: "/images/Palamu.jpg",
  },
  {
    label: "Historical & Heritage",
    slug: "heritage",
    image: "/images/Garhwa_fort-_temple.jpg",
  },
  {
    label: "Religious & Spiritual",
    slug: "religious",
    image: "/images/baba-baidyanath-dham-deoghar-odisha-1-attr-hero.jpeg",
  },
  {
    label: "Adventure & Trekking",
    slug: "adventure",
    image: "/images/2018040392-1024x678.jpg",
  },
  {
    label: "Cultural & Tribal",
    slug: "cultural",
    image: "/images/jampat.jpg",
  },
  {
    label: "Waterfalls & Lakes",
    slug: "water",
    image: "/images/baghmunda-waterfall.jpg",
  },
];

const TourismTypes = () => {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-peach-600 mb-8">Types of Tourism</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 px-4">
        {tourismTypes.map((type) => (
          <Link
            key={type.slug}
            to={`/tourism/${type.slug}`}
            className="block bg-peach-100 hover:bg-peach-200 text-center font-medium rounded-xl p-6 shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={type.image}
              alt={type.label}
              className="w-full h-32 object-cover rounded-lg mb-4"
              loading="lazy"
            />
            {type.label}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TourismTypes;
