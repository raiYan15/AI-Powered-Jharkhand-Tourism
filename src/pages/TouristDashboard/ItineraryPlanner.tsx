import React, { useState } from 'react';
import type { Itinerary, ItineraryStop } from '../../types';
import { Card } from '../../components/Card';
import { ItineraryMap } from '../../components/ItineraryMap';
import { generateItinerary } from '../../services/geminiService';
import { motion } from 'framer-motion';
import { 
  Clock, 
  MapPin, 
  Car, 
  IndianRupee, 
  Camera, 
  Utensils, 
  Train,
  Phone,
  AlertTriangle,
  Sun,
  Cloud,
  Navigation,
  Calendar,
  Sparkles,
  Bot
} from 'lucide-react';

interface DayPlanStop {
  id: string;
  time: string;
  place: string;
  activity: string;
  description: string;
  distance: string;
  travelTime: string;
  transport: string;
  transportCost: string;
  activityCost: string;
  coordinates: { lat: number; lng: number };
  category: 'transport' | 'food' | 'attraction' | 'cultural' | 'nature';
  photoTips?: string;
  localTips?: string;
}

const ranchiBudgetItinerary: DayPlanStop[] = [
  {
    id: 'arrival',
    time: '6:00 AM',
    place: 'Ranchi Railway Station',
    activity: 'Arrival & Freshen Up',
    description: 'Arrive at Ranchi Railway Station. Use station facilities, grab a quick tea.',
    distance: '0 km',
    travelTime: '30 mins',
    transport: 'Walking',
    transportCost: '₹0',
    activityCost: '₹20',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    category: 'transport',
    localTips: 'Station has good facilities. Keep luggage at cloak room if needed.'
  },
  {
    id: 'breakfast',
    time: '7:00 AM',
    place: 'Annapurna Restaurant',
    activity: 'Traditional Jharkhand Breakfast',
    description: 'Famous for Pitha, Litti Chokha, and hot tea. Authentic local taste.',
    distance: '2.5 km',
    travelTime: '15 mins',
    transport: 'Auto Rickshaw',
    transportCost: '₹40',
    activityCost: '₹120',
    coordinates: { lat: 23.3569, lng: 85.3347 },
    category: 'food',
    photoTips: 'Capture the traditional clay oven and local breakfast setup',
    localTips: 'Try Pitha with jaggery - local specialty!'
  },
  {
    id: 'temple',
    time: '8:30 AM',
    place: 'Jagannath Temple',
    activity: 'Morning Prayer & Cultural Experience',
    description: 'Replica of Puri Jagannath Temple. Beautiful architecture and peaceful morning atmosphere.',
    distance: '3.2 km',
    travelTime: '20 mins',
    transport: 'Shared Auto',
    transportCost: '₹25',
    activityCost: '₹0',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    category: 'cultural',
    photoTips: 'Early morning light perfect for temple architecture photos',
    localTips: 'Remove shoes before entering. Photography allowed in outer areas.'
  },
  {
    id: 'lake',
    time: '10:00 AM',
    place: 'Kanke Dam',
    activity: 'Nature Walk & Boating',
    description: 'Scenic lake surrounded by hills. Boating available. Great for morning relaxation.',
    distance: '8.5 km',
    travelTime: '25 mins',
    transport: 'Bus/Shared Taxi',
    transportCost: '₹30',
    activityCost: '₹100',
    coordinates: { lat: 23.4372, lng: 85.3206 },
    category: 'nature',
    photoTips: 'Capture reflection of hills in water. Best shots from the dam top.',
    localTips: 'Boating cost ₹50 for 30 mins. Life jackets provided.'
  },
  {
    id: 'lunch',
    time: '12:30 PM',
    place: 'Kaveri Restaurant',
    activity: 'Traditional Thali Lunch',
    description: 'Famous for Jharkhand Thali with rice, dal, sabzi, and local preparations.',
    distance: '6.8 km',
    travelTime: '20 mins',
    transport: 'Auto Rickshaw',
    transportCost: '₹60',
    activityCost: '₹180',
    coordinates: { lat: 23.3644, lng: 85.3350 },
    category: 'food',
    photoTips: 'Capture the colorful thali spread',
    localTips: 'Ask for extra roti - unlimited in thali. Try their special dal.'
  },
  {
    id: 'museum',
    time: '2:00 PM',
    place: 'Tribal Research Institute Museum',
    activity: 'Cultural Heritage Exploration',
    description: 'Rich collection of tribal artifacts, art, and culture of Jharkhand tribes.',
    distance: '4.2 km',
    travelTime: '15 mins',
    transport: 'City Bus',
    transportCost: '₹15',
    activityCost: '₹20',
    coordinates: { lat: 23.3498, lng: 85.3263 },
    category: 'cultural',
    photoTips: 'Indoor photography of artifacts (ask permission first)',
    localTips: 'Guided tours available for ₹50 extra. Worth it for cultural insights.'
  },
  {
    id: 'rock-garden',
    time: '3:30 PM',
    place: 'Rock Garden',
    activity: 'Sculpture Park & Photo Session',
    description: 'Beautiful rock sculptures, waterfalls, and artistic installations.',
    distance: '5.5 km',
    travelTime: '18 mins',
    transport: 'Auto Rickshaw',
    transportCost: '₹50',
    activityCost: '₹30',
    coordinates: { lat: 23.3723, lng: 85.3392 },
    category: 'attraction',
    photoTips: 'Golden hour photography. Rock formations create great shadows.',
    localTips: 'Entry till 5:30 PM. Best for afternoon visit.'
  },
  {
    id: 'snacks',
    time: '5:00 PM',
    place: 'Firayalal Chowk',
    activity: 'Evening Snacks & Local Market',
    description: 'Street food hub. Famous for Golgappa, Aloo Tikki, and local chaat.',
    distance: '3.8 km',
    travelTime: '15 mins',
    transport: 'Shared Auto',
    transportCost: '₹25',
    activityCost: '₹80',
    coordinates: { lat: 23.3551, lng: 85.3263 },
    category: 'food',
    photoTips: 'Capture the bustling street food scene',
    localTips: 'Try Dahi Puri and Jhaal Muri. Hygiene is good here.'
  },
  {
    id: 'pahari-mandir',
    time: '6:00 PM',
    place: 'Pahari Mandir',
    activity: 'Sunset Views & Temple Visit',
    description: 'Hilltop temple with panoramic views of Ranchi city. Best sunset spot.',
    distance: '7.2 km',
    travelTime: '25 mins',
    transport: 'Auto + Walking',
    transportCost: '₹70',
    activityCost: '₹0',
    coordinates: { lat: 23.4017, lng: 85.2934 },
    category: 'cultural',
    photoTips: 'Sunset photography from temple top. City lights as it gets dark.',
    localTips: 'Climb of 15 mins to reach top. Carry water. Temple closes at 8 PM.'
  },
  {
    id: 'dinner',
    time: '7:30 PM',
    place: 'Hotel Yuvraj Palace',
    activity: 'Farewell Dinner',
    description: 'Multi-cuisine restaurant. Try their special Mutton Curry and rice preparations.',
    distance: '8.5 km',
    travelTime: '20 mins',
    transport: 'Taxi/Auto',
    transportCost: '₹80',
    activityCost: '₹250',
    coordinates: { lat: 23.3569, lng: 85.3347 },
    category: 'food',
    photoTips: 'Traditional food presentation',
    localTips: 'Book table in advance for evening. Try their special lassi.'
  },
  {
    id: 'departure',
    time: '9:00 PM',
    place: 'Return to Railway Station',
    activity: 'Departure Preparation',
    description: 'Return to railway station for onward journey or night halt.',
    distance: '2.5 km',
    travelTime: '15 mins',
    transport: 'Pre-paid Taxi',
    transportCost: '₹60',
    activityCost: '₹0',
    coordinates: { lat: 23.3441, lng: 85.3096 },
    category: 'transport',
    localTips: 'Book return ticket in advance. Station has waiting rooms.'
  }
];

