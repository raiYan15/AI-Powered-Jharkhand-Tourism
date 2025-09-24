import React from "react";
import { useParams, Link } from "react-router-dom";
import places from "../data/places.json";
import districts from "../data/districts.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from '../assets/images/jharkhand-tourism-logo-new.png';
import { Helmet } from "react-helmet-async";

export default function DistrictDetail() {
  const { id } = useParams();
  const district = districts.find((d) => d.id === id);
  const districtPlaces = places.filter((place) => place.districtId === id);

  if (!district) {
    return <div className="text-center p-10 text-red-600">District not found.</div>;
  }

  return (
    <div className="bg-[#fffdf9] text-black min-h-screen flex flex-col pt-20">
      <Helmet>
        <title>Explore {district.name} | Jharkhand Tourism Guide</title>
        <meta name="description" content="Explore Jharkhand's beautiful districts, tourist places, helplines and travel info in one place." />
        <meta name="keywords" content={`Jharkhand, tourism, travel`} />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:title" content="Jharkhand Tourism Guide | Home" />
        <meta property="og:description" content="Explore Jharkhand's beautiful districts, tourist places, helplines and travel info in one place." />
        <meta property="og:image" content="http://jharkhand.sbs/images/places/324231134_183657027598723_50202459.jpeg" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://jharkhand.sbs/" />
        <link rel="canonical" href="https://jharkhand.sbs/" />
      </Helmet>
      <Header />
      <main className="flex-1 w-full max-w-screen-xl mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-peach-600">{district.name}</h1>
            <p className="text-gray-600 text-lg">Explore top attractions in {district.name}</p>
          </div>
          {district.image && (
            <img
              src={logo}
              alt={`${district.name} Image`}
              className="w-full md:w-64 h-auto md:h-auto object-fit rounded-2xl mt-4 md:mt-0"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {districtPlaces.map((place) => (
            <div key={place.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col md:flex-row">
              {place.frontImage && (
                <div className="w-full md:w-1/2">
                  <img
                    src={place.frontImage}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col justify-between w-full">
                <div>
                  <h2 className="text-xl font-bold text-peach-700">{place.name}</h2>
                  <p className="text-sm italic text-gray-500">{place.location}</p>
                  <p className="mt-2 text-gray-800">{place.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
  {(Array.isArray(place.tourismType)
    ? place.tourismType
    : place.tourismType.split(",")
  ).map((tag, idx) => (
    <p
      key={idx}
      className="text-sm bg-peach-100 text-peach-700 inline-block px-2 py-1 rounded"
    >
      {tag.trim()}
    </p>
  ))}
</div>

                </div>
                <div className="mt-4 flex gap-4">
                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    View on Map
                  </a>
                  <Link
                    to={`/place/${place.id}`}
                    className="text-peach-600 hover:underline text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <iframe
          src={`https://maps.google.com/maps?q=${district.name}+district&output=embed`}
          width="100%"
          height="400"
          className="rounded-2xl border border-gray-300"
          loading="lazy"
        ></iframe>
      </main>
      <Footer />
    </div>
  );
}