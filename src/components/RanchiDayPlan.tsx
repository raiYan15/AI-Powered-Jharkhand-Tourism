import React, { useState } from 'react';
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
  Navigation
} from 'lucide-react';

interface ItineraryStop {
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

const ranchiBudgetItinerary: ItineraryStop[] = [
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

const RanchiDayPlan: React.FC = () => {
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  const [budgetView, setBudgetView] = useState<'basic' | 'comfortable' | 'luxury'>('comfortable');

  // Calculate total costs
  const totalTransport = ranchiBudgetItinerary.reduce((sum, stop) => 
    sum + parseInt(stop.transportCost.replace('₹', '') || '0'), 0);
  const totalActivity = ranchiBudgetItinerary.reduce((sum, stop) => 
    sum + parseInt(stop.activityCost.replace('₹', '') || '0'), 0);
  const totalBudget = totalTransport + totalActivity;

  // Budget multipliers
  const budgetMultipliers = {
    basic: 0.7,
    comfortable: 1.0,
    luxury: 1.8
  };

  const adjustedBudget = Math.round(totalBudget * budgetMultipliers[budgetView]);

  // Google Maps route URL
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-orange-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-peach-800 mb-4">
            🚂 Ultimate Ranchi Day Plan
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Complete one-day itinerary from Ranchi Railway Station
          </p>
          
          {/* Budget Selector */}
          <div className="flex justify-center gap-4 mb-6">
            {(['basic', 'comfortable', 'luxury'] as const).map(level => (
              <button
                key={level}
                onClick={() => setBudgetView(level)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  budgetView === level
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
                <div className="text-2xl font-bold text-purple-600">₹{adjustedBudget}</div>
                <div className="text-sm text-gray-500">{budgetView} Budget</div>
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
        <div className="space-y-4">
          {ranchiBudgetItinerary.map((stop, index) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 ${
                selectedStop === stop.id ? 'ring-2 ring-peach-400' : ''
              }`}
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => setSelectedStop(selectedStop === stop.id ? null : stop.id)}
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
                {selectedStop === stop.id && (
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
          className="mt-12 grid md:grid-cols-3 gap-6"
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
          className="mt-8 bg-gradient-to-r from-peach-500 to-orange-500 text-white rounded-2xl p-8 text-center"
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
              <div className="text-3xl font-bold">₹{adjustedBudget}</div>
              <div className="opacity-80">Total Budget</div>
            </div>
          </div>
          <p className="mt-6 opacity-90">
            A perfect blend of culture, nature, food, and heritage - 
            experience the best of Ranchi in one unforgettable day!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RanchiDayPlan;