// Detailed day plans for different destinations
const detailedDayPlans: { [key: string]: DayPlanStop[] } = {
  'ranchi-city-waterfalls': [
    {
      id: 'ranchi-start',
      time: '7:00 AM',
      place: 'Hotel/Station',
      activity: 'Morning Tea & Departure',
      description: 'Start your day with refreshing tea and light breakfast.',
      distance: '0 km',
      travelTime: '30 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹50',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'food'
    },
    {
      id: 'rock-garden',
      time: '8:00 AM',
      place: 'Rock Garden',
      activity: 'Morning Rock Sculptures & Photography',
      description: 'Beautiful rock sculptures, waterfalls, and artistic installations perfect for morning photography.',
      distance: '12 km',
      travelTime: '25 mins',
      transport: 'Taxi/Auto',
      transportCost: '₹150',
      activityCost: '₹30',
      coordinates: { lat: 23.3723, lng: 85.3392 },
      category: 'attraction',
      photoTips: 'Morning light perfect for rock formations. Capture waterfall reflections.',
      localTips: 'Entry opens at 8 AM. Best time for photography before crowds arrive.'
    },
    {
      id: 'breakfast-rock',
      time: '9:30 AM',
      place: 'Garden Café (Rock Garden)',
      activity: 'Traditional Breakfast',
      description: 'Local breakfast with Poha, Jalebi, and masala chai.',
      distance: '0.2 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹120',
      coordinates: { lat: 23.3725, lng: 85.3390 },
      category: 'food',
      localTips: 'Try their special masala chai and fresh jalebis.'
    },
    {
      id: 'kanke-dam',
      time: '10:30 AM',
      place: 'Kanke Dam',
      activity: 'Boating & Nature Walk',
      description: 'Scenic lake surrounded by hills. Boating and peaceful nature walks.',
      distance: '15 km',
      travelTime: '35 mins',
      transport: 'Taxi',
      transportCost: '₹200',
      activityCost: '₹150',
      coordinates: { lat: 23.4372, lng: 85.3206 },
      category: 'nature',
      photoTips: 'Capture hill reflections in water. Boat ride gives aerial perspective.',
      localTips: 'Boating cost ₹100 for 45 mins. Life jackets provided. Best views from dam top.'
    },
    {
      id: 'lunch-kanke',
      time: '12:30 PM',
      place: 'Kanke Resort Restaurant',
      activity: 'Lunch with Lake View',
      description: 'Multi-cuisine restaurant with beautiful lake views and local Jharkhand thali.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹300',
      coordinates: { lat: 23.4375, lng: 85.3210 },
      category: 'food',
      localTips: 'Book lakeside table. Try their fish curry and local vegetables.'
    },
    {
      id: 'hundru-falls',
      time: '2:00 PM',
      place: 'Hundru Falls',
      activity: 'Waterfall Experience & Swimming',
      description: 'One of Jharkhand\'s highest waterfalls. Swimming possible in season.',
      distance: '45 km',
      travelTime: '1 hr 15 mins',
      transport: 'Hired Car',
      transportCost: '₹600',
      activityCost: '₹50',
      coordinates: { lat: 23.2167, lng: 85.5833 },
      category: 'nature',
      photoTips: 'Afternoon light creates rainbow in waterfall mist. Wide-angle shots work best.',
      localTips: 'Wear non-slip shoes. Swimming allowed in designated areas. Carry extra clothes.'
    },
    {
      id: 'snacks-hundru',
      time: '4:30 PM',
      place: 'Local Dhaba (Hundru)',
      activity: 'Evening Snacks',
      description: 'Local tea stall with pakoras, samosas and regional snacks.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Auto',
      transportCost: '₹40',
      activityCost: '₹80',
      coordinates: { lat: 23.2170, lng: 85.5840 },
      category: 'food',
      localTips: 'Try their special tea and onion pakoras. Local crowd gathering spot.'
    },
    {
      id: 'return-ranchi',
      time: '5:30 PM',
      place: 'Return to Ranchi',
      activity: 'Journey Back to City',
      description: 'Return journey to Ranchi city center for evening activities.',
      distance: '45 km',
      travelTime: '1 hr 15 mins',
      transport: 'Hired Car',
      transportCost: '₹600',
      activityCost: '₹0',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'transport'
    },
    {
      id: 'dinner-ranchi',
      time: '7:30 PM',
      place: 'Kaveri Restaurant',
      activity: 'Traditional Dinner',
      description: 'Famous restaurant serving authentic Jharkhand cuisine and North Indian dishes.',
      distance: '5 km',
      travelTime: '20 mins',
      transport: 'Auto',
      transportCost: '₹60',
      activityCost: '₹400',
      coordinates: { lat: 23.3644, lng: 85.3350 },
      category: 'food',
      photoTips: 'Capture traditional thali presentation.',
      localTips: 'Book table in advance. Try their mutton curry and local rice preparations.'
    }
  ],
  'netarhat-hills': [
    {
      id: 'early-start',
      time: '5:30 AM',
      place: 'Ranchi Departure',
      activity: 'Early Morning Departure',
      description: 'Early start for Netarhat to catch the famous sunrise.',
      distance: '0 km',
      travelTime: '30 mins',
      transport: 'Taxi Pick-up',
      transportCost: '₹100',
      activityCost: '₹50',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'transport'
    },
    {
      id: 'netarhat-sunrise',
      time: '8:00 AM',
      place: 'Netarhat Sunset Point',
      activity: 'Sunrise Viewing',
      description: 'Watch spectacular sunrise over the hills. Famous viewpoint of Jharkhand.',
      distance: '155 km',
      travelTime: '2.5 hrs',
      transport: 'Hired Car',
      transportCost: '₹2000',
      activityCost: '₹0',
      coordinates: { lat: 23.4793, lng: 84.27 },
      category: 'nature',
      photoTips: 'Golden hour photography. Use tripod for long exposure shots.',
      localTips: 'Reach 15 mins before sunrise. Carry warm clothes as it gets cold.'
    },
    {
      id: 'breakfast-netarhat',
      time: '9:00 AM',
      place: 'Netarhat Forest Rest House',
      activity: 'Hill Station Breakfast',
      description: 'Traditional breakfast in the hills with hot parathas and tea.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Walking/Auto',
      transportCost: '₹30',
      activityCost: '₹150',
      coordinates: { lat: 23.4800, lng: 84.2720 },
      category: 'food',
      localTips: 'Try hot parathas with local honey. Breakfast with mountain view.'
    },
    {
      id: 'forest-walk',
      time: '10:30 AM',
      place: 'Netarhat Forest',
      activity: 'Nature Walk & Bird Watching',
      description: 'Explore dense forests, spot local birds and wildlife.',
      distance: '5 km',
      travelTime: '3 hrs',
      transport: 'Trekking',
      transportCost: '₹0',
      activityCost: '₹100',
      coordinates: { lat: 23.4850, lng: 84.2750 },
      category: 'nature',
      photoTips: 'Wildlife photography. Carry telephoto lens for birds.',
      localTips: 'Hire local guide for ₹200. Wear comfortable trekking shoes.'
    },
    {
      id: 'lunch-netarhat',
      time: '1:30 PM',
      place: 'Hotel Pine Valley',
      activity: 'Hill Station Lunch',
      description: 'Local cuisine with mountain specialties and valley views.',
      distance: '3 km',
      travelTime: '15 mins',
      transport: 'Auto',
      transportCost: '₹50',
      activityCost: '₹350',
      coordinates: { lat: 23.4780, lng: 84.2700 },
      category: 'food',
      localTips: 'Try their special chicken curry and local vegetables.'
    },
    {
      id: 'magnolia-point',
      time: '3:00 PM',
      place: 'Magnolia Point',
      activity: 'Scenic Viewpoint',
      description: 'Another beautiful viewpoint offering panoramic valley views.',
      distance: '8 km',
      travelTime: '25 mins',
      transport: 'Hired Car',
      transportCost: '₹200',
      activityCost: '₹0',
      coordinates: { lat: 23.4900, lng: 84.2600 },
      category: 'nature',
      photoTips: 'Panoramic shots of valley. Best light in late afternoon.',
      localTips: 'Less crowded than main sunset point. Perfect for peaceful moments.'
    },
    {
      id: 'evening-snacks',
      time: '5:00 PM',
      place: 'Local Tea Stall',
      activity: 'Mountain Tea & Snacks',
      description: 'Hot tea and local snacks while enjoying mountain breeze.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹100',
      coordinates: { lat: 23.4795, lng: 84.2710 },
      category: 'food',
      localTips: 'Local tea is famous. Try with ginger for extra warmth.'
    },
    {
      id: 'sunset-point',
      time: '6:00 PM',
      place: 'Netarhat Sunset Point',
      activity: 'Sunset Photography',
      description: 'Famous sunset point with breathtaking views over the valley.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹0',
      coordinates: { lat: 23.4793, lng: 84.27 },
      category: 'nature',
      photoTips: 'Silhouette photography. Golden hour magic. Use graduated filters.',
      localTips: 'Gets crowded during sunset. Arrive early for best spots.'
    },
    {
      id: 'dinner-netarhat',
      time: '7:30 PM',
      place: 'Forest Lodge Restaurant',
      activity: 'Mountain Dinner',
      description: 'Cozy dinner in the hills with local specialties and warm ambiance.',
      distance: '3 km',
      travelTime: '15 mins',
      transport: 'Auto',
      transportCost: '₹50',
      activityCost: '₹450',
      coordinates: { lat: 23.4785, lng: 84.2715 },
      category: 'food',
      localTips: 'Try their special dal and mountain vegetables. Fireplace available in winter.'
    }
  ],
  'patratu-valley': [
    {
      id: 'morning-departure',
      time: '7:00 AM',
      place: 'Ranchi Start',
      activity: 'Valley Drive Departure',
      description: 'Start scenic drive to Patratu Valley with breakfast packed.',
      distance: '0 km',
      travelTime: '30 mins',
      transport: 'Hired Car',
      transportCost: '₹200',
      activityCost: '₹100',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'transport'
    },
    {
      id: 'patratu-dam',
      time: '8:30 AM',
      place: 'Patratu Dam',
      activity: 'Dam Views & Photography',
      description: 'One of India\'s first soil dams. Beautiful reservoir views.',
      distance: '40 km',
      travelTime: '1 hr 30 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹50',
      coordinates: { lat: 23.6776, lng: 85.2799 },
      category: 'nature',
      photoTips: 'Wide shots of reservoir. Morning mist creates dramatic effect.',
      localTips: 'Entry fee ₹20 per person. Boating available for ₹100.'
    },
    {
      id: 'breakfast-patratu',
      time: '10:00 AM',
      place: 'Valley View Restaurant',
      activity: 'Breakfast with Valley Views',
      description: 'Scenic restaurant overlooking the valley with local breakfast.',
      distance: '5 km',
      travelTime: '15 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹200',
      coordinates: { lat: 23.6780, lng: 85.2805 },
      category: 'food',
      localTips: 'Request valley-facing table. Try their aloo paratha with local curd.'
    },
    {
      id: 'valley-viewpoint',
      time: '11:30 AM',
      place: 'Patratu Valley Viewpoint',
      activity: 'Scenic Valley Photography',
      description: 'Breathtaking 360-degree views of the valley and surrounding hills.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹0',
      coordinates: { lat: 23.6800, lng: 85.2750 },
      category: 'nature',
      photoTips: 'Panoramic shots. Use polarizing filter for clear sky contrast.',
      localTips: 'Best photography spot. Can see multiple valleys from here.'
    },
    {
      id: 'local-village',
      time: '1:00 PM',
      place: 'Local Village',
      activity: 'Village Culture & Local Cuisine',
      description: 'Experience local tribal culture and authentic village cooking.',
      distance: '10 km',
      travelTime: '25 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹300',
      coordinates: { lat: 23.6750, lng: 85.2800 },
      category: 'cultural',
      photoTips: 'Cultural photography. Ask permission before photographing people.',
      localTips: 'Interact with locals. Try homemade rice wine if offered (optional).'
    },
    {
      id: 'scenic-drive',
      time: '3:00 PM',
      place: 'Valley Circuit Drive',
      activity: 'Scenic Mountain Drive',
      description: 'Beautiful winding roads through valleys with multiple photo stops.',
      distance: '25 km',
      travelTime: '1 hr 30 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹0',
      coordinates: { lat: 23.6700, lng: 85.2900 },
      category: 'nature',
      photoTips: 'Stop at curves for valley shots. Capture winding roads from high points.',
      localTips: 'Multiple small viewpoints. Take your time and enjoy the drive.'
    },
    {
      id: 'tea-garden',
      time: '4:30 PM',
      place: 'Hill Tea Garden',
      activity: 'Tea Tasting & Garden Walk',
      description: 'Small tea plantation with fresh tea tasting and garden walks.',
      distance: '5 km',
      travelTime: '15 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹150',
      coordinates: { lat: 23.6720, lng: 85.2850 },
      category: 'cultural',
      photoTips: 'Tea plantation rows create leading lines. Worker portraits with permission.',
      localTips: 'Fresh tea available. Learn about local tea cultivation.'
    },
    {
      id: 'farewell-dinner',
      time: '6:30 PM',
      place: 'Valley Resort',
      activity: 'Farewell Dinner',
      description: 'Special farewell dinner with valley views and local specialties.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Car',
      transportCost: '₹0',
      activityCost: '₹500',
      coordinates: { lat: 23.6690, lng: 85.2820 },
      category: 'food',
      photoTips: 'Dinner setup with valley backdrop. Sunset dining shots.',
      localTips: 'Book sunset table. Try their special valley trout and local vegetables.'
    },
    {
      id: 'return-journey',
      time: '8:00 PM',
      place: 'Return to Ranchi',
      activity: 'Departure Journey',
      description: 'Return journey to Ranchi with memories of beautiful valley experience.',
      distance: '40 km',
      travelTime: '1 hr 30 mins',
      transport: 'Car',
      transportCost: '₹400',
      activityCost: '₹0',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'transport',
      localTips: 'Night drive can be scenic. Safe driving recommended.'
    }
  ],
  'rest-leisure': [
    {
      id: 'morning-leisure',
      time: '8:00 AM',
      place: 'Hotel/Accommodation',
      activity: 'Leisurely Morning & Late Breakfast',
      description: 'Relax and enjoy a late breakfast at your accommodation or nearby café.',
      distance: '0 km',
      travelTime: '1 hr',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹200',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'food',
      localTips: 'Perfect day to sleep in and recharge.'
    },
    {
      id: 'local-market',
      time: '10:30 AM',
      place: 'Main Road Market',
      activity: 'Local Shopping & Handicrafts',
      description: 'Explore local markets for Jharkhand handicrafts, tribal art, and souvenirs.',
      distance: '3 km',
      travelTime: '20 mins',
      transport: 'Auto Rickshaw',
      transportCost: '₹60',
      activityCost: '₹500',
      coordinates: { lat: 23.3500, lng: 85.3250 },
      category: 'cultural',
      photoTips: 'Capture colorful handicrafts and local artisan work.',
      localTips: 'Bargain for better prices. Look for authentic tribal jewelry and bamboo crafts.'
    },
    {
      id: 'lunch-local',
      time: '1:00 PM',
      place: 'Panchhi Restaurant',
      activity: 'Traditional Jharkhand Cuisine',
      description: 'Try authentic tribal cuisine and regional specialties.',
      distance: '2 km',
      travelTime: '15 mins',
      transport: 'Auto',
      transportCost: '₹40',
      activityCost: '₹350',
      coordinates: { lat: 23.3520, lng: 85.3280 },
      category: 'food',
      localTips: 'Try their bamboo shoot curry and traditional rice beer (if available).'
    },
    {
      id: 'spa-wellness',
      time: '3:00 PM',
      place: 'Wellness Center',
      activity: 'Relaxation & Wellness',
      description: 'Enjoy traditional Ayurvedic massage or spa treatments.',
      distance: '4 km',
      travelTime: '20 mins',
      transport: 'Taxi',
      transportCost: '₹80',
      activityCost: '₹800',
      coordinates: { lat: 23.3600, lng: 85.3300 },
      category: 'cultural',
      localTips: 'Book treatments in advance. Try traditional herbal therapies.'
    },
    {
      id: 'evening-walk',
      time: '5:30 PM',
      place: 'Ranchi Lake',
      activity: 'Evening Stroll & Photography',
      description: 'Peaceful evening walk around the lake with local families.',
      distance: '6 km',
      travelTime: '25 mins',
      transport: 'Auto',
      transportCost: '₹70',
      activityCost: '₹0',
      coordinates: { lat: 23.3700, lng: 85.3200 },
      category: 'nature',
      photoTips: 'Golden hour photography by the lake. Local life moments.',
      localTips: 'Popular spot for evening exercise. Safe and family-friendly.'
    },
    {
      id: 'dinner-leisure',
      time: '7:30 PM',
      place: 'Hotel Radisson',
      activity: 'Fine Dining Experience',
      description: 'Upscale dining with multi-cuisine options and comfortable ambiance.',
      distance: '5 km',
      travelTime: '20 mins',
      transport: 'Taxi',
      transportCost: '₹100',
      activityCost: '₹800',
      coordinates: { lat: 23.3650, lng: 85.3320 },
      category: 'food',
      localTips: 'Reservations recommended. Try their continental and Indian fusion menu.'
    }
  ],
  'birsa-munda-heritage': [
    {
      id: 'early-heritage',
      time: '7:00 AM',
      place: 'Hotel Departure',
      activity: 'Heritage Trail Start',
      description: 'Begin the historical journey exploring Birsa Munda\'s legacy.',
      distance: '0 km',
      travelTime: '30 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹100',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'cultural'
    },
    {
      id: 'birsa-museum',
      time: '8:30 AM',
      place: 'Birsa Munda Museum',
      activity: 'Historical Museum & Freedom Fighter Legacy',
      description: 'Comprehensive museum showcasing Birsa Munda\'s life and tribal freedom movement.',
      distance: '8 km',
      travelTime: '25 mins',
      transport: 'Taxi',
      transportCost: '₹120',
      activityCost: '₹50',
      coordinates: { lat: 23.4000, lng: 85.3100 },
      category: 'cultural',
      photoTips: 'Historical artifacts and freedom struggle displays.',
      localTips: 'Guided tours available for ₹100. Rich tribal history insights.'
    },
    {
      id: 'breakfast-heritage',
      time: '10:30 AM',
      place: 'Heritage Café',
      activity: 'Traditional Tribal Breakfast',
      description: 'Authentic tribal cuisine breakfast with traditional cooking methods.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Auto',
      transportCost: '₹30',
      activityCost: '₹180',
      coordinates: { lat: 23.4020, lng: 85.3120 },
      category: 'food',
      localTips: 'Try handia (rice beer) and traditional millet preparations.'
    },
    {
      id: 'tribal-village',
      time: '12:00 PM',
      place: 'Khunti Tribal Village',
      activity: 'Tribal Village Experience',
      description: 'Visit authentic tribal village, interact with locals, see traditional lifestyle.',
      distance: '35 km',
      travelTime: '1 hr',
      transport: 'Hired Car',
      transportCost: '₹500',
      activityCost: '₹300',
      coordinates: { lat: 23.0717, lng: 85.2700 },
      category: 'cultural',
      photoTips: 'Village life, traditional huts, local customs (ask permission).',
      localTips: 'Respect local customs. Carry gifts for children. Learn about Sarna religion.'
    },
    {
      id: 'lunch-village',
      time: '2:00 PM',
      place: 'Village Community Kitchen',
      activity: 'Traditional Village Lunch',
      description: 'Community lunch with villagers, cooked on traditional chulha.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹250',
      coordinates: { lat: 23.0720, lng: 85.2705 },
      category: 'food',
      localTips: 'Eat with hands as locals do. Fresh organic village produce.'
    },
    {
      id: 'freedom-sites',
      time: '4:00 PM',
      place: 'Birsa Struggle Sites',
      activity: 'Historical Freedom Struggle Locations',
      description: 'Visit key locations of tribal rebellion and freedom struggle.',
      distance: '15 km',
      travelTime: '30 mins',
      transport: 'Car',
      transportCost: '₹200',
      activityCost: '₹100',
      coordinates: { lat: 23.0900, lng: 85.2800 },
      category: 'cultural',
      photoTips: 'Historical monuments and memorial sites.',
      localTips: 'Local guides can share oral history passed down generations.'
    },
    {
      id: 'cultural-evening',
      time: '6:30 PM',
      place: 'Cultural Center',
      activity: 'Tribal Dance & Music Performance',
      description: 'Traditional tribal performances, folk songs, and cultural programs.',
      distance: '25 km',
      travelTime: '45 mins',
      transport: 'Car',
      transportCost: '₹300',
      activityCost: '₹200',
      coordinates: { lat: 23.2000, lng: 85.3000 },
      category: 'cultural',
      photoTips: 'Colorful tribal costumes and traditional instruments.',
      localTips: 'Evening performances start at 7 PM. Photography allowed with permission.'
    },
    {
      id: 'heritage-dinner',
      time: '8:00 PM',
      place: 'Tribal Heritage Restaurant',
      activity: 'Cultural Dinner Experience',
      description: 'Special dinner with tribal cuisine and cultural storytelling.',
      distance: '10 km',
      travelTime: '25 mins',
      transport: 'Car',
      transportCost: '₹150',
      activityCost: '₹400',
      coordinates: { lat: 23.3200, lng: 85.3150 },
      category: 'food',
      localTips: 'Multi-course tribal feast. Stories about local legends and folklore.'
    }
  ],
  'adventure-sports': [
    {
      id: 'adventure-start',
      time: '6:00 AM',
      place: 'Adventure Base Camp',
      activity: 'Adventure Sports Preparation',
      description: 'Equipment briefing and safety instructions for adventure activities.',
      distance: '0 km',
      travelTime: '1 hr',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹200',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'nature'
    },
    {
      id: 'river-rafting',
      time: '8:00 AM',
      place: 'Subarnarekha River',
      activity: 'White Water Rafting',
      description: 'Exciting river rafting experience through Jharkhand\'s scenic waterways.',
      distance: '45 km',
      travelTime: '1 hr 15 mins',
      transport: 'Adventure Vehicle',
      transportCost: '₹300',
      activityCost: '₹1500',
      coordinates: { lat: 22.7500, lng: 85.8500 },
      category: 'nature',
      photoTips: 'Action shots during rafting. Use waterproof camera.',
      localTips: 'All safety equipment provided. Basic swimming knowledge required.'
    },
    {
      id: 'adventure-lunch',
      time: '12:30 PM',
      place: 'Riverside Camping Site',
      activity: 'Outdoor Camping Lunch',
      description: 'Barbecue lunch by the riverside with fellow adventurers.',
      distance: '5 km',
      travelTime: '15 mins',
      transport: 'Trekking',
      transportCost: '₹0',
      activityCost: '₹400',
      coordinates: { lat: 22.7520, lng: 85.8520 },
      category: 'food',
      localTips: 'Fresh grilled fish and camping-style cooking.'
    },
    {
      id: 'rock-climbing',
      time: '2:30 PM',
      place: 'Ranchi Hills',
      activity: 'Rock Climbing & Rappelling',
      description: 'Rock climbing adventure on natural rock formations with professional guides.',
      distance: '20 km',
      travelTime: '45 mins',
      transport: 'Adventure Vehicle',
      transportCost: '₹200',
      activityCost: '₹1200',
      coordinates: { lat: 23.4500, lng: 85.4000 },
      category: 'nature',
      photoTips: 'Climbing action shots and panoramic views from top.',
      localTips: 'Professional instructors provided. All skill levels welcome.'
    },
    {
      id: 'adventure-snacks',
      time: '5:00 PM',
      place: 'Hill Top Café',
      activity: 'Energy Snacks & Refreshments',
      description: 'High-energy snacks and refreshments after adventure activities.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹150',
      coordinates: { lat: 23.4520, lng: 85.4020 },
      category: 'food',
      localTips: 'Perfect spot to rest and recharge before evening activities.'
    },
    {
      id: 'zip-lining',
      time: '6:00 PM',
      place: 'Adventure Park',
      activity: 'Zip Lining & Canopy Walk',
      description: 'Thrilling zip line experience through forest canopy.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Adventure Vehicle',
      transportCost: '₹100',
      activityCost: '₹800',
      coordinates: { lat: 23.4200, lng: 85.3800 },
      category: 'nature',
      photoTips: 'Action shots mid-flight and forest canopy views.',
      localTips: 'Evening light perfect for photography. Multiple zip lines available.'
    },
    {
      id: 'bonfire-dinner',
      time: '7:30 PM',
      place: 'Adventure Camp',
      activity: 'Bonfire Dinner & Stories',
      description: 'Outdoor dinner around bonfire with adventure stories and local music.',
      distance: '5 km',
      travelTime: '15 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹600',
      coordinates: { lat: 23.4100, lng: 85.3750 },
      category: 'food',
      photoTips: 'Bonfire scenes and group camping moments.',
      localTips: 'Traditional camping dinner. Guitar and local folk songs.'
    }
  ],
  'wildlife-safari': [
    {
      id: 'early-safari',
      time: '5:30 AM',
      place: 'Betla National Park',
      activity: 'Early Morning Wildlife Safari',
      description: 'Wildlife safari in Betla National Park to spot elephants, tigers, and various bird species.',
      distance: '120 km',
      travelTime: '2.5 hrs',
      transport: 'Hired Jeep',
      transportCost: '₹800',
      activityCost: '₹600',
      coordinates: { lat: 23.8500, lng: 84.1900 },
      category: 'nature',
      photoTips: 'Early morning light perfect for wildlife photography. Use telephoto lens.',
      localTips: 'Silent observation increases wildlife sighting chances. Carry water and snacks.'
    },
    {
      id: 'safari-breakfast',
      time: '8:30 AM',
      place: 'Forest Rest House',
      activity: 'Traditional Forest Breakfast',
      description: 'Breakfast at forest rest house with local tribal preparation methods.',
      distance: '5 km',
      travelTime: '15 mins',
      transport: 'Jeep',
      transportCost: '₹100',
      activityCost: '₹200',
      coordinates: { lat: 23.8520, lng: 84.1920 },
      category: 'food',
      localTips: 'Fresh jungle honey and traditional rice preparations available.'
    },
    {
      id: 'nature-walk',
      time: '10:00 AM',
      place: 'Koel River Bank',
      activity: 'Guided Nature Walk & Bird Watching',
      description: 'Guided walk along Koel river with expert naturalist for bird watching.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Walking/Jeep',
      transportCost: '₹150',
      activityCost: '₹300',
      coordinates: { lat: 23.8600, lng: 84.2000 },
      category: 'nature',
      photoTips: 'River reflections and bird photography. Carry binoculars.',
      localTips: 'Over 150 bird species recorded. Best time for migratory birds.'
    },
    {
      id: 'tribal-lunch',
      time: '1:00 PM',
      place: 'Tribal Village (Kechki)',
      activity: 'Traditional Tribal Lunch Experience',
      description: 'Authentic tribal lunch prepared by local Ho tribe community.',
      distance: '15 km',
      travelTime: '30 mins',
      transport: 'Jeep',
      transportCost: '₹200',
      activityCost: '₹350',
      coordinates: { lat: 23.8400, lng: 84.1800 },
      category: 'cultural',
      localTips: 'Learn about Ho tribe customs. Organic forest produce used in cooking.'
    },
    {
      id: 'elephant-ride',
      time: '3:30 PM',
      place: 'Elephant Safari Point',
      activity: 'Elephant Safari Experience',
      description: 'Gentle elephant ride through forest trails with mahout guidance.',
      distance: '10 km',
      travelTime: '25 mins',
      transport: 'Jeep',
      transportCost: '₹150',
      activityCost: '₹800',
      coordinates: { lat: 23.8300, lng: 84.1750 },
      category: 'nature',
      photoTips: 'Unique perspective from elephant back. Capture forest canopy views.',
      localTips: 'Ethical elephant interaction. Support local mahout community.'
    },
    {
      id: 'sunset-point',
      time: '5:30 PM',
      place: 'Mirchiya Sunset Point',
      activity: 'Sunset Viewing & Photography',
      description: 'Panoramic sunset views over Palamau landscape from elevated viewpoint.',
      distance: '12 km',
      travelTime: '30 mins',
      transport: 'Jeep',
      transportCost: '₹180',
      activityCost: '₹100',
      coordinates: { lat: 23.8700, lng: 84.2100 },
      category: 'nature',
      photoTips: 'Golden hour photography. Silhouette shots of forest landscape.',
      localTips: 'Clear evening views. Carry warm clothing for evening breeze.'
    },
    {
      id: 'campfire-dinner',
      time: '7:30 PM',
      place: 'Forest Lodge',
      activity: 'Campfire Dinner & Folk Stories',
      description: 'Traditional dinner around campfire with local folk tales and tribal music.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Jeep',
      transportCost: '₹120',
      activityCost: '₹500',
      coordinates: { lat: 23.8450, lng: 84.1850 },
      category: 'cultural',
      photoTips: 'Campfire portraits and cultural performance shots.',
      localTips: 'Traditional Ho and Oraon folk songs. Star gazing opportunities.'
    }
  ],
  'spiritual-temples': [
    {
      id: 'temple-start',
      time: '6:00 AM',
      place: 'Hotel Departure',
      activity: 'Spiritual Journey Begins',
      description: 'Early morning departure for temple tour with traditional prayers.',
      distance: '0 km',
      travelTime: '30 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹50',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'cultural'
    },
    {
      id: 'baidyanath-temple',
      time: '7:30 AM',
      place: 'Baba Baidyanath Dham (Deoghar)',
      activity: 'Sacred Jyotirlinga Darshan',
      description: 'Visit to one of the 12 Jyotirlingas, sacred Shiva temple with spiritual significance.',
      distance: '180 km',
      travelTime: '3.5 hrs',
      transport: 'AC Car',
      transportCost: '₹1200',
      activityCost: '₹100',
      coordinates: { lat: 24.4833, lng: 86.7000 },
      category: 'cultural',
      photoTips: 'Temple architecture and devotional scenes. Respect photography guidelines.',
      localTips: 'Peak pilgrimage during Shravan month. Early morning has fewer crowds.'
    },
    {
      id: 'temple-prasad',
      time: '9:30 AM',
      place: 'Temple Prasadalaya',
      activity: 'Sacred Prasad & Traditional Breakfast',
      description: 'Temple blessed food and traditional breakfast in sacred environment.',
      distance: '0.5 km',
      travelTime: '10 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹150',
      coordinates: { lat: 24.4840, lng: 86.7010 },
      category: 'food',
      localTips: 'Sacred prasad includes kheer, fruits. Maintain temple etiquette.'
    },
    {
      id: 'naulakha-temple',
      time: '11:00 AM',
      place: 'Naulakha Mandir',
      activity: 'Architectural Marvel Visit',
      description: 'Beautiful temple architecture inspired by Radha-Krishna theme with intricate carvings.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Auto',
      transportCost: '₹30',
      activityCost: '₹20',
      coordinates: { lat: 24.4900, lng: 86.7050 },
      category: 'cultural',
      photoTips: 'Intricate carvings and temple architecture. Beautiful stone work details.',
      localTips: 'Built by Queen Charushila. Less crowded than main temple.'
    },
    {
      id: 'spiritual-lunch',
      time: '1:00 PM',
      place: 'Dharamshala Restaurant',
      activity: 'Sattvic Vegetarian Meal',
      description: 'Pure vegetarian meal following spiritual dietary principles.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹200',
      coordinates: { lat: 24.4850, lng: 86.7020 },
      category: 'food',
      localTips: 'No onion-garlic preparations. Fresh and simple flavors.'
    },
    {
      id: 'tapovan-caves',
      time: '2:30 PM',
      place: 'Tapovan Caves & Hills',
      activity: 'Meditation & Cave Exploration',
      description: 'Natural caves used for meditation by sages, peaceful spiritual environment.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Auto',
      transportCost: '₹80',
      activityCost: '₹50',
      coordinates: { lat: 24.5000, lng: 86.7200 },
      category: 'nature',
      photoTips: 'Cave formations and hilltop views. Natural lighting in caves.',
      localTips: 'Peaceful meditation spot. Natural spring water available.'
    },
    {
      id: 'evening-aarti',
      time: '6:00 PM',
      place: 'Baidyanath Temple',
      activity: 'Evening Aarti & Spiritual Experience',
      description: 'Participate in evening aarti ceremony with devotional songs and prayers.',
      distance: '8 km',
      travelTime: '20 mins',
      transport: 'Auto',
      transportCost: '₹80',
      activityCost: '₹50',
      coordinates: { lat: 24.4833, lng: 86.7000 },
      category: 'cultural',
      photoTips: 'Aarti ceremony lights and devotional atmosphere. Respectful photography.',
      localTips: 'Most spiritual time. Join in chanting for full experience.'
    },
    {
      id: 'spiritual-dinner',
      time: '7:30 PM',
      place: 'Ashram Bhojanshala',
      activity: 'Simple Ashram Dinner',
      description: 'Simple, pure dinner in ashram setting with spiritual discourse.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹150',
      coordinates: { lat: 24.4860, lng: 86.7030 },
      category: 'food',
      localTips: 'Silent meal tradition in some ashrams. Focus on mindful eating.'
    }
  ],
  'scenic-lakes': [
    {
      id: 'lake-morning',
      time: '6:30 AM',
      place: 'Dimna Lake',
      activity: 'Sunrise Boating & Photography',
      description: 'Early morning boat ride on Dimna Lake with stunning sunrise reflections.',
      distance: '13 km',
      travelTime: '30 mins',
      transport: 'Taxi',
      transportCost: '₹200',
      activityCost: '₹300',
      coordinates: { lat: 22.7833, lng: 86.1500 },
      category: 'nature',
      photoTips: 'Sunrise reflections on water. Golden hour photography ideal.',
      localTips: 'Peaceful morning atmosphere. Best time for photography.'
    },
    {
      id: 'lakeside-breakfast',
      time: '8:00 AM',
      place: 'Dimna Lake Resort',
      activity: 'Lakeside Breakfast Experience',
      description: 'Fresh breakfast with lake views and local specialties.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹250',
      coordinates: { lat: 22.7840, lng: 86.1510 },
      category: 'food',
      localTips: 'Fresh fish preparations available. Beautiful lake views while dining.'
    },
    {
      id: 'water-sports',
      time: '9:30 AM',
      place: 'Dimna Lake Activity Center',
      activity: 'Water Sports & Activities',
      description: 'Kayaking, paddle boating, and water sports activities on the lake.',
      distance: '0.5 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹600',
      coordinates: { lat: 22.7850, lng: 86.1520 },
      category: 'nature',
      photoTips: 'Action shots of water sports. Use waterproof camera.',
      localTips: 'Life jackets provided. Swimming knowledge helpful but not required.'
    },
    {
      id: 'hudco-lake',
      time: '12:00 PM',
      place: 'HUDCO Lake',
      activity: 'Scenic Drive & Lake Exploration',
      description: 'Visit to HUDCO Lake with beautiful surroundings and peaceful environment.',
      distance: '25 km',
      travelTime: '45 mins',
      transport: 'Car',
      transportCost: '₹300',
      activityCost: '₹100',
      coordinates: { lat: 22.8000, lng: 86.2000 },
      category: 'nature',
      photoTips: 'Wide lake views and surrounding hills. Panoramic photography.',
      localTips: 'Less crowded than Dimna Lake. Perfect for peaceful moments.'
    },
    {
      id: 'picnic-lunch',
      time: '1:30 PM',
      place: 'HUDCO Lake Picnic Spot',
      activity: 'Lakeside Picnic Lunch',
      description: 'Packed lunch picnic by the lake with family-friendly environment.',
      distance: '1 km',
      travelTime: '5 mins',
      transport: 'Walking',
      transportCost: '₹0',
      activityCost: '₹300',
      coordinates: { lat: 22.8010, lng: 86.2010 },
      category: 'food',
      localTips: 'Carry picnic mat. Waste disposal bins available.'
    },
    {
      id: 'jubilee-park',
      time: '3:30 PM',
      place: 'Jubilee Park & Lake',
      activity: 'Garden Walk & Lake Views',
      description: 'Beautiful park with manicured gardens, rose garden, and lake views.',
      distance: '15 km',
      travelTime: '30 mins',
      transport: 'Car',
      transportCost: '₹200',
      activityCost: '₹50',
      coordinates: { lat: 22.8100, lng: 86.1800 },
      category: 'nature',
      photoTips: 'Rose garden blooms and landscaped views. Colorful flower photography.',
      localTips: 'Well-maintained gardens. Best rose blooms in winter months.'
    },
    {
      id: 'sunset-cruise',
      time: '5:30 PM',
      place: 'Dimna Lake',
      activity: 'Sunset Cruise & Dinner',
      description: 'Evening cruise on Dimna Lake with dinner served on boat.',
      distance: '12 km',
      travelTime: '25 mins',
      transport: 'Car',
      transportCost: '₹180',
      activityCost: '₹800',
      coordinates: { lat: 22.7833, lng: 86.1500 },
      category: 'nature',
      photoTips: 'Sunset over water. Romantic evening lighting.',
      localTips: 'Advance booking required for dinner cruise. Popular activity.'
    }
  ],
  'shopping-departure': [
    {
      id: 'morning-shopping',
      time: '9:00 AM',
      place: 'Main Road Shopping Complex',
      activity: 'Souvenir & Handicraft Shopping',
      description: 'Final shopping for Jharkhand handicrafts, tribal art, and local specialties.',
      distance: '5 km',
      travelTime: '20 mins',
      transport: 'Auto',
      transportCost: '₹60',
      activityCost: '₹800',
      coordinates: { lat: 23.3500, lng: 85.3250 },
      category: 'cultural',
      photoTips: 'Colorful handicrafts and market scenes.',
      localTips: 'Bargain for better prices. Look for authentic tribal jewelry and bamboo crafts.'
    },
    {
      id: 'local-cuisine',
      time: '11:00 AM',
      place: 'Traditional Restaurant',
      activity: 'Final Taste of Jharkhand Cuisine',
      description: 'Last meal featuring all regional specialties you might have missed.',
      distance: '2 km',
      travelTime: '10 mins',
      transport: 'Auto',
      transportCost: '₹40',
      activityCost: '₹350',
      coordinates: { lat: 23.3520, lng: 85.3280 },
      category: 'food',
      localTips: 'Try regional thali for complete taste experience.'
    },
    {
      id: 'packing-checkout',
      time: '1:00 PM',
      place: 'Hotel/Accommodation',
      activity: 'Packing & Hotel Checkout',
      description: 'Pack souvenirs carefully and complete hotel checkout procedures.',
      distance: '3 km',
      travelTime: '15 mins',
      transport: 'Taxi',
      transportCost: '₹80',
      activityCost: '₹0',
      coordinates: { lat: 23.3441, lng: 85.3096 },
      category: 'cultural',
      localTips: 'Pack fragile handicrafts carefully. Keep important documents handy.'
    },
    {
      id: 'city-farewell',
      time: '2:30 PM',
      place: 'Ranchi Railway Station/Airport',
      activity: 'Departure Preparation',
      description: 'Final city views and departure preparations from Ranchi.',
      distance: '8 km',
      travelTime: '25 mins',
      transport: 'Taxi',
      transportCost: '₹150',
      activityCost: '₹100',
      coordinates: { lat: 23.3173, lng: 85.3200 },
      category: 'cultural',
      photoTips: 'Final city shots and travel memories.',
      localTips: 'Arrive early for hassle-free departure. Keep travel documents ready.'
    }
  ]
};

