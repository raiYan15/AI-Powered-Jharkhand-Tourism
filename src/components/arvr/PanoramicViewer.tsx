import React, { useRef, useEffect, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';
import { OrbitControls, useTexture, Html, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RotateCcw, ZoomIn, ZoomOut, Info, MapPin, Eye, FullscreenIcon } from 'lucide-react';

extend({ OrbitControls });

interface PanoramicViewerProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
  hotspots?: PanoramicHotspot[];
  onAnalytics?: (event: string, duration: number) => void;
  is360Mode?: boolean;
}

interface PanoramicHotspot {
  id: string;
  position: [number, number, number]; // 3D position for 360° sphere
  spherical?: [number, number, number]; // [radius, phi, theta] spherical coordinates
  title: string;
  description: string;
  link?: string;
  type: 'info' | 'guide' | 'ticket';
}

interface PanoramicSphereProps {
  imageUrl: string;
  hotspots: PanoramicHotspot[];
  onHotspotClick: (hotspot: PanoramicHotspot) => void;
  is360Mode: boolean;
}

// Convert spherical coordinates to 3D Cartesian coordinates
const sphericalToCartesian = (radius: number, phi: number, theta: number): [number, number, number] => {
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
};

// Hotspot component that appears in 3D space
function PanoramicHotspotMesh({ 
  hotspot, 
  onClick, 
  is360Mode 
}: { 
  hotspot: PanoramicHotspot; 
  onClick: (hotspot: PanoramicHotspot) => void;
  is360Mode: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  // Calculate position based on mode
  const position = is360Mode && hotspot.spherical 
    ? sphericalToCartesian(hotspot.spherical[0], hotspot.spherical[1], hotspot.spherical[2])
    : hotspot.position;

  // Animate hotspot
  useFrame((state) => {
    if (meshRef.current) {
      // Look at camera for billboard effect
      meshRef.current.lookAt(camera.position);
      
      // Pulsing animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      meshRef.current.scale.setScalar(scale * (hovered ? 1.3 : 1));
    }
  });

  const getHotspotColor = (type: string) => {
    switch (type) {
      case 'info': return '#3b82f6';
      case 'guide': return '#10b981';
      case 'ticket': return '#f59e0b';
      default: return '#6366f1';
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={() => onClick(hotspot)}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial 
          color={getHotspotColor(hotspot.type)} 
          transparent 
          opacity={hovered ? 0.9 : 0.7}
        />
      </mesh>
      
      {/* Hotspot Label */}
      {hovered && (
        <Html
          position={[0, 0.1, 0]}
          center
          style={{
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '8px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            maxWidth: '200px'
          }}
        >
          <div className="text-center">
            <div className="font-bold">{hotspot.title}</div>
            <div className="text-xs opacity-80">{hotspot.description.slice(0, 50)}...</div>
          </div>
        </Html>
      )}
      
      {/* Pulsing ring effect */}
      <mesh position={[0, 0, 0]}>
        <ringGeometry args={[0.06, 0.08, 32]} />
        <meshBasicMaterial 
          color={getHotspotColor(hotspot.type)} 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Main 360° sphere component
function PanoramicSphere({ imageUrl, hotspots, onHotspotClick, is360Mode }: PanoramicSphereProps) {
  const texture = useTexture(imageUrl);
  const sphereRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1; // Flip horizontally for inside-out viewing
    }
  }, [texture]);

  return (
    <group>
      {/* 360° Panoramic Sphere */}
      <mesh ref={sphereRef} scale={is360Mode ? [-1, 1, 1] : [1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial 
          map={texture} 
          side={is360Mode ? THREE.BackSide : THREE.FrontSide}
        />
      </mesh>

      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <PanoramicHotspotMesh
          key={hotspot.id}
          hotspot={hotspot}
          onClick={onHotspotClick}
          is360Mode={is360Mode}
        />
      ))}

      {/* Ambient light for better visibility */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.3} />
    </group>
  );
}

// Device orientation controls for mobile
function DeviceOrientationControls() {
  const { camera, gl } = useThree();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      if (!isEnabled) return;

      const alpha = event.alpha ? THREE.MathUtils.degToRad(event.alpha) : 0;
      const beta = event.beta ? THREE.MathUtils.degToRad(event.beta) : 0;
      const gamma = event.gamma ? THREE.MathUtils.degToRad(event.gamma) : 0;

      const euler = new THREE.Euler(beta, alpha, -gamma, 'YXZ');
      camera.quaternion.setFromEuler(euler);
    };

    // Request permission for iOS devices
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setIsEnabled(true);
            window.addEventListener('deviceorientation', handleDeviceOrientation);
          }
        } catch (error) {
          console.log('Device orientation permission denied');
        }
      } else if ('DeviceOrientationEvent' in window) {
        setIsEnabled(true);
        window.addEventListener('deviceorientation', handleDeviceOrientation);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [camera, isEnabled]);

  return null;
}

