import React, { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Smartphone, RotateCcw, MapPin, Info, Eye, Globe, Maximize } from 'lucide-react';
import PanoramicViewer from './PanoramicViewer';

interface ARViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
  hotspots?: ARHotspot[];
  onAnalytics?: (event: string, duration: number) => void;
  mode?: 'ar' | '360' | 'both';
  initialMode?: 'ar' | '360';
}

interface ARHotspot {
  id: string;
  position: [number, number];
  title: string;
  description: string;
  link?: string;
  type: 'info' | 'guide' | 'ticket';
}

interface ARObject {
  id: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  type: 'frame' | 'info' | 'marker';
}

export default function ARViewer({ 
  isOpen, 
  onClose, 
  imageUrl, 
  title, 
  description, 
  hotspots = [],
  onAnalytics,
  mode = 'both',
  initialMode = 'ar'
}: ARViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isARSupported, setIsARSupported] = useState(false);
  const [isARActive, setIsARActive] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<ARHotspot | null>(null);
  const [startTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [arObjects, setArObjects] = useState<ARObject[]>([]);
  const [viewMode, setViewMode] = useState<'ar' | '360' | 'selection'>(mode === 'both' ? 'selection' : initialMode);
  const [show360View, setShow360View] = useState(false);

  // Check AR support
  useEffect(() => {
    const checkARSupport = async () => {
      if ('xr' in navigator) {
        try {
          // @ts-ignore
          const isSupported = await navigator.xr.isSessionSupported('immersive-ar');
          setIsARSupported(isSupported);
        } catch (error) {
          console.log('WebXR AR not supported');
          // Fallback to camera API
          setIsARSupported('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
        }
      } else {
        // Fallback to camera API
        setIsARSupported('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices);
      }
    };

    if (isOpen) {
      checkARSupport();
    }
  }, [isOpen]);

  // Initialize camera feed
  const startCamera = useCallback(async () => {
    if (!videoRef.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setIsARActive(true);
      
      // Initialize AR objects
      setArObjects([
        {
          id: 'main-frame',
          position: [0, 0, -2],
          rotation: [0, 0, 0],
          scale: [1.5, 1, 0.1],
          type: 'frame'
        }
      ]);

      if (onAnalytics) {
        onAnalytics('ar_session_start', 0);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setError('Camera access denied. Please enable camera permissions and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onAnalytics]);

  // Stop camera feed
  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsARActive(false);
  }, []);

  // Analytics tracking
  useEffect(() => {
    if (isOpen && onAnalytics) {
      return () => {
        const duration = Date.now() - startTime;
        onAnalytics('ar_session_end', duration);
      };
    }
  }, [isOpen, onAnalytics, startTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleClose = useCallback(() => {
    stopCamera();
    if (onAnalytics) {
      const duration = Date.now() - startTime;
      onAnalytics('ar_session_close', duration);
    }
    onClose();
  }, [onClose, onAnalytics, startTime, stopCamera]);

  const handleHotspotClick = useCallback((hotspot: ARHotspot) => {
    setSelectedHotspot(hotspot);
    if (onAnalytics) {
      onAnalytics('ar_hotspot_click', 0);
    }
  }, [onAnalytics]);

  const handle360View = useCallback(() => {
    setShow360View(true);
    if (onAnalytics) {
      onAnalytics('360_view_start', 0);
    }
  }, [onAnalytics]);

  const handleModeSwitch = useCallback((newMode: 'ar' | '360') => {
    setViewMode(newMode);
    if (newMode === '360') {
      setShow360View(true);
    } else {
      setShow360View(false);
    }
    if (onAnalytics) {
      onAnalytics(`mode_switch_${newMode}`, 0);
    }
  }, [onAnalytics]);

  if (!isOpen) return null;

  // Show 360° Panoramic Viewer
  if (show360View) {
    return (
      <PanoramicViewer
        isOpen={true}
        onClose={() => {
          setShow360View(false);
          if (mode === 'both') {
            setViewMode('selection');
          } else {
            handleClose();
          }
        }}
        imageUrl={imageUrl}
        title={title}
        description={description}
        hotspots={hotspots.map(h => ({
          ...h,
          position: [h.position[0] * 5, h.position[1] * 5, -200] as [number, number, number],
          spherical: [400, Math.PI * (h.position[1] / 100), Math.PI * 2 * (h.position[0] / 100)] as [number, number, number]
        }))}
        onAnalytics={onAnalytics}
        is360Mode={true}
      />
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Mode Selection Screen */}
        {viewMode === 'selection' && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center p-8 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Choose Your Experience</h2>
                <p className="text-gray-300 mb-8">
                  Experience {title} in multiple immersive ways
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* AR Experience Option */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleModeSwitch('ar')}
                  className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6 cursor-pointer hover:border-blue-400/60 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">AR Experience</h3>
                  <p className="text-gray-300 text-sm">
                    Use your camera to view {title} with augmented reality overlays and interactive hotspots
                  </p>
                  <div className="mt-4 text-blue-400 text-sm font-medium">
                    Requires camera access
                  </div>
                </motion.div>

                {/* 360° Experience Option */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleModeSwitch('360')}
                  className="bg-gradient-to-br from-green-500/20 to-teal-600/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 cursor-pointer hover:border-green-400/60 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">360° Panoramic</h3>
                  <p className="text-gray-300 text-sm">
                    Explore {title} with immersive 360-degree panoramic views and 3D hotspots
                  </p>
                  <div className="mt-4 text-green-400 text-sm font-medium">
                    Works on all devices
                  </div>
                </motion.div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                or skip this experience
              </motion.button>
            </div>
          </div>
        )}

        {/* AR Camera View */}
        {viewMode === 'ar' && isARActive && (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              playsInline
              muted
            />
            
            {/* AR Canvas Overlay */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* AR Frame Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                {/* Main AR Frame */}
                <div className="relative w-80 h-60 border-4 border-peach-400 rounded-lg shadow-2xl overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* AR Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{title}</h3>
                    <p className="text-white/80 text-sm">{description}</p>
                  </div>
                </div>

                {/* AR Hotspots */}
                {hotspots.map((hotspot, index) => (
                  <motion.div
                    key={hotspot.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{
                      left: `${hotspot.position[0]}%`,
                      top: `${hotspot.position[1]}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleHotspotClick(hotspot)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse ${
                      hotspot.type === 'info' ? 'bg-blue-500' :
                      hotspot.type === 'guide' ? 'bg-green-500' :
                      'bg-yellow-500'
                    }`}>
                      {hotspot.type === 'info' ? <Info size={16} /> :
                       hotspot.type === 'guide' ? <MapPin size={16} /> :
                       <Eye size={16} />}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Switch to 360° Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handle360View}
              className="absolute top-20 right-4 bg-green-500/80 backdrop-blur-sm hover:bg-green-600/80 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
            >
              <Globe size={16} />
              360° View
            </motion.button>

            {/* AR Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-24 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Camera size={20} />
                <span className="font-medium">AR Experience Active</span>
              </div>
              <p className="text-sm opacity-80">
                Move your device to view the {title} in augmented reality
              </p>
            </motion.div>
          </div>
        )}

        {/* AR Initialization Screen */}
        {viewMode === 'ar' && !isARActive && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center p-8 max-w-md">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="w-24 h-24 bg-peach-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">AR Experience</h2>
                <p className="text-gray-300 mb-6">
                  Experience {title} in augmented reality. Point your camera at a flat surface to begin.
                </p>
              </motion.div>

              {error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-6"
                >
                  {error}
                </motion.div>
              ) : null}

              <div className="space-y-4">
                {isARSupported ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startCamera}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-peach-500 to-peach-600 text-white py-4 rounded-xl font-medium hover:from-peach-600 hover:to-peach-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Starting Camera...' : 'Start AR Experience'}
                  </motion.button>
                ) : (
                  <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-lg">
                    AR is not supported on this device. Please try on a mobile device with camera access.
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handle360View}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Globe size={20} />
                  Try 360° View Instead
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* UI Controls */}
        {(viewMode === 'ar' && isARActive) && (
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto z-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg max-w-md"
            >
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm opacity-80">AR Mode</p>
            </motion.div>
            
            <div className="flex gap-2">
              {mode === 'both' && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setViewMode('selection')}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                  title="Switch Mode"
                >
                  <Maximize size={20} />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  // Reset AR view
                  setArObjects([
                    {
                      id: 'main-frame',
                      position: [0, 0, -2],
                      rotation: [0, 0, 0],
                      scale: [1.5, 1, 0.1],
                      type: 'frame'
                    }
                  ]);
                }}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              >
                <RotateCcw size={20} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              >
                <X size={20} />
              </motion.button>
            </div>
          </div>
        )}

        {/* Mode Selection UI Controls */}
        {viewMode === 'selection' && (
          <div className="absolute top-4 right-4 pointer-events-auto z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
            >
              <X size={20} />
            </motion.button>
          </div>
        )}

        {/* Hotspot Details Modal */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-4 flex items-center justify-center pointer-events-auto z-30"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      selectedHotspot.type === 'info' ? 'bg-blue-100 text-blue-600' :
                      selectedHotspot.type === 'guide' ? 'bg-green-100 text-green-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {selectedHotspot.type === 'info' ? <Info size={20} /> :
                       selectedHotspot.type === 'guide' ? <MapPin size={20} /> :
                       <Eye size={20} />}
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {selectedHotspot.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Close hotspot details"
                    aria-label="Close hotspot details"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {selectedHotspot.description}
                </p>
                
                {selectedHotspot.link && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => window.open(selectedHotspot.link, '_blank')}
                    className="w-full bg-gradient-to-r from-peach-500 to-peach-600 text-white py-3 rounded-xl font-medium hover:from-peach-600 hover:to-peach-700 transition-all duration-200"
                  >
                    {selectedHotspot.type === 'guide' ? 'Contact Guide' :
                     selectedHotspot.type === 'ticket' ? 'Book Tickets' :
                     'Learn More'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}