export const ItineraryPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai-planner' | 'day-plans'>('ai-planner');
  const [selectedDayPlanStop, setSelectedDayPlanStop] = useState<string | null>(null);
  const [dayPlanBudgetView, setDayPlanBudgetView] = useState<'basic' | 'comfortable' | 'luxury'>('comfortable');
  const [expandedDayPlan, setExpandedDayPlan] = useState<string | null>(null);
  const [expandedDetailStop, setExpandedDetailStop] = useState<string | null>(null);
  const [preferences, setPreferences] = useState({
    duration: '5',
    budget: 'Moderate',
    interests: ['Nature', 'Culture'],
    travelers: '2',
  });
  // Helper to get numeric duration
  const tripDuration = Number(preferences.duration) || 1;
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Budget multipliers for different categories
  const getBudgetMultiplier = (budgetType: string): number => {
    switch (budgetType.toLowerCase()) {
      case 'economy':
        return 0.6; // 60% of base cost
      case 'moderate':
        return 1.0; // 100% of base cost (default)
      case 'luxury':
        return 1.8; // 180% of base cost
      default:
        return 1.0;
    }
  };

  // Calculate budget-specific total cost
  const calculateTotalCost = (baseCost: number): number => {
    const multiplier = getBudgetMultiplier(preferences.budget);
    return Math.round(baseCost * multiplier);
  };

  const handleInterestChange = (interest: string) => {
    setPreferences((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setItinerary(null);

    console.log("Submitting preferences:", preferences); // Debug log

    try {
        const startTime = performance.now(); // Start time
        const result = await generateItinerary(preferences);
        const endTime = performance.now(); // End time
        console.log(`API call took ${endTime - startTime} milliseconds`); // Log time taken
        setItinerary(result);
    } catch (err) {
        console.error("Error generating itinerary:", err); // Log error
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
        setIsLoading(false);
    }
  };

  const interestsOptions = ['Nature', 'Culture', 'History', 'Adventure', 'Spiritual', 'Wildlife'];

  // Day Plan calculations
  const totalTransport = ranchiBudgetItinerary.reduce((sum, stop) => 
    sum + parseInt(stop.transportCost.replace('₹', '') || '0'), 0);
  const totalActivity = ranchiBudgetItinerary.reduce((sum, stop) => 
    sum + parseInt(stop.activityCost.replace('₹', '') || '0'), 0);
  const totalDayPlanBudget = totalTransport + totalActivity;

  const budgetMultipliers = {
    basic: 0.7,
    comfortable: 1.0,
    luxury: 1.8
  };

  const adjustedDayPlanBudget = Math.round(totalDayPlanBudget * budgetMultipliers[dayPlanBudgetView]);

  const generateMapsUrl = () => {
    const waypoints = ranchiBudgetItinerary
      .map(stop => `${stop.coordinates.lat},${stop.coordinates.lng}`)
      .join('|');
    return `https://www.google.com/maps/dir/${waypoints}`;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport': return <Train size={20} className="text-blue-600" />;
      case 'food': return <Utensils size={20} className="text-green-600" />;
      case 'attraction': return <Camera size={20} className="text-purple-600" />;
      case 'cultural': return <MapPin size={20} className="text-orange-600" />;
      case 'nature': return <Sun size={20} className="text-yellow-600" />;
      default: return <MapPin size={20} className="text-gray-600" />;
    }
  };

  // Enhanced function to determine day plan key from day stops
  const getDayPlanKey = (stops: ItineraryStop[]): string | null => {
    if (!stops || stops.length === 0) return null;
    
    const activities = stops.map(stop => stop.activities.join(' ').toLowerCase()).join(' ');
    const names = stops.map(stop => stop.name.toLowerCase()).join(' ');
    const fullText = `${activities} ${names}`;
    
    // Enhanced detection patterns for all 10+ days
    if (fullText.includes('rock garden') || fullText.includes('kanke dam') || fullText.includes('hundru') || fullText.includes('dassam') || fullText.includes('waterfall')) {
      return 'ranchi-city-waterfalls';
    } else if (fullText.includes('netarhat') || fullText.includes('forest') || fullText.includes('sunset') || fullText.includes('hill station')) {
      return 'netarhat-hills';
    } else if (fullText.includes('patratu') || fullText.includes('valley') || fullText.includes('scenic') || fullText.includes('viewpoint')) {
      return 'patratu-valley';
    } else if (fullText.includes('rest') || fullText.includes('leisure') || fullText.includes('shopping') || fullText.includes('market') || fullText.includes('relax') || fullText.includes('local exploration')) {
      return 'rest-leisure';
    } else if (fullText.includes('birsa') || fullText.includes('munda') || fullText.includes('heritage') || fullText.includes('tribal') || fullText.includes('cultural') || fullText.includes('museum') || fullText.includes('freedom fighter')) {
      return 'birsa-munda-heritage';
    } else if (fullText.includes('adventure') || fullText.includes('rafting') || fullText.includes('climbing') || fullText.includes('zip') || fullText.includes('sports') || fullText.includes('trekking') || fullText.includes('camping')) {
      return 'adventure-sports';
    } else if (fullText.includes('wildlife') || fullText.includes('safari') || fullText.includes('national park') || fullText.includes('betla') || fullText.includes('elephant') || fullText.includes('animals')) {
      return 'wildlife-safari';
    } else if (fullText.includes('temple') || fullText.includes('spiritual') || fullText.includes('religious') || fullText.includes('baidyanath') || fullText.includes('deoghar') || fullText.includes('pilgrimage') || fullText.includes('jyotirlinga')) {
      return 'spiritual-temples';
    } else if (fullText.includes('lake') || fullText.includes('dimna') || fullText.includes('hudco') || fullText.includes('boating') || fullText.includes('water sports') || fullText.includes('cruise')) {
      return 'scenic-lakes';
    } else if (fullText.includes('shopping') || fullText.includes('departure') || fullText.includes('final') || fullText.includes('last minute') || fullText.includes('farewell') || fullText.includes('checkout')) {
      return 'shopping-departure';
    }
    
    // Extended fallback patterns for longer trips
    if (fullText.includes('nature') || fullText.includes('park') || fullText.includes('garden')) {
      return 'scenic-lakes';
    }
    
    if (fullText.includes('culture') || fullText.includes('tradition')) {
      return 'birsa-munda-heritage';
    }
    
    return null;
  };

  // Generate detailed plan for a day
  const generateDetailedPlan = (dayKey: string) => {
    const plan = detailedDayPlans[dayKey];
    if (!plan) return null;

    const totalTransportCost = plan.reduce((sum, stop) => 
      sum + parseInt(stop.transportCost.replace('₹', '') || '0'), 0);
    const totalActivityCost = plan.reduce((sum, stop) => 
      sum + parseInt(stop.activityCost.replace('₹', '') || '0'), 0);
    const totalBudget = totalTransportCost + totalActivityCost;

    const generateDetailedMapsUrl = (stops: DayPlanStop[]) => {
      const waypoints = stops
        .map(stop => `${stop.coordinates.lat},${stop.coordinates.lng}`)
        .join('|');
      return `https://www.google.com/maps/dir/${waypoints}`;
    };

    return {
      stops: plan,
      totalTransportCost,
      totalActivityCost,
      totalBudget,
      mapsUrl: generateDetailedMapsUrl(plan)
    };
  };

  return (
    <div className="min-h-[80vh] py-8 px-2 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="w-full max-w-4xl mb-8">
        <div className="flex justify-center">
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('ai-planner')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'ai-planner'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-green-700 hover:bg-green-100'
              }`}
            >
              <Bot size={20} />
              AI Trip Planner
            </button>
            <button
              onClick={() => setActiveTab('day-plans')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ml-2 ${
                activeTab === 'day-plans'
                  ? 'bg-peach-600 text-white shadow-lg'
                  : 'text-peach-700 hover:bg-peach-100'
              }`}
            >
              <Calendar size={20} />
              Ready Day Plans
            </button>
          </div>
        </div>
      </div>

      {/* AI Planner Tab */}
      {activeTab === 'ai-planner' && (
        <>
          <Card className="w-full max-w-3xl mb-10 glassmorphic-card shadow-xl border border-green-200/40">
            <h2 className="text-3xl font-serif font-bold text-green-700 mb-2 text-center flex items-center justify-center gap-2">
              <Sparkles className="text-green-600" />
              AI Itinerary Planner
            </h2>
            <p className="text-gray-700 mb-6 text-center">Tell us your preferences, and our AI will craft a personalized journey through Jharkhand just for you.</p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-green-900">Trip Duration (days)</label>
                <input
                  type="number"
                  value={preferences.duration}
                  onChange={(e) => setPreferences({ ...preferences, duration: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 text-green-900 bg-white/80 p-2"
                  min={1}
                  required
                  aria-label="Trip duration in days"
                  placeholder="Enter number of days"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-green-900">Budget</label>
                <select
                  value={preferences.budget}
                  onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 text-green-900 bg-white/80 p-2"
                  aria-label="Budget category"
                  title="Select your budget preference"
                >
                  <option>Economy</option>
                  <option>Moderate</option>
                  <option>Luxury</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-green-900">Interests</label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {interestsOptions.map(interest => (
                    <button
                      type="button"
                      key={interest}
                      onClick={() => handleInterestChange(interest)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border
                        ${preferences.interests.includes(interest)
                          ? 'bg-green-600 text-white border-green-600 shadow'
                          : 'bg-white/80 text-green-700 border-green-200 hover:bg-green-100'}
                      `}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-green-900">Number of Travelers</label>
                <input
                  type="number"
                  value={preferences.travelers}
                  onChange={(e) => setPreferences({ ...preferences, travelers: e.target.value })}
                  className="mt-1 block w-full rounded-lg border-green-200 shadow-sm focus:border-green-500 focus:ring-green-500 text-green-900 bg-white/80 p-2"
                  min={1}
                  required
                  aria-label="Number of travelers"
                  placeholder="Enter number of travelers"
                />
              </div>
              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-gradient-to-r from-green-600 to-green-400 hover:from-green-700 hover:to-green-500 shadow-lg transition disabled:bg-gray-400"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Crafting Your Journey...
                    </>
                  ) : 'Generate Itinerary'}
                </button>
              </div>
            </form>
          </Card>

          {error && (
            <Card className="max-w-2xl mb-6 bg-red-50 border-l-4 border-red-400 text-red-700 text-center">
              <p>{error}</p>
            </Card>
          )}

          {itinerary && Array.isArray(itinerary.stops) && (
            <div className="w-full max-w-4xl space-y-8">
              <Card className="glassmorphic-card border-green-200/40">
                <h2 className="text-4xl font-serif text-center text-orange-600 mb-2">Your Personalized Itinerary</h2>
                <div className="text-center text-green-900 flex justify-center items-center gap-6 mb-4 font-semibold">
                  <span className="bg-green-100 px-4 py-1 rounded-full">{tripDuration} Days</span>
                  <span>&bull;</span>
                  <span className={`px-4 py-1 rounded-full ${
                    preferences.budget === 'Economy' ? 'bg-blue-100 text-blue-800' :
                    preferences.budget === 'Luxury' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {preferences.budget} Trip
                  </span>
                  <span>&bull;</span>
                  <span className="bg-yellow-100 px-4 py-1 rounded-full">Total Budget: ₹{calculateTotalCost(itinerary.totalCost).toLocaleString()}</span>
                </div>
              </Card>
              {/* Map showing all itinerary stops */}
              <div className="my-8">
                <ItineraryMap stops={itinerary.stops} />
              </div>
              {/* Render day-by-day cards below, filling missing days if needed */}
              {Array.from({ length: tripDuration }, (_, i) => {
                const day = i + 1;
                const stops = itinerary.stops.filter((stop: ItineraryStop) => stop.day === day);
                const dayPlanKey = getDayPlanKey(stops);
                const detailedPlan = dayPlanKey ? generateDetailedPlan(dayPlanKey) : null;
                const isExpanded = expandedDayPlan === `day-${day}`;
                
                return (
                  <Card key={day} className="glassmorphic-card border-green-200/40">
                    <div 
                      className={`cursor-pointer transition-all duration-300 ${
                        dayPlanKey ? 'hover:bg-green-50' : ''
                      }`}
                      onClick={() => {
                        if (dayPlanKey) {
                          setExpandedDayPlan(isExpanded ? null : `day-${day}`);
                          setExpandedDetailStop(null);
                        }
                      }}
                    >
                      <h3 className="text-2xl font-bold font-serif text-green-700 mb-4 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="inline-block bg-green-600 text-white px-3 py-1 rounded-full shadow">Day {day}</span>
                          {dayPlanKey && (
                            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Click for detailed plan
                            </span>
                          )}
                        </span>
                        {dayPlanKey && (
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Navigation size={20} className="text-green-600" />
                          </motion.div>
                        )}
                      </h3>
                      
                      <div className="space-y-4">
                        {stops.length > 0 ? (
                          stops.map((stop, idx) => (
                            <div key={stop.id} className="p-4 bg-green-50/80 rounded-lg border-l-4 border-green-400">
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                  <p className="font-bold text-green-700 text-lg">{stop.name}</p>
                                  <p className="text-green-900 text-sm mb-1">Lat: {stop.coordinates.latitude}, Lon: {stop.coordinates.longitude}</p>
                                  <p className="text-green-900 text-sm mb-1">Activities: {stop.activities.join(', ')}</p>
                                </div>
                                <div className="text-right mt-2 md:mt-0">
                                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-semibold">
                                    Est. Cost: ₹{Math.round(stop.estimatedCost * getBudgetMultiplier(preferences.budget)).toLocaleString()}
                                  </span>
                                  <div className="text-xs text-green-600 mt-1 font-medium">
                                    {preferences.budget} Budget
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 bg-green-50/80 rounded-lg border-l-4 border-green-400 text-green-700 font-semibold">
                            Rest Day & Leisure / Explore local markets and cuisine / Optional sightseeing
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Detailed Day Plan - Expandable */}
                    {isExpanded && detailedPlan && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-6 pt-6 border-t-2 border-green-200"
                      >
                        {/* Detailed Plan Header */}
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6 mb-6">
                          <h4 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Calendar size={24} />
                            Complete Day {day} Itinerary
                          </h4>
                          
                          {/* Budget Summary */}
                          <div className="grid md:grid-cols-4 gap-4 text-center">
                            <div>
                              <div className="text-2xl font-bold">₹{detailedPlan.totalTransportCost}</div>
                              <div className="opacity-80">Transport</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold">₹{detailedPlan.totalActivityCost}</div>
                              <div className="opacity-80">Activities & Food</div>
                            </div>
                            <div>
                              <div className="text-2xl font-bold">₹{detailedPlan.totalBudget}</div>
                              <div className="opacity-80">Total Budget</div>
                            </div>
                            <div>
                              <a
                                href={detailedPlan.mapsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                              >
                                <Navigation size={20} />
                                View Route
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-3">
                          <h5 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Clock size={20} />
                            Hour-by-Hour Timeline
                          </h5>
                          
                          {detailedPlan.stops.map((stop, index) => (
                            <motion.div
                              key={stop.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                                expandedDetailStop === stop.id ? 'ring-2 ring-green-400' : ''
                              }`}
                            >
                              <div
                                className="p-4 cursor-pointer hover:bg-gray-50"
                                onClick={() => setExpandedDetailStop(expandedDetailStop === stop.id ? null : stop.id)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <Clock size={16} className="text-green-600" />
                                      <span className="font-bold text-green-800">{stop.time}</span>
                                    </div>
                                    {getCategoryIcon(stop.category)}
                                    <div>
                                      <h6 className="font-bold text-gray-800">{stop.place}</h6>
                                      <p className="text-gray-600 text-sm">{stop.activity}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="text-right">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                      <Car size={12} />
                                      <span>{stop.distance} • {stop.travelTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-green-600">
                                      <IndianRupee size={14} />
                                      <span>{parseInt(stop.transportCost.replace('₹', '') || '0') + parseInt(stop.activityCost.replace('₹', '') || '0')}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Expanded Details */}
                                {expandedDetailStop === stop.id && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 pt-4 border-t border-gray-200"
                                  >
                                    <div className="grid md:grid-cols-2 gap-4">
                                      <div>
                                        <h6 className="font-bold text-gray-800 mb-2">Details</h6>
                                        <p className="text-gray-600 text-sm mb-3">{stop.description}</p>
                                        
                                        <div className="space-y-1 text-sm">
                                          <div className="flex justify-between">
                                            <span className="text-gray-500">Transport:</span>
                                            <span className="font-medium">{stop.transport} • {stop.transportCost}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-gray-500">Activity Cost:</span>
                                            <span className="font-medium">{stop.activityCost}</span>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div>
                                        {stop.photoTips && (
                                          <div className="mb-3">
                                            <h6 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                                              <Camera size={14} />
                                              Photo Tips
                                            </h6>
                                            <p className="text-gray-600 text-xs">{stop.photoTips}</p>
                                          </div>
                                        )}
                                        
                                        {stop.localTips && (
                                          <div className="mb-3">
                                            <h6 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                                              <AlertTriangle size={14} />
                                              Local Tips
                                            </h6>
                                            <p className="text-gray-600 text-xs">{stop.localTips}</p>
                                          </div>
                                        )}
                                        
                                        <a
                                          href={`https://www.google.com/maps/search/?api=1&query=${stop.coordinates.lat},${stop.coordinates.lng}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600 transition-colors"
                                        >
                                          <MapPin size={12} />
                                          Open Location
                                        </a>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Additional Day Info */}
                        <div className="mt-6 grid md:grid-cols-3 gap-4">
                          {/* Weather Tips */}
                          <div className="bg-blue-50 rounded-lg p-4">
                            <h6 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                              <Cloud size={16} />
                              Weather Tips
                            </h6>
                            <ul className="text-blue-700 text-xs space-y-1">
                              <li>• Check weather before departure</li>
                              <li>• Carry umbrella during monsoon</li>
                              <li>• Comfortable walking shoes</li>
                              <li>• Sun protection recommended</li>
                            </ul>
                          </div>

                          {/* Emergency Contacts */}
                          <div className="bg-red-50 rounded-lg p-4">
                            <h6 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                              <Phone size={16} />
                              Emergency Contacts
                            </h6>
                            <ul className="text-red-700 text-xs space-y-1">
                              <li>• Tourist Helpline: 1363</li>
                              <li>• Police: 100</li>
                              <li>• Medical Emergency: 108</li>
                              <li>• Local Guide: Available</li>
                            </ul>
                          </div>

                          {/* Best Photo Spots */}
                          <div className="bg-purple-50 rounded-lg p-4">
                            <h6 className="font-bold text-purple-800 mb-2 flex items-center gap-2">
                              <Camera size={16} />
                              Photo Highlights
                            </h6>
                            <ul className="text-purple-700 text-xs space-y-1">
                              <li>• Golden hour at viewpoints</li>
                              <li>• Cultural interactions</li>
                              <li>• Nature close-ups</li>
                              <li>• Food presentation shots</li>
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Day Plans Tab */}
      {activeTab === 'day-plans' && (
        <div className="w-full max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-peach-800 mb-4 flex items-center justify-center gap-2">
              <Train className="text-peach-600" />
              Ultimate Ranchi Day Plan
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Complete one-day itinerary from Ranchi Railway Station
            </p>
            
            {/* Budget Selector */}
            <div className="flex justify-center gap-4 mb-6">
              {(['basic', 'comfortable', 'luxury'] as const).map(level => (
                <button
                  key={level}
                  onClick={() => setDayPlanBudgetView(level)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    dayPlanBudgetView === level
                      ? 'bg-peach-500 text-white shadow-lg'
                      : 'bg-white text-peach-600 hover:bg-peach-100'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Total Budget Display */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">₹{totalTransport}</div>
                  <div className="text-sm text-gray-500">Transport</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">₹{totalActivity}</div>
                  <div className="text-sm text-gray-500">Activities & Food</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">₹{adjustedDayPlanBudget}</div>
                  <div className="text-sm text-gray-500">{dayPlanBudgetView} Budget</div>
                </div>
                <div>
                  <a
                    href={generateMapsUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-peach-500 text-white px-4 py-2 rounded-xl hover:bg-peach-600 transition-colors"
                  >
                    <Navigation size={20} />
                    Open Route in Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Itinerary Timeline */}
          <div className="space-y-4 mb-8">
            {ranchiBudgetItinerary.map((stop, index) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                  selectedDayPlanStop === stop.id ? 'ring-2 ring-peach-400' : ''
                }`}
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedDayPlanStop(selectedDayPlanStop === stop.id ? null : stop.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Clock size={20} className="text-peach-600" />
                        <span className="font-bold text-lg text-peach-800">{stop.time}</span>
                      </div>
                      {getCategoryIcon(stop.category)}
                      <div>
                        <h3 className="font-bold text-xl text-gray-800">{stop.place}</h3>
                        <p className="text-gray-600">{stop.activity}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Car size={16} />
                        <span>{stop.distance} • {stop.travelTime}</span>
                      </div>
                      <div className="flex items-center gap-2 text-lg font-bold text-green-600">
                        <IndianRupee size={16} />
                        <span>{parseInt(stop.transportCost.replace('₹', '') || '0') + parseInt(stop.activityCost.replace('₹', '') || '0')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expanded Details */}
                  {selectedDayPlanStop === stop.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Details</h4>
                          <p className="text-gray-600 mb-4">{stop.description}</p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Transport:</span>
                              <span className="font-medium">{stop.transport} • {stop.transportCost}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Activity Cost:</span>
                              <span className="font-medium">{stop.activityCost}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          {stop.photoTips && (
                            <div className="mb-4">
                              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <Camera size={16} />
                                Photo Tips
                              </h4>
                              <p className="text-gray-600 text-sm">{stop.photoTips}</p>
                            </div>
                          )}
                          
                          {stop.localTips && (
                            <div>
                              <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                                <AlertTriangle size={16} />
                                Local Tips
                              </h4>
                              <p className="text-gray-600 text-sm">{stop.localTips}</p>
                            </div>
                          )}
                          
                          <div className="mt-4">
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${stop.coordinates.lat},${stop.coordinates.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                            >
                              <MapPin size={16} />
                              Open in Maps
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 mb-8"
          >
            {/* Weather Tips */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <Cloud size={20} className="text-blue-500" />
                Weather Tips
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Best time: October to March</li>
                <li>• Carry umbrella in monsoon (July-Sept)</li>
                <li>• Light cotton clothes in summer</li>
                <li>• Comfortable walking shoes essential</li>
              </ul>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <Phone size={20} className="text-red-500" />
                Emergency Contacts
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Tourist Helpline: 1363</li>
                <li>• Police: 100</li>
                <li>• Medical Emergency: 108</li>
                <li>• Railway Enquiry: 139</li>
              </ul>
            </div>

            {/* Optional Evening Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                <Camera size={20} className="text-purple-500" />
                Optional Add-ons
              </h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Birsa Zoological Park (+₹30, 2 hrs)</li>
                <li>• Tagore Hill (+₹0, 1 hr)</li>
                <li>• Shopping at Main Road (+₹500)</li>
                <li>• Night food tour (+₹200)</li>
              </ul>
            </div>
          </motion.div>

          {/* Final Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-peach-500 to-orange-500 text-white rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Day Summary</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <div className="text-3xl font-bold">15 hrs</div>
                <div className="opacity-80">Total Duration</div>
              </div>
              <div>
                <div className="text-3xl font-bold">42.2 km</div>
                <div className="opacity-80">Total Distance</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10</div>
                <div className="opacity-80">Places Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold">₹{adjustedDayPlanBudget}</div>
                <div className="opacity-80">Total Budget</div>
              </div>
            </div>
            <p className="mt-6 opacity-90">
              A perfect blend of culture, nature, food, and heritage - 
              experience the best of Ranchi in one unforgettable day!
            </p>
          </motion.div>
        </div>
      )}

      {/* Glassmorphic style */}
      <style>{`
        .glassmorphic-card {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
        }
      `}</style>
    </div>
  );
};