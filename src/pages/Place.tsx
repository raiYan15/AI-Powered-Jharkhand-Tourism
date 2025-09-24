import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import places from "../data/places.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Modal from "react-modal";
import { Link } from "react-router-dom";

// Bind modal to app root
Modal.setAppElement("#root");

export default function Place() {
  const { id } = useParams();
  const placeData = places.find((p) => p.id === id);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const [modalCredit, setModalCredit] = useState("");

  function openModal(url, credit) {
    setModalImg(url);
    setModalCredit(credit || "Unknown Photographer");
    setModalOpen(true);
  }

  if (!placeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-red-600">Place not found</p>
      </div>
    );
  }

  return (
    <div className="relative bg-peach-50 min-h-screen">
      {placeData && (
        <Helmet>
        <title>{placeData.name} | Jharkhand Tourism</title>
        <meta name="description" content={placeData.description} />
        <meta name="keywords" content={`Jharkhand, ${placeData.name}, tourism, travel`} />
        <meta name="robots" content="index, follow" />
      
        {/* Open Graph tags */}
        <meta property="og:title" content={placeData.name} />
        <meta property="og:description" content={placeData.description} />
        <meta property="og:image" content={placeData.frontImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://jharkhand.sbs/place/${placeData.id}`} />
      
        {/* Canonical */}
        <link rel="canonical" href={`https://jharkhand.sbs/place/${placeData.id}`} />
      </Helmet>
      )}
      
      <div
        className="absolute inset-0 bg-repeat opacity-10 z-0"
        style={{
          backgroundImage: "url('/images/travel-pattern.png')",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Foreground */}
      <div className="relative z-10">
        <Header />

        <div className="p-6 pt-20 mt-10 max-w-5xl mx-auto space-y-10">
          {/* Front Image */}
          <div className="relative">
            <img
              src={placeData.frontImage}
              alt={placeData.name}
              className="w-full rounded-2xl shadow-lg object-cover max-h-[400px]"
            />
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
            Photo By: {placeData.frontImagecredit}
            </div>
          </div>

          {/* Main Info */}
          <div>
            <h2 className="text-4xl font-bold text-peach-700">
              {placeData.name}
            </h2>
            <p className="text-lg text-gray-700 mt-2">
              {placeData.description}
            </p>
            <p className="text-gray-600 mt-4">{placeData.longDesc}</p>
          </div>

          {/* How to Reach / Visitor Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-peach-600 mb-2">
                How to Reach
              </h3>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>By Air:</strong> {placeData.howToReach.byAir}
                </li>
                <li>
                  <strong>By Train:</strong> {placeData.howToReach.byTrain}
                </li>
                <li>
                  <strong>By Road:</strong> {placeData.howToReach.byRoad}
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-peach-600 mb-2">
                Visitor Info
              </h3>
              <ul className="space-y-1 text-gray-700">
                <li>
                  <strong>Best Time to Visit:</strong>{" "}
                  {placeData.bestTimeToVisit}
                </li>
                <li>
                  <strong>Managed By:</strong> {placeData.managedBy}
                </li>
                <li>
                  <strong>Ticket Info:</strong> {placeData.ticketInformation}
                </li>
              </ul>
            </div>
          </div>
          <iframe
          src={`https://maps.google.com/maps?q=${placeData.name}&output=embed`}
          width="100%"
          height="400"
          className="rounded-2xl border border-gray-300"
          loading="lazy"
        ></iframe>
          {/* Activities */}
          <div>
            <h3 className="text-2xl font-semibold text-peach-600 mb-2">
              Activities
            </h3>
            <ul className="flex flex-wrap gap-2">
              {placeData.activities.map((activity, idx) => (
                <li
                  key={idx}
                  className="bg-peach-100 px-3 py-1 rounded-full text-sm text-peach-700"
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>

          {/* Photo Gallery */}
          <div>
            <h3 className="text-2xl font-semibold text-peach-600 mb-2">
              Photo Gallery
            </h3>

            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              spaceBetween={10}
              slidesPerView={1}
              loop
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="rounded-lg"
            >
              {placeData.photoGallery.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img.url}
                    alt={`Gallery ${idx + 1} ${placeData.name}`}
                    onClick={() => openModal(img.url, img.credit)}
                    className="cursor-pointer rounded-lg shadow hover:scale-105 h-60 transition-transform"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Image Modal */}
            <Modal
              isOpen={modalOpen}
              onRequestClose={() => setModalOpen(false)}
              contentLabel="Image Preview"
              style={{
                overlay: {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  zIndex: 50,
                },
                content: {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "#fff",
                  padding: "10px",
                  borderRadius: "12px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  overflow: "auto",
                },
              }}
            >
              <div className="relative">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute right-2 text-black text-xl font-bold hover:text-red-500"
                >
                  ×
                </button>
                <p className="text-sm text-gray-600 mb-2 text-center">
                  Image Credit: {modalCredit}
                </p>
                <img
                  src={modalImg}
                  alt="Full"
                  className="rounded-xl max-h-auto  w-full object-contain"
                />
              </div>
            </Modal>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-peach-600 mb-2">
              Contact
            </h3>
            <p className="text-gray-700">
              <strong>Helpline:</strong> {placeData.contact.localHelpline}
              <br />
              <strong>Tourism Office:</strong>{" "}
              {placeData.contact.tourismOffice}
              <br />
              <strong>Police Station:</strong> {placeData.contact.policeOffice}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 items-center mt-4">
            <a
              href={placeData.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-peach-600 text-white rounded-lg hover:bg-peach-700 transition"
            >
              View on Map
            </a>

            <Link
              to={`/district/${placeData.districtId}`}
              className="px-4 py-2 border border-peach-600 text-peach-700 rounded-lg hover:bg-peach-50 transition"
            >
              More on{" "}
              {placeData.districtId.charAt(0).toUpperCase() +
                placeData.districtId.slice(1)}
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
