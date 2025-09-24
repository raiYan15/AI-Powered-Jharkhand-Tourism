import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import DistrictSelector from "../components/DistrictSelector";
import TourismTypes from "../components/TourismTypes";
import Helplines from "../components/Helplines";
import Footer from "../components/Footer";
import MissionSection from "../components/MissionSection"
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <div className="bg-[#fdf8f3] text-black font-sans">
      <Helmet>
        <title>Jharkhand Tourism Guide | Home</title>
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
      <Hero />
      <div className="flex justify-center gap-4 mt-6">
        {/* Removed extra orange buttons as requested */}
      </div>
      <DistrictSelector />
      <TourismTypes />
      <Helplines />
      <MissionSection />
      <Footer />
    </div>
  );
}
