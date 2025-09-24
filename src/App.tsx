import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Place from "./pages/Place";
// import About from "./pages/About";
import Contact from "./pages/Contact";
import DistrictDetail from "./pages/DistrictDetail";
import AllDistricts from "./pages/AllDistricts";
import Explore from "./pages/Explore";
import TourismType from "./pages/TourismType";
import { HelmetProvider } from "react-helmet-async";
import JoinUs from './pages/JoinUs';
import TouristSignup from "./pages/TouristSignup";
import { TouristDashboard } from './pages/TouristDashboard';

import VendorLogin from './pages/VendorDashboard/VendorLogin';
import VendorSignup from './pages/VendorDashboard/VendorSignup';
import VendorDashboard from './pages/VendorDashboard/VendorDashboard';
import GuideLogin from './pages/GuideDashboard/GuideLogin';
import GuideSignup from './pages/GuideDashboard/GuideSignup';
import GuideDashboard from './pages/GuideDashboard/GuideDashboard';
import AdminLogin from './pages/AdminDashboard/AdminLogin';
import AdminSignup from './pages/AdminDashboard/AdminSignup';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

import { AuthProvider } from './components/auth/AuthProvider';


import GeoLocation from './components/GeoLocation';
import GeoTransitLive from './components/GeoTransitLive';
import RanchiDayPlan from './components/RanchiDayPlan';
import ARDemo from './pages/ARDemo';

export default function App() {

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/district/:id" element={<DistrictDetail />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/districts" element={<AllDistricts />} />
          {/* <Route path="/about/:section?" element={<About />} /> */}
          <Route path="/tourism/:type" element={<TourismType />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/signup/tourist" element={<TouristSignup />} />
          <Route path="/ranchi-day-plan" element={<RanchiDayPlan />} />
          <Route path="/geo-location" element={<GeoLocation />} />
          <Route path="/geo-transit-live" element={<GeoTransitLive />} />
          <Route path="/ar-demo" element={<ARDemo />} />

          {/* Authenticated dashboards and login/signup routes (flattened) */}
          <Route path="/dashboard" element={<AuthProvider><TouristDashboard /></AuthProvider>} />
          <Route path="/vendor-login" element={<AuthProvider><VendorLogin /></AuthProvider>} />
          <Route path="/vendor-signup" element={<AuthProvider><VendorSignup /></AuthProvider>} />
          <Route path="/vendor-dashboard" element={<AuthProvider><VendorDashboard /></AuthProvider>} />
          <Route path="/guide-login" element={<AuthProvider><GuideLogin /></AuthProvider>} />
          <Route path="/guide-signup" element={<AuthProvider><GuideSignup /></AuthProvider>} />
          <Route path="/guide-dashboard" element={<AuthProvider><GuideDashboard /></AuthProvider>} />
          <Route path="/admin-login" element={<AuthProvider><AdminLogin /></AuthProvider>} />
          <Route path="/admin-signup" element={<AuthProvider><AdminSignup /></AuthProvider>} />
          <Route path="/admin-dashboard" element={<AuthProvider><AdminDashboard /></AuthProvider>} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}
