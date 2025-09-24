import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, Globe, Eye, MapPin, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImmersiveExperience from '../components/arvr/ImmersiveExperience';
import { enhancedPlaces } from '../data/arvrData';

export default function ARDemo() {
  const featuredPlaces = enhancedPlaces.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#fffdf9]">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-peach-50 to-amber-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Link 
                  to="/explore"
                  className="inline-flex items-center gap-2 text-peach-600 hover:text-peach-700 transition-colors mb-4"
                >
                  <ArrowLeft size={20} />
                  Back to Explore
                </Link>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
                  360° AR Experience
                </h1>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Immerse yourself in Jharkhand's breathtaking destinations with cutting-edge 
                  Augmented Reality and 360° panoramic technology
                </p>
              </motion.div>

              {/* Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">AR Camera View</h3>
                  <p className="text-gray-600 text-sm">
                    Point your camera to overlay digital content in real space
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">360° Panoramic</h3>
                  <p className="text-gray-600 text-sm">
                    Explore destinations with immersive panoramic views
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Eye size={24} className="text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Interactive Hotspots</h3>
                  <p className="text-gray-600 text-sm">
                    Click on information points for guides, history, and bookings
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Experience Jharkhand in 360°
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose from our featured destinations and immerse yourself in their beauty 
                through advanced AR and VR technology
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPlaces.map((place, index) => (
                <motion.div
                  key={place.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <ImmersiveExperience
                      imageUrl={place.image}
                      title={place.title}
                      description={place.description}
                      className="w-full h-full"
                      mode="both"
                      initialMode="360"
                    />
                    
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                    <h3 className="text-white font-bold text-xl mb-2">{place.title}</h3>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">
                      {place.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-white/70 text-xs">
                        {place.elevation && (
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{place.elevation}m</span>
                          </div>
                        )}
                        {place.bestViewingTime && (
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>Best: {place.bestViewingTime.split('(')[0]}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs">4.8</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience Tags */}
                  <div className="absolute top-4 right-4">
                    <div className="flex gap-2">
                      <div className="bg-blue-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                        AR
                      </div>
                      <div className="bg-green-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                        360°
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Instructions Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                How to Use AR & 360° Experience
              </h2>
              <p className="text-gray-600">
                Follow these simple steps to get the most out of your immersive experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* AR Instructions */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Camera size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">AR Camera Mode</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-gray-600">Click "AR View" on any destination image</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-gray-600">Allow camera permissions when prompted</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-gray-600">Point camera at a flat surface</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <p className="text-gray-600">Tap on hotspots for information and bookings</p>
                  </div>
                </div>
              </motion.div>

              {/* 360° Instructions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Globe size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">360° Panoramic Mode</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <p className="text-gray-600">Click "360° View" on any destination image</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <p className="text-gray-600">Drag to look around the panoramic view</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <p className="text-gray-600">Scroll to zoom in and out</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <p className="text-gray-600">Click blue hotspots for detailed information</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Device Compatibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 mt-8"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                Device Compatibility
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Mobile Devices</h4>
                  <p className="text-gray-600 text-sm">
                    Full AR and 360° support with device orientation controls
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl mb-2">💻</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Desktop/Laptop</h4>
                  <p className="text-gray-600 text-sm">
                    360° panoramic views with mouse controls (AR requires webcam)
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl mb-2">📟</div>
                  <h4 className="font-semibold text-gray-800 mb-2">VR Headsets</h4>
                  <p className="text-gray-600 text-sm">
                    Enhanced immersive experience with WebXR support
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}