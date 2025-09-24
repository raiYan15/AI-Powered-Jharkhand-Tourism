import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/images/jharkhand-tourism-logo-new.png';
import '../assets/styles/index.css';

const logos = [
  {
    src: "https://amritkaal.nic.in/writereaddata/portal/images/Amritkaal-Logo-03.png",
    alt: "Amrit Kaal",
    url: "https://amritkaal.nic.in/",
  },
  {
    src: "https://cdn.digitalindiacorporation.in/wp-content/themes/di-child/assets/images/digital-india.svg.gzip",
    alt: "Digital India",
    url: "https://www.digitalindia.gov.in/",
  },
  {
    src: "https://utsav.gov.in/public/images/logo/Incredible_Logo_1.png",
    alt: "Incredible India",
    url: "https://www.incredibleindia.org/",
  },
  {
    src: "http://www.g20.in/en/images/home/g20-logo.png",
    alt: "G20 India",
    url: "https://www.g20.org/en/",
  },
  {
    src: "https://www.incredibleindia.gov.in/content/dam/incredible-india/images/tfl/Badge.png",
    alt: "Travel for Life",
    url: "https://www.incredibleindia.org/content/incredible-india-v2/en/campaigns/travel-for-life.html",
  },
  {
    src: "https://tourism.jharkhand.gov.in/app-assets/image/logo_1.png",
    alt: "Jharkhand Tourism",
    url: "https://tourism.jharkhand.gov.in/",
  },
  {
    src: "https://utsav.gov.in/public/images/landing-logo2.png.png",
    alt: "Utsav",
    url: "https://utsav.gov.in/",
  },
  {
    src: "https://cdnbbsr.s3waas.gov.in/s34c144c47ecba6f8318128703ca9e2601/uploads/2020/10/2020100877.jpg",
    alt: "Beti Bachao Beti Padhao",
    url: "https://wcd.nic.in/bbbp-schemes",
  },
  {
    src: "https://swachhbharatmission.ddws.gov.in/themes/custom/repo-theme-master/images/swach-bharat.png",
    alt: "Swachh Bharat Mission",
    url: "https://swachhbharatmission.gov.in/",
  },
];

export default function Hero() {
  return (
    <section className="bg-[#fffdf9] text-black">
      {/* Hero Image */}
      <div
        className="w-full h-[90vh] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: "url('../images/E_OI6qMUUAYIYQg.jpg')",
        }}
      >
        {/* Blur overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-in-up">
  {/* Leaves/FLOWERS */}
  <img
    src="/images/illustration-of-butea-monosperma-removebg-preview.png"
    className="absolute -left-10 top-6 w-12 animate-float-slow hidden md:block"
    alt="Leaf"
  />
  <img
    src="/images/illustration-of-butea-monosperma-removebg-preview.png"
    className="absolute -right-10 top-20 w-20 animate-float-slow hidden md:block"
    alt="Flower"
  />

  {/* Title with shimmer */}
  <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-peach-100 via-white to-peach-200 animate-text-shimmer drop-shadow-xl">
    Discover the <br /> Beauty of Jharkhand
  </h1>

  {/* Subtitle */}
  <p className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow-sm">
    Explore 24 districts of natural landscapes,
    <br />
    spiritual sanctuaries, art & culture, and more.
  </p>

  {/* Button group with glowing revolving border */}
  <div className="flex justify-center gap-4">
    <Link
      to="/districts"
      className="relative inline-block py-3 px-6 rounded-full font-semibold text-white bg-peach-600 hover:bg-peach-700 transition-all duration-300 shadow-lg hover:scale-105 glow-border animate-glow"
    >
      <span className="relative z-10">Start Exploring</span>
      <div className="absolute inset-0 rounded-full border-2 border-peach-400 opacity-60 animate-pulse-border" />
    </Link>
    <Link
      to="/join"
      className="relative inline-block py-3 px-6 rounded-full font-semibold text-white bg-peach-600 hover:bg-peach-700 transition-all duration-300 shadow-lg hover:scale-105 glow-border animate-glow"
    >
      <span className="relative z-10">Join Us</span>
      <div className="absolute inset-0 rounded-full border-2 border-peach-400 opacity-60 animate-pulse-border" />
    </Link>
  </div>
</div>

      </div>

      {/* Logo Strip */}
      <div className="border-t border-peach-300">
        <div className="relative overflow-hidden bg-white py-4 shadow-inner group">
          {/* Gradient sides */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

          {/* Sliding logos */}
          <div className="whitespace-nowrap flex w-max animate-scroll-x group-hover:[animation-play-state:paused]">
            {[...logos, ...logos].map((logo, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center px-8"
              >
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-14 w-auto hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
