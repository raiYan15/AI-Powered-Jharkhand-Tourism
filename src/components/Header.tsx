import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
// Use public folder path for deployment
const logo = '/images/jharkhand-tourism-logo-new.png';

const Header = () => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-peach-700 hover:text-peach-900 transition-colors duration-300">
            <img src={logo} alt="Jharkhand Tourism Logo" className="w-40 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-black font-medium">
            <Link to="/" className="hover:text-peach-700 transition-colors duration-300">
              Home
            </Link>



            <Link to="/explore" className="hover:text-peach-700 transition-colors duration-300">
              Explore
            </Link>

            <Link to="/contact" className="hover:text-peach-700 transition-colors duration-300">
              Contact
            </Link>
            <Link
              to="/geo-transit-live"
              className="hover:text-peach-700 transition-colors duration-300 px-3 py-1 ml-2 rounded font-medium"
            >
              GeoTransit Live
            </Link>
            <Link
              to="/ar-demo"
              className="hover:text-peach-700 transition-colors duration-300 px-3 py-1 ml-2 rounded font-medium bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
            >
              360° AR Experience
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-peach-700 focus:outline-none">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden flex flex-col gap-4 mt-4 pb-4 text-black font-medium animate-fade-in-down">
            <Link to="/" className="hover:text-peach-700 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link to="/explore" className="hover:text-peach-700 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
              Explore
            </Link>
            <Link to="/contact" className="hover:text-peach-700 transition-colors duration-300" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
            <Link
              to="/geo-transit-live"
              className="hover:text-peach-700 transition-colors duration-300 px-3 py-1 mt-1 rounded font-medium"
              style={{ display: 'inline-block' }}
            >
              GeoTransit Live
            </Link>
            <Link
              to="/ar-demo"
              className="hover:text-peach-700 transition-colors duration-300 px-3 py-1 mt-1 rounded font-medium bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'inline-block' }}
            >
              360° AR Experience
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;