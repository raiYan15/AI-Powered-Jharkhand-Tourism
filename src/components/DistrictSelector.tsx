import React, { useState } from "react";
import districts from "../data/districts.json";
import { Link } from "react-router-dom";
import "../styles/particles.css";

const DistrictSelector = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-peach-100 to-white flex items-center justify-center overflow-hidden">
      {/* Particles & Orbits */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "url('../images/travel-pattern.png')",
          backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
        }}
        >
      <div className="floating-leaves">
  {Array.from({ length: 40 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = 10 + Math.random() * 10;

    return (
      <span
        key={i}
        style={{
          left: `${left}%`,
          top: `${-Math.random() * 20}vh`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      />
    );
  })}
</div>

        <div className="orbit-lines"></div>
      </div>

      {/* Central Jharkhand Label */}
      <div className="absolute w-24 h-24 md:w-28 md:h-28 rounded-full bg-peach-600 text-white flex items-center justify-center text-lg md:text-xl font-bold z-20 shadow-2xl animate-pulse backdrop-blur-md bg-opacity-80">
        Jharkhand
      </div>

      {/* Rotating Orbit Container */}
      <div className="relative z-10 w-[70vmin] h-[70vmin] rounded-full animate-slow-spin">
        {districts.map((district, index) => {
          const angle = (360 / districts.length) * index;
          const radius = 28 + (index % 2) * 14; // Tighter layers
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          const isHovered = hovered === index;

          return (
            <Link
              key={district.id}
              to={`/district/${district.id}`}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              className={`absolute flex items-center justify-center rounded-full text-center transition-all duration-700 ease-in-out cursor-pointer backdrop-blur-md
                ${isHovered
                  ? "scale-125 z-30 shadow-xl ring-4 ring-peach-300 bg-white text-peach-600"
                  : "scale-100 z-10 bg-peach-100 text-peach-700 hover:shadow-md"}`}
              style={{
                left: `calc(50% + ${x}vmin - 2.25rem)`,
                top: `calc(50% + ${y}vmin - 2.25rem)`,
                width: "4.5rem",
                height: "4.5rem",
              }}
            >
              <span
        className="text-[0.8rem] font-semibold pointer-events-none text-center px-1"
        style={{
          transform: `rotate(${-angle}deg)`,
          display: "block",
          width: "100%",
        }}
      >
                {district.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DistrictSelector;
