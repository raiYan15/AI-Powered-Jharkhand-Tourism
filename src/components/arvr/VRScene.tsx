import React, { useRef, useState, useCallback, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, Volume2, VolumeX, RotateCcw, MapPin, Info, Move3D } from 'lucide-react';

interface VRSceneProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
  hotspots?: Hotspot[];
  onAnalytics?: (event: string, duration: number) => void;
}

interface Hotspot {
  id: string;
  position: [number, number]; // 2D position on the image (percentage)
  title: string;
  description: string;
  link?: string;
  type: 'info' | 'guide' | 'ticket';
}

export default function VRScene({ 
  isOpen, 
  onClose, 
  imageUrl, 
  title, 
  description, 
  hotspots = [],
  onAnalytics 
}: VRSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [startTime] = useState(Date.now());
  const [isGyroEnabled, setIsGyroEnabled] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Analytics tracking
  useEffect(() => {
    if (isOpen && onAnalytics) {
      return () => {
        const duration = Date.now() - startTime;
        onAnalytics('vr_session_end', duration);
      };
    }
  }, [isOpen, onAnalytics, startTime]);

  // Request device motion permission for mobile gyroscope
  useEffect(() => {
    if (isOpen && 'DeviceOrientationEvent' in window) {
      const requestPermission = async () => {
        try {
          // @ts-ignore
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // @ts-ignore
            const permission = await DeviceOrientationEvent.requestPermission();
            setIsGyroEnabled(permission === 'granted');
          } else {
            setIsGyroEnabled(true);
          }
        } catch (error) {
          console.log('Gyroscope permission denied');
        }
      };
      requestPermission();
    }
  }, [isOpen]);

  // Handle device orientation for mobile
  useEffect(() => {
    if (!isGyroEnabled || !isOpen) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        setRotation({
          x: Math.max(-45, Math.min(45, event.beta - 90)),
          y: Math.max(-90, Math.min(90, event.gamma))
        });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [isGyroEnabled, isOpen]);

  // Mouse/touch drag controls
  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x + deltaY * 0.1)),
      y: Math.max(-180, Math.min(180, prev.y + deltaX * 0.1))
    }));

    setDragStart({ x: clientX, y: clientY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Zoom controls
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.max(0.5, Math.min(3, prev + delta)));
  }, []);

  const handleHotspotClick = useCallback((hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    if (onAnalytics) {
      onAnalytics('hotspot_click', 0);
    }
  }, [onAnalytics]);

  const handleClose = useCallback(() => {
    if (onAnalytics) {
      const duration = Date.now() - startTime;
      onAnalytics('vr_session_close', duration);
    }
    onClose();
  }, [onClose, onAnalytics, startTime]);

  const resetView = useCallback(() => {
    setRotation({ x: 0, y: 0 });
    setScale(1);
  }, []);

  const getHotspotColor = (type: string) => {
    switch (type) {
      case 'info': return 'bg-blue-500';
      case 'guide': return 'bg-green-500';
      case 'ticket': return 'bg-yellow-500';
      default: return 'bg-red-500';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        {/* VR Image Container */}
        <div
          ref={containerRef}
          className="relative w-full h-full flex items-center justify-center cursor-move"
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onWheel={handleWheel}
        >
          {/* 360° Image Display */}
          <div
            className="relative transition-transform duration-75 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${scale})`,
              transformStyle: 'preserve-3d' as const
            }}
          >
            <img
              ref={imageRef}
              src={imageUrl}
              alt={title}
              className="max-w-none h-screen object-cover w-auto"
              style={{
                minWidth: '200vw' // Wide panoramic effect for VR
              }}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />

            {/* Hotspot Overlays */}
            {!isLoading && hotspots.map(hotspot => (
              <motion.div
                key={hotspot.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute cursor-pointer z-10"
                style={{
                  left: `${hotspot.position[0]}%`,
                  top: `${hotspot.position[1]}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => handleHotspotClick(hotspot)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse ${getHotspotColor(hotspot.type)}`}>
                  {hotspot.type === 'info' ? <Info size={16} /> :
                   hotspot.type === 'guide' ? <MapPin size={16} /> :
                   <Eye size={16} />}
                </div>
                
                {/* Hotspot Ripple Effect */}
                <div className={`absolute inset-0 rounded-full animate-ping ${getHotspotColor(hotspot.type)} opacity-20`} />
              </motion.div>
            ))}
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-white text-center">
                <div className="w-12 h-12 border-4 border-peach-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p>Loading VR Experience...</p>
              </div>
            </div>
          )}
        </div>

        {/* UI Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto z-20"
          >
            <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg max-w-md">
              <h3 className="font-bold text-lg">{title}</h3>
              <p className="text-sm opacity-80">{description}</p>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMuted(!isMuted)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
                title="Close VR Experience"
              >
                <X size={20} />
              </motion.button>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-24 left-4 bg-black/50 backdrop-blur-sm text-white px-4 py-3 rounded-lg max-w-sm pointer-events-auto"
          >
            <div className="flex items-center gap-2 mb-2">
              <Move3D size={16} />
              <span className="text-sm font-medium">VR Experience</span>
            </div>
            <p className="text-xs opacity-80">
              {isGyroEnabled 
                ? "Move your device to look around, or drag to explore"
                : "Drag to look around, scroll to zoom"
              }
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-4 left-4 right-4 flex justify-center pointer-events-auto"
          >
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetView}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-200"
              >
                <RotateCcw size={20} />
                <span>Reset View</span>
              </motion.button>

              <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full flex items-center gap-2">
                <span className="text-sm">Zoom: {Math.round(scale * 100)}%</span>
              </div>
            </div>
          </motion.div>
        </div>

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
                    title="Close"
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