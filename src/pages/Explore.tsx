import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ImmersiveExperience from "../components/arvr/ImmersiveExperience";
import { enhancedPlaces } from "../data/arvrData";
import { Helmet } from "react-helmet-async";

const places = [
  {
    title: "Netarhat",
    description: "The Queen of Chotanagpur - known for its stunning sunsets and cool climate.",
    image: "/images/9ffc869f0419cc62a4e18896dc9b388b_1000x1000.jpg",
  },
  {
    title: "Betla National Park",
    description: "A dense forest full of wild animals, waterfalls, and scenic beauty.",
    image: "/images/Palamu.jpg",
  },
  {
    title: "Hundru Falls",
    description: "A mesmerizing waterfall and one of the highest in Jharkhand.",
    image: "/images/baghmunda-waterfall.jpg",
  },
  {
    title: "Dassam Falls",
    description: "A breathtaking waterfall near Ranchi, popular for its scenic surroundings.",
    image: "/images/DJI_0495-1536x2048.jpg",
  },
  {
    title: "Patratu Valley",
    description: "Known for its picturesque road, lush hills, and serene lake.",
    image: "/images/1707898054_213633-3-days-tour-to-jharkhand-slider-image.jpeg",
  },
  {
    title: "Parasnath Hill",
    description: "A famous Jain pilgrimage site and the highest mountain in Jharkhand.",
    image: "/images/2018040392-1024x678.jpg",
  },
  {
    title: "Baidyanath Dham (Deoghar)",
    description: "One of the twelve Jyotirlingas of Lord Shiva, a major pilgrimage destination.",
    image: "/images/baba-baidyanath-dham-deoghar-odisha-1-attr-hero.jpeg",
  },
  {
    title: "Jonha Falls",
    description: "Also known as Gautamdhara, this waterfall is surrounded by scenic landscapes.",
    image: "/images/2018052546-olw6vuniqrwk8ykogjwtfcxe3qte4j46zjdfdprvre.jpg",
  },
  {
    title: "Maithon Dam",
    description: "A huge reservoir on River Barakar, known as the 'Kashmir of Koyalanchal'.",
    image: "/images/Dimna-Lake-Jharkhand.jpg",
  },
  {
    title: "Rajrappa Temple",
    description: "A Shakti Peeth dedicated to Goddess Chhinnamasta, located at the confluence of rivers.",
    image: "/images/Garhwa_fort-_temple.jpg",
  },
];


// Animation Variants
const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function ExplorePage() {
  return (
    <section className="bg-peach-50 min-h-screen">
      <Helmet>
        <title>Explore | Jharkhand Tourism Guide</title>
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

      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <img
          src="/images/2018040392-1024x678.jpg"
          alt="Explore Jharkhand"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center text-white max-w-4xl px-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Explore Jharkhand
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience the beauty of Jharkhand through immersive AR/VR technology
            </p>
            
            {/* AR/VR Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">360° Virtual Reality</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Augmented Reality</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Interactive Hotspots</span>
              </div>
            </div>

            {/* AR Demo CTA Button */}
            <div className="mb-8">
              <Link 
                to="/ar-demo" 
                className="inline-block bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl transform"
              >
                🚀 Launch 360° AR Experience
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Places Section */}
      <motion.div
        className="max-w-6xl mx-auto px-6 py-16 space-y-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariant}
      >
        {/* AR/VR Experience Introduction */}
        <motion.div
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-peach-700 mb-6">
            Immersive Tourism Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Step into the future of tourism with our cutting-edge AR/VR technology. 
            Experience Jharkhand's breathtaking destinations like never before.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ rotateY: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="text-purple-600"
                >
                  🥽
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">360° Virtual Reality</h3>
              <p className="text-gray-600">
                Immerse yourself in stunning 360° panoramic views with interactive hotspots and guided information.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-blue-600"
                >
                  📱
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Augmented Reality</h3>
              <p className="text-gray-600">
                Use your mobile device to overlay digital information and interactive elements onto real-world views.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-green-600"
                >
                  🎯
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Interactive Hotspots</h3>
              <p className="text-gray-600">
                Discover hidden gems, historical facts, and booking options through intelligent interactive points.
              </p>
            </div>
          </div>
        </motion.div>

        {enhancedPlaces.map((place, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className={`flex flex-col-reverse md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="relative md:w-1/2">
              <motion.img
                src={place.image}
                alt={place.title}
                className="w-full rounded-3xl shadow-lg object-cover h-80"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              
              {/* AR/VR Experience Overlay */}
              <ImmersiveExperience
                imageUrl={place.image}
                title={place.title}
                description={place.description}
                className="absolute inset-0 rounded-3xl overflow-hidden"
              />
            </div>
            
            <motion.div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-peach-700 mb-4">{place.title}</h2>
              <p className="text-lg text-gray-600 mb-6">{place.description}</p>
              
              {/* Experience Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  360° Virtual Tour
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  AR Experience
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Interactive Hotspots
                </span>
                {place.elevation && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {place.elevation}m Elevation
                  </span>
                )}
                {place.height && (
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm font-medium">
                    {place.height} Height
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-500 space-y-1">
                <p>✨ Immerse yourself in the beauty of {place.title}</p>
                <p>📱 Experience with AR on your mobile device</p>
                <p>🎯 Discover hidden gems with interactive hotspots</p>
                {place.bestViewingTime && (
                  <p>🕒 Best time to visit: {place.bestViewingTime}</p>
                )}
                {place.vrFeatures && (
                  <p>🥽 VR Features: {place.vrFeatures.slice(0, 2).join(', ')}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <Footer />
    </section>
  );
}
