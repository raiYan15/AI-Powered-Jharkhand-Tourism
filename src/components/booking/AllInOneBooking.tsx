import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle, Star, Clock } from 'lucide-react';

interface AllInOneBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

interface TripPlan {
  destination: string;
  checkIn: string;
  checkOut: string;
  travelers: string;
  budget: 'budget' | 'mid-range' | 'luxury';
  interests: string[];
  includeGuide: boolean;
  includeTransport: boolean;
  includeMeals: boolean;
}

interface PackageOption {
  id: string;
  name: string;
  duration: string;
  price: number;
  originalPrice: number;
  savings: number;
  included: string[];
  highlights: string[];
  image: string;
  rating: number;
}

export const AllInOneBooking: React.FC<AllInOneBookingProps> = ({ onBack, onBookingComplete }) => {
  const [step, setStep] = useState(1);
  const [tripPlan, setTripPlan] = useState<TripPlan>({
    destination: '',
    checkIn: '',
    checkOut: '',
    travelers: '2',
    budget: 'mid-range',
    interests: [],
    includeGuide: true,
    includeTransport: true,
    includeMeals: true
  });
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const interests = ['Nature & Wildlife', 'Cultural Heritage', 'Adventure Sports', 'Waterfalls', 'Tribal Villages', 'Photography', 'Spiritual Sites', 'Local Cuisine'];

  const destinations = ['Ranchi', 'Netarhat', 'Jamshedpur', 'Deoghar', 'Hazaribagh', 'Dhanbad', 'Bokaro', 'Giridih'];

  const generatePackages = (): PackageOption[] => {
    const days = calculateDays();
    const basePrice = getBudgetBasePrice() * days;
    
    return [
      {
        id: 'essential',
        name: 'Essential Jharkhand',
        duration: `${days} Days, ${days - 1} Nights`,
        price: Math.round(basePrice * 0.85),
        originalPrice: Math.round(basePrice * 1.1),
        savings: Math.round(basePrice * 0.25),
        included: ['Accommodation', 'Daily Breakfast', 'Local Transport', 'Sightseeing'],
        highlights: ['Major attractions', 'Comfortable hotels', 'Guided tours'],
        image: '🏞️',
        rating: 4.2
      },
      {
        id: 'complete',
        name: 'Complete Jharkhand Experience',
        duration: `${days} Days, ${days - 1} Nights`,
        price: Math.round(basePrice * 1.0),
        originalPrice: Math.round(basePrice * 1.3),
        savings: Math.round(basePrice * 0.3),
        included: ['Accommodation', 'All Meals', 'Private Transport', 'Guide', 'Activities'],
        highlights: ['All major sites', 'Premium hotels', 'Personal guide', 'Cultural activities'],
        image: '🎯',
        rating: 4.6
      },
      {
        id: 'premium',
        name: 'Premium Jharkhand Luxury',
        duration: `${days} Days, ${days - 1} Nights`,
        price: Math.round(basePrice * 1.4),
        originalPrice: Math.round(basePrice * 1.8),
        savings: Math.round(basePrice * 0.4),
        included: ['Luxury Hotels', 'All Meals', 'Private Car + Driver', 'Expert Guide', 'Special Experiences', 'Airport Transfer'],
        highlights: ['5-star accommodations', 'Exclusive experiences', 'Personal butler', 'Private dining'],
        image: '👑',
        rating: 4.9
      }
    ];
  };

  const calculateDays = () => {
    if (tripPlan.checkIn && tripPlan.checkOut) {
      const start = new Date(tripPlan.checkIn);
      const end = new Date(tripPlan.checkOut);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    }
    return 3; // Default 3 days
  };

  const getBudgetBasePrice = () => {
    const travelers = parseInt(tripPlan.travelers);
    switch (tripPlan.budget) {
      case 'budget':
        return 2500 * travelers;
      case 'luxury':
        return 8000 * travelers;
      default:
        return 5000 * travelers;
    }
  };

  const handleInterestChange = (interest: string) => {
    setTripPlan(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    if (!selectedPackage) {
      alert('Please select a package');
      return;
    }

    const packageData = generatePackages().find(p => p.id === selectedPackage);
    const bookingData = {
      type: 'All-in-One Trip Booking',
      tripPlan,
      selectedPackage: packageData,
      totalCost: packageData?.price || 0,
      savings: packageData?.savings || 0,
      status: 'Pending',
      id: `allinone_${Date.now()}`
    };

    onBookingComplete(bookingData);
  };

  const renderStep1 = () => (
    <Card className="glassmorphic-card border-peach-200/40">
      <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Trip Planning Details</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-peach-900 mb-2">
              <MapPin size={16} className="inline mr-2" />
              Primary Destination
            </label>
            <select
              value={tripPlan.destination}
              onChange={(e) => setTripPlan({ ...tripPlan, destination: e.target.value })}
              className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
              required
              title="Select destination"
            >
              <option value="">Select your main destination</option>
              {destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-peach-900 mb-2">
              <Users size={16} className="inline mr-2" />
              Number of Travelers
            </label>
            <select
              value={tripPlan.travelers}
              onChange={(e) => setTripPlan({ ...tripPlan, travelers: e.target.value })}
              className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
              title="Number of travelers"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num} Traveler{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-peach-900 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Check-in Date
            </label>
            <input
              type="date"
              value={tripPlan.checkIn}
              onChange={(e) => setTripPlan({ ...tripPlan, checkIn: e.target.value })}
              className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
              required
              min={new Date().toISOString().split('T')[0]}
              title="Check-in date"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-peach-900 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Check-out Date
            </label>
            <input
              type="date"
              value={tripPlan.checkOut}
              onChange={(e) => setTripPlan({ ...tripPlan, checkOut: e.target.value })}
              className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
              required
              min={tripPlan.checkIn || new Date().toISOString().split('T')[0]}
              title="Check-out date"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-peach-900 mb-3">Budget Range</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { id: 'budget', name: 'Budget Friendly', desc: '₹2,500-4,000 per person/day', icon: '💰' },
              { id: 'mid-range', name: 'Mid-Range', desc: '₹5,000-7,000 per person/day', icon: '🏨' },
              { id: 'luxury', name: 'Luxury', desc: '₹8,000+ per person/day', icon: '👑' }
            ].map(budget => (
              <div
                key={budget.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  tripPlan.budget === budget.id
                    ? 'border-peach-500 bg-peach-50 shadow-lg'
                    : 'border-gray-200 hover:border-peach-300'
                }`}
                onClick={() => setTripPlan({ ...tripPlan, budget: budget.id as any })}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{budget.icon}</div>
                  <h4 className="font-bold text-peach-700 mb-1">{budget.name}</h4>
                  <p className="text-xs text-gray-600">{budget.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-peach-900 mb-3">Interests & Preferences</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interests.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestChange(interest)}
                className={`p-3 text-sm font-semibold rounded-lg transition-all border ${
                  tripPlan.interests.includes(interest)
                    ? 'bg-peach-600 text-white border-peach-600'
                    : 'bg-white text-peach-700 border-peach-200 hover:bg-peach-100'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-peach-900 mb-3">Additional Services</label>
          <div className="space-y-3">
            {[
              { key: 'includeGuide', label: 'Professional Local Guide', desc: 'Expert guidance and local insights' },
              { key: 'includeTransport', label: 'Private Transportation', desc: 'Comfortable AC vehicle with driver' },
              { key: 'includeMeals', label: 'Meal Arrangements', desc: 'Breakfast, lunch, and dinner included' }
            ].map(service => (
              <label key={service.key} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={tripPlan[service.key as keyof TripPlan] as boolean}
                  onChange={(e) => setTripPlan({ ...tripPlan, [service.key]: e.target.checked })}
                  className="w-4 h-4 text-peach-600 border-peach-300 rounded focus:ring-peach-500"
                />
                <div>
                  <div className="font-medium text-peach-700">{service.label}</div>
                  <div className="text-sm text-gray-600">{service.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setStep(2)}
            disabled={!tripPlan.destination || !tripPlan.checkIn || !tripPlan.checkOut}
            className="px-8 py-3 bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Packages
          </button>
        </div>
      </div>
    </Card>
  );

  const renderStep2 = () => {
    const packages = generatePackages();
    
    return (
      <div className="space-y-6">
        <Card className="glassmorphic-card border-peach-200/40">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-peach-700 mb-2">Choose Your Perfect Package</h2>
            <p className="text-gray-600">Curated packages for {tripPlan.destination} • {calculateDays()} days • {tripPlan.travelers} travelers</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.id}
                className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedPackage === pkg.id
                    ? 'border-peach-500 bg-peach-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {pkg.id === 'complete' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{pkg.image}</div>
                  <h3 className="text-xl font-bold text-peach-700 mb-2">{pkg.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{pkg.duration}</p>
                </div>

                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-peach-700 mb-1">₹{pkg.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-500 line-through">₹{pkg.originalPrice.toLocaleString()}</div>
                  <div className="text-sm font-medium text-green-600">Save ₹{pkg.savings.toLocaleString()}</div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-semibold text-peach-700 mb-2">Included:</h4>
                    <div className="space-y-1">
                      {pkg.included.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-peach-700 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-1">
                      {pkg.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-peach-100 text-peach-700 text-xs rounded-full">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="px-6 py-3 border border-peach-300 text-peach-700 font-semibold rounded-lg hover:bg-peach-50 transition-all duration-300"
          >
            Back to Details
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedPackage}
            className="px-8 py-3 bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Complete Package
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[80vh] py-8 px-2 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] flex flex-col">
      <div className="max-w-6xl mx-auto w-full space-y-6">
        {/* Header */}
        <Card className="glassmorphic-card border-peach-200/40">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-peach-700 hover:text-peach-900 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Booking Portal
            </button>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">All-in-One Trip Booking</h1>
            <p className="text-gray-700">Complete Jharkhand experience with everything included - no hassle, just amazing memories</p>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-6">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? 'text-peach-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-peach-600 text-white' : 'bg-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Trip Details</span>
              </div>
              <div className={`w-8 h-1 ${step >= 2 ? 'bg-peach-600' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-peach-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-peach-600 text-white' : 'bg-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Select Package</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
      </div>

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