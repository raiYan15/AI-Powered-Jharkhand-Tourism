import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, User, MapPin, Calendar, Clock, Star } from 'lucide-react';

interface GuideBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export const GuideBooking: React.FC<GuideBookingProps> = ({ onBack, onBookingComplete }) => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '4',
    location: '',
    specialRequests: '',
    travelers: '2'
  });

  const guides = [
    {
      id: 'guide1',
      name: 'Ramesh Kumar',
      experience: '8 years',
      languages: ['Hindi', 'English', 'Santhali'],
      specialties: ['Cultural Tours', 'Wildlife', 'Waterfalls'],
      rating: 4.8,
      pricePerDay: 1500,
      image: '👨‍🦳'
    },
    {
      id: 'guide2', 
      name: 'Priya Singh',
      experience: '5 years',
      languages: ['Hindi', 'English', 'Bengali'],
      specialties: ['Adventure Tours', 'Tribal Culture', 'Photography'],
      rating: 4.9,
      pricePerDay: 1800,
      image: '👩‍🦰'
    },
    {
      id: 'guide3',
      name: 'Arjun Munda',
      experience: '12 years',
      languages: ['Hindi', 'English', 'Mundari', 'Ho'],
      specialties: ['Historical Sites', 'Tribal Villages', 'Local Cuisine'],
      rating: 4.7,
      pricePerDay: 2000,
      image: '👨‍🦲'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) {
      alert('Please select a guide');
      return;
    }
    
    const selectedGuideData = guides.find(g => g.id === selectedGuide);
    const bookingData = {
      type: 'Guide Booking',
      guide: selectedGuideData,
      ...formData,
      totalCost: selectedGuideData ? selectedGuideData.pricePerDay * parseInt(formData.duration) : 0,
      status: 'Pending',
      id: `guide_${Date.now()}`
    };
    
    onBookingComplete(bookingData);
  };

  return (
    <div className="min-h-[80vh] py-8 px-2 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] flex flex-col">
      <div className="max-w-4xl mx-auto w-full space-y-6">
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
            <div className="text-6xl mb-4">👤</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">Guide Booking</h1>
            <p className="text-gray-700">Book an experienced local guide for your Jharkhand adventure</p>
          </div>
        </Card>

        {/* Guide Selection */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Choose Your Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map(guide => (
              <div
                key={guide.id}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedGuide === guide.id
                    ? 'border-peach-500 bg-peach-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedGuide(guide.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{guide.image}</div>
                  <h3 className="font-bold text-lg text-peach-700 mb-2">{guide.name}</h3>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span className="text-sm font-medium">{guide.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{guide.experience} experience</p>
                  <p className="text-sm text-gray-600 mb-3">₹{guide.pricePerDay}/day</p>
                  <div className="text-xs text-gray-500 mb-2">
                    <strong>Languages:</strong> {guide.languages.join(', ')}
                  </div>
                  <div className="text-xs text-gray-500">
                    <strong>Specialties:</strong> {guide.specialties.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Booking Form */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Booking Details</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Tour Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                <Clock size={16} className="inline mr-2" />
                Start Time
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                required
              >
                <option value="">Select time</option>
                <option value="06:00">6:00 AM</option>
                <option value="07:00">7:00 AM</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                Duration (hours)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                required
              >
                <option value="4">4 hours (Half day)</option>
                <option value="8">8 hours (Full day)</option>
                <option value="16">2 days</option>
                <option value="24">3 days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                <User size={16} className="inline mr-2" />
                Number of Travelers
              </label>
              <input
                type="number"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                min="1"
                max="15"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Starting Location/Hotel
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter your hotel or pickup location"
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Any specific places you'd like to visit or special requirements..."
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80 h-24 resize-none"
              />
            </div>

            {selectedGuide && (
              <div className="md:col-span-2 p-4 bg-peach-50 rounded-lg border border-peach-200">
                <h3 className="font-bold text-peach-700 mb-2">Booking Summary</h3>
                <div className="text-sm text-gray-700 space-y-1">
                  <p><strong>Guide:</strong> {guides.find(g => g.id === selectedGuide)?.name}</p>
                  <p><strong>Duration:</strong> {formData.duration} hours</p>
                  <p><strong>Total Cost:</strong> ₹{guides.find(g => g.id === selectedGuide)?.pricePerDay ? guides.find(g => g.id === selectedGuide)!.pricePerDay * parseInt(formData.duration) / 8 : 0}</p>
                </div>
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold py-4 px-6 rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={!selectedGuide}
              >
                Book Your Guide - ₹{selectedGuide ? guides.find(g => g.id === selectedGuide)!.pricePerDay * parseInt(formData.duration) / 8 : 0}
              </button>
            </div>
          </form>
        </Card>
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