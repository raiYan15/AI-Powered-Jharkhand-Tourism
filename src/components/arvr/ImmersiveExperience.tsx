import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, Smartphone, Camera, Timer, TrendingUp, Globe } from 'lucide-react';
import VRScene from './VRScene';
import ARViewer from './ARViewer';
import { getEnhancedPlaceData, generateContextualHotspots } from '../../data/arvrData';

interface ImmersiveExperienceProps {
  imageUrl: string;
  title: string;
  description: string;
  className?: string;
  mode?: 'ar' | '360' | 'both' | 'vr';
  initialMode?: 'ar' | '360' | 'vr';
}

interface AnalyticsData {
  totalVRSessions: number;
  totalARSessions: number;
  total360Sessions: number;
  averageSessionTime: number;
  hotspotClicks: number;
}

// Sample hotspots data for each location
const getHotspotsForLocation = (title: string) => {
  const enhancedData = getEnhancedPlaceData(title);
  if (enhancedData) {
    return generateContextualHotspots(enhancedData);
  }

  // Fallback to basic hotspots if enhanced data not found
  return [
    {
      id: 'info-1',
      position: [25, 30] as [number, number],
      title: 'Historical Information',
      description: `Learn about the rich history and cultural significance of ${title}. Discover fascinating stories and legends.`,
      type: 'info' as const,
      link: 'https://jharkhand.gov.in/tourism'
    },
    {
      id: 'guide-1',
      position: [75, 45] as [number, number],
      title: 'Local Guide',
      description: `Connect with experienced local guides who can enhance your visit to ${title} with insider knowledge.`,
      type: 'guide' as const,
      link: '/booking?service=guide'
    },
    {
      id: 'ticket-1',
      position: [50, 70] as [number, number],
      title: 'Book Entry Tickets',
      description: `Reserve your entry tickets for ${title} in advance to avoid queues and ensure availability.`,
      type: 'ticket' as const,
      link: '/booking?service=tickets'
    }
  ];
};

export default function ImmersiveExperience({ 
  imageUrl, 
  title, 
  description, 
  className = "",
  mode = 'both',
  initialMode = 'ar'
}: ImmersiveExperienceProps) {
  const [vrOpen, setVrOpen] = useState(false);
  const [arOpen, setArOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVRSessions: 0,
    totalARSessions: 0,
    total360Sessions: 0,
    averageSessionTime: 0,
    hotspotClicks: 0
  });
  const [sessionTimes, setSessionTimes] = useState<number[]>([]);

  const handleAnalytics = useCallback((event: string, duration: number) => {
    setAnalytics(prev => {
      const newAnalytics = { ...prev };
      
      switch (event) {
        case 'vr_session_end':
        case 'vr_session_close':
          newAnalytics.totalVRSessions += 1;
          setSessionTimes(times => {
            const newTimes = [...times, duration];
            newAnalytics.averageSessionTime = newTimes.reduce((a, b) => a + b, 0) / newTimes.length;
            return newTimes;
          });
          break;
        case 'ar_session_end':
        case 'ar_session_close':
          newAnalytics.totalARSessions += 1;
          setSessionTimes(times => {
            const newTimes = [...times, duration];
            newAnalytics.averageSessionTime = newTimes.reduce((a, b) => a + b, 0) / newTimes.length;
            return newTimes;
          });
          break;
        case 'panoramic_session_end':
        case 'panoramic_session_close':
          newAnalytics.total360Sessions += 1;
          setSessionTimes(times => {
            const newTimes = [...times, duration];
            newAnalytics.averageSessionTime = newTimes.reduce((a, b) => a + b, 0) / newTimes.length;
            return newTimes;
          });
          break;
        case 'hotspot_click':
        case 'vr_hotspot_click':
        case 'ar_hotspot_click':
        case 'panoramic_hotspot_click':
          newAnalytics.hotspotClicks += 1;
          break;
      }
      
      return newAnalytics;
    });
  }, []);

  const hotspots = getHotspotsForLocation(title);

  return (
    <div className={`relative ${className}`}>
      {/* AR/VR Experience Buttons */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 text-center max-w-sm">
          <h3 className="text-white font-bold text-xl mb-3">Immersive Experience</h3>
          <p className="text-white/80 text-sm mb-6">
            Explore {title} in Virtual Reality or Augmented Reality
          </p>
          
          <div className="flex gap-3">
            {/* 360° VR Button */}
            {(mode === '360' || mode === 'both' || mode === 'vr') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setArOpen(true)}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Globe size={20} />
                <span>360° View</span>
              </motion.button>
            )}
            
            {/* Traditional VR Button */}
            {(mode === 'vr' || mode === 'both') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setVrOpen(true)}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Eye size={20} />
                <span>VR Scene</span>
              </motion.button>
            )}
            
            {/* AR Button */}
            {(mode === 'ar' || mode === 'both') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setArOpen(true)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Smartphone size={20} />
                <span>AR View</span>
              </motion.button>
            )}
          </div>

          {/* Experience Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60">
            <Camera size={14} />
            <span>Interactive • Immersive • Educational</span>
          </div>
        </div>
      </div>

      {/* Floating AR/VR Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 right-4 z-20"
      >
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <Eye size={12} />
          <span>AR/VR</span>
        </div>
      </motion.div>

      {/* Analytics Badge (only show if there's data) */}
      {(analytics.totalVRSessions > 0 || analytics.totalARSessions > 0 || analytics.total360Sessions > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 z-20"
        >
          <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={12} />
              <span className="font-medium">Experience Stats</span>
            </div>
            <div className="space-y-1">
              {analytics.total360Sessions > 0 && (
                <p>360° Sessions: {analytics.total360Sessions}</p>
              )}
              {analytics.totalVRSessions > 0 && (
                <p>VR Sessions: {analytics.totalVRSessions}</p>
              )}
              {analytics.totalARSessions > 0 && (
                <p>AR Sessions: {analytics.totalARSessions}</p>
              )}
              {analytics.averageSessionTime > 0 && (
                <div className="flex items-center gap-1">
                  <Timer size={10} />
                  <span>Avg: {Math.round(analytics.averageSessionTime / 1000)}s</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* VR Experience */}
      <VRScene
        isOpen={vrOpen}
        onClose={() => setVrOpen(false)}
        imageUrl={imageUrl}
        title={title}
        description={description}
        hotspots={hotspots}
        onAnalytics={handleAnalytics}
      />

      {/* AR Experience with 360° Support */}
      <ARViewer
        isOpen={arOpen}
        onClose={() => setArOpen(false)}
        imageUrl={imageUrl}
        title={title}
        description={description}
        hotspots={hotspots}
        onAnalytics={handleAnalytics}
        mode={mode === 'ar' ? 'ar' : mode === '360' ? '360' : 'both'}
        initialMode={initialMode === '360' ? '360' : 'ar'}
      />
    </div>
  );
}