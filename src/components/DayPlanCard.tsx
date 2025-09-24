import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, MapPin, IndianRupee, Train, Calendar } from 'lucide-react';

const DayPlanCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-peach-50 to-orange-100 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="relative p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-peach-500 rounded-full p-3">
            <Calendar className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-peach-800">Ultimate Day Plans</h3>
            <p className="text-gray-600">Complete travel itineraries from arrival to departure</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Train size={16} className="text-peach-600" />
            <span>From Railway Station</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock size={16} className="text-peach-600" />
            <span>15+ Hours Planned</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <MapPin size={16} className="text-peach-600" />
            <span>10+ Places Covered</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <IndianRupee size={16} className="text-peach-600" />
            <span>Budget ₹800-1500</span>
          </div>
        </div>

        {/* Sample Itinerary Preview */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h4 className="font-bold text-gray-800 mb-3">Sample: Ranchi Day Plan</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">7:00 AM - Traditional Breakfast</span>
              <span className="text-peach-600 font-medium">₹120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">10:00 AM - Kanke Dam Boating</span>
              <span className="text-peach-600 font-medium">₹130</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">6:00 PM - Pahari Mandir Sunset</span>
              <span className="text-peach-600 font-medium">₹70</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span className="text-gray-800">Total Day Budget</span>
                <span className="text-green-600">₹900</span>
              </div>
            </div>
          </div>
        </div>

        {/* Included Features */}
        <div className="bg-peach-100 rounded-xl p-4 mb-6">
          <h4 className="font-bold text-peach-800 mb-2">What's Included:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✅ Time-wise schedule (6 AM to 9 PM)</li>
            <li>✅ Transport details & costs</li>
            <li>✅ Restaurant recommendations</li>
            <li>✅ Interactive Google Maps route</li>
            <li>✅ Photography tips & local insights</li>
            <li>✅ Emergency contacts & weather tips</li>
          </ul>
        </div>

        {/* CTA Button */}
        <Link
          to="/ranchi-day-plan"
          className="block w-full bg-gradient-to-r from-peach-500 to-orange-500 text-white font-bold py-4 px-6 rounded-xl text-center hover:from-peach-600 hover:to-orange-600 transition-all duration-300 shadow-lg"
        >
          View Complete Day Plan →
        </Link>

        {/* Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          NEW
        </div>
      </div>
    </motion.div>
  );
};

export default DayPlanCard;