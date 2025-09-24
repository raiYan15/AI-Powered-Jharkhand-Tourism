import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Star, Utensils } from 'lucide-react';

interface RestaurantBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export const RestaurantBooking: React.FC<RestaurantBookingProps> = ({ onBack, onBookingComplete }) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '2',
    seatingPreference: 'any',
    specialRequests: '',
    occasion: ''
  });

  const restaurants = [
    {
      id: 'rest1',
      name: 'Tribal Delights',
      cuisine: 'Traditional Jharkhandi',
      location: 'Ranchi',
      rating: 4.6,
      priceRange: '₹₹',
      specialties: ['Dhuska', 'Litti Chokha', 'Tribal Thali'],
      image: '🍽️',
      description: 'Authentic tribal cuisine in traditional setting',
      avgCostPer2: 800
    },
    {
      id: 'rest2',
      name: 'Hill Station Cafe',
      cuisine: 'Multi-cuisine',
      location: 'Netarhat',
      rating: 4.4,
      priceRange: '₹₹₹',
      specialties: ['Continental', 'Indian', 'Chinese'],
      image: '☕',
      description: 'Scenic dining with valley views',
      avgCostPer2: 1200
    },
    {
      id: 'rest3',
      name: 'Forest View Restaurant',
      cuisine: 'North Indian',
      location: 'Jamshedpur',
      rating: 4.3,
      priceRange: '₹₹',
      specialties: ['Punjabi Dal', 'Butter Chicken', 'Naan'],
      image: '🌲',
      description: 'Family restaurant with garden seating',
      avgCostPer2: 900
    },
    {
      id: 'rest4',
      name: 'Local Flavors',
      cuisine: 'Regional Specialties',
      location: 'Dhanbad',
      rating: 4.1,
      priceRange: '₹',
      specialties: ['Fish Curry', 'Rice Beer', 'Bamboo Shoot'],
      image: '🐟',
      description: 'Home-style cooking, budget-friendly',
      avgCostPer2: 500
    },
    {
      id: 'rest5',
      name: 'Royal Dining',
      cuisine: 'Fine Dining',
      location: 'Ranchi',
      rating: 4.7,
      priceRange: '₹₹₹₹',
      specialties: ['Continental', 'Wine Pairing', 'Chef Special'],
      image: '👑',
      description: 'Luxury dining experience',
      avgCostPer2: 2500
    }
  ];

  const timeSlots = [
    '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM'
  ];

  const calculateEstimatedCost = () => {
    if (!selectedRestaurant) return 0;
    const restaurant = restaurants.find(r => r.id === selectedRestaurant);
    if (!restaurant) return 0;
    
    const costPer2 = restaurant.avgCostPer2;
    const guestCount = parseInt(formData.guests);
    return Math.round((costPer2 / 2) * guestCount);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      alert('Please select a restaurant');
      return;
    }
    
    const selectedRestaurantData = restaurants.find(r => r.id === selectedRestaurant);
    const bookingData = {
      type: 'Restaurant Reservation',
      restaurant: selectedRestaurantData,
      ...formData,
      estimatedCost: calculateEstimatedCost(),
      status: 'Pending',
      id: `restaurant_${Date.now()}`
    };
    
    onBookingComplete(bookingData);
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
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">Restaurant Reservations</h1>
            <p className="text-gray-700">Reserve a table at the finest restaurants in Jharkhand</p>
          </div>
        </Card>

        {/* Restaurant Selection */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Choose Restaurant</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map(restaurant => (
              <div
                key={restaurant.id}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedRestaurant === restaurant.id
                    ? 'border-peach-500 bg-peach-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedRestaurant(restaurant.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{restaurant.image}</div>
                  <h3 className="font-bold text-lg text-peach-700 mb-2">{restaurant.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="text-sm font-medium">{restaurant.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">{restaurant.priceRange}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    <MapPin size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{restaurant.location}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{restaurant.description}</p>
                  <div className="text-xs text-gray-500 mb-2">
                    <strong>Specialties:</strong>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {restaurant.specialties.map((specialty, idx) => (
                      <span key={idx} className="px-2 py-1 bg-peach-100 text-peach-700 text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-peach-700 mt-3">
                    ~₹{restaurant.avgCostPer2} for 2 people
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Reservation Form */}
        {selectedRestaurant && (
          <Card className="glassmorphic-card border-peach-200/40">
            <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Reservation Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    title="Reservation date"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    <Clock size={16} className="inline mr-2" />
                    Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    required
                    title="Reservation time"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    <Users size={16} className="inline mr-2" />
                    Number of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    required
                    title="Number of guests"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    Seating Preference
                  </label>
                  <select
                    value={formData.seatingPreference}
                    onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    title="Seating preference"
                  >
                    <option value="any">Any Available</option>
                    <option value="window">Window Table</option>
                    <option value="outdoor">Outdoor Seating</option>
                    <option value="private">Private Booth</option>
                    <option value="bar">Bar Seating</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    Occasion (Optional)
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    title="Special occasion"
                  >
                    <option value="">No Special Occasion</option>
                    <option value="birthday">Birthday</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="business">Business Meeting</option>
                    <option value="family">Family Gathering</option>
                    <option value="romantic">Romantic Dinner</option>
                    <option value="celebration">Celebration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Dietary restrictions, allergies, special arrangements, cake cutting, etc."
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80 h-24 resize-none"
                />
              </div>

              {/* Reservation Summary */}
              <div className="p-6 bg-peach-50 rounded-lg border border-peach-200">
                <h3 className="font-bold text-peach-700 mb-4">Reservation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Restaurant:</strong> {restaurants.find(r => r.id === selectedRestaurant)?.name}</p>
                    <p><strong>Date:</strong> {formData.date ? new Date(formData.date).toLocaleDateString() : 'Not selected'}</p>
                    <p><strong>Time:</strong> {formData.time || 'Not selected'}</p>
                    <p><strong>Guests:</strong> {formData.guests}</p>
                  </div>
                  <div>
                    <p><strong>Seating:</strong> {formData.seatingPreference.charAt(0).toUpperCase() + formData.seatingPreference.slice(1)}</p>
                    {formData.occasion && <p><strong>Occasion:</strong> {formData.occasion.charAt(0).toUpperCase() + formData.occasion.slice(1)}</p>}
                    <p className="text-lg font-bold text-peach-700 mt-2">
                      <strong>Estimated Cost: ₹{calculateEstimatedCost().toLocaleString()}</strong>
                    </p>
                    <p className="text-xs text-gray-500">*Actual bill may vary based on orders</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold py-4 px-6 rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Reserve Table
              </button>
            </form>
          </Card>
        )}
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