// Loading component
function PanoramicLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mb-4"></div>
        <div className="text-lg font-medium">Loading 360° Experience...</div>
        <div className="text-sm opacity-80">Please wait while we prepare your immersive view</div>
      </div>
    </Html>
  );
}

export default function PanoramicViewer({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  hotspots = [],
  onAnalytics,
  is360Mode = true
}: PanoramicViewerProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<PanoramicHotspot | null>(null);
  const [startTime] = useState(Date.now());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 0.1]);
  const controlsRef = useRef<any>();

  // Generate default hotspots if none provided
  const defaultHotspots: PanoramicHotspot[] = [
    {
      id: 'info-1',
      position: [100, 50, 0],
      spherical: [400, Math.PI / 3, Math.PI / 4],
      title: 'Historical Information',
      description: `Learn about the rich history and cultural significance of ${title}`,
      type: 'info',
      link: '#history'
    },
    {
      id: 'guide-1',
      position: [-100, 30, 50],
      spherical: [400, Math.PI / 2, -Math.PI / 3],
      title: 'Local Guide',
      description: `Connect with expert local guides for ${title}`,
      type: 'guide',
      link: '/booking?service=guide'
    },
    {
      id: 'ticket-1',
      position: [50, -50, 100],
      spherical: [400, 2 * Math.PI / 3, Math.PI / 2],
      title: 'Book Experience',
      description: `Reserve your visit and get tickets for ${title}`,
      type: 'ticket',
      link: '/booking?service=tickets'
    }
  ];

  const effectiveHotspots = hotspots.length > 0 ? hotspots : defaultHotspots;

  // Analytics tracking
  useEffect(() => {
    if (isOpen && onAnalytics) {
      onAnalytics('panoramic_session_start', 0);
      return () => {
        const duration = Date.now() - startTime;
        onAnalytics('panoramic_session_end', duration);
      };
    }
  }, [isOpen, onAnalytics, startTime]);

  const handleClose = useCallback(() => {
    if (onAnalytics) {
      const duration = Date.now() - startTime;
      onAnalytics('panoramic_session_close', duration);
    }
    setSelectedHotspot(null);
    onClose();
  }, [onClose, onAnalytics, startTime]);

  const handleHotspotClick = useCallback((hotspot: PanoramicHotspot) => {
    setSelectedHotspot(hotspot);
    if (onAnalytics) {
      onAnalytics('panoramic_hotspot_click', 0);
    }
  }, [onAnalytics]);

  const handleResetView = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    setCameraPosition([0, 0, 0.1]);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* 360° Canvas */}
        <Canvas
          camera={{ 
            position: cameraPosition,
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={<PanoramicLoader />}>
            <PanoramicSphere
              imageUrl={imageUrl}
              hotspots={effectiveHotspots}
              onHotspotClick={handleHotspotClick}
              is360Mode={is360Mode}
            />
            
            <OrbitControls
              ref={controlsRef}
              enableDamping
              dampingFactor={0.05}
              enableZoom={true}
              enablePan={false}
              maxDistance={500}
              minDistance={0.1}
              rotateSpeed={0.5}
              zoomSpeed={0.8}
            />
            
            <DeviceOrientationControls />
          </Suspense>
        </Canvas>

        {/* UI Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-auto z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg max-w-md"
          >
            <h3 className="font-bold">{title}</h3>
            <p className="text-sm opacity-80">360° Panoramic View</p>
          </motion.div>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleResetView}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              title="Reset View"
            >
              <RotateCcw size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleFullscreen}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              title="Toggle Fullscreen"
            >
              <FullscreenIcon size={20} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
              title="Close"
            >
              <X size={20} />
            </motion.button>
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg text-center pointer-events-none"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-medium">360° Experience</span>
          </div>
          <p className="text-sm opacity-80">
            {is360Mode 
              ? "Drag to look around • Scroll to zoom • Click blue dots for information"
              : "Use mouse to navigate • Scroll to zoom • Click hotspots for details"
            }
          </p>
        </motion.div>

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