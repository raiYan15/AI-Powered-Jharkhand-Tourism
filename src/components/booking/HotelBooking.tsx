import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, MapPin, Calendar, Users, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';

interface HotelBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export const HotelBooking: React.FC<HotelBookingProps> = ({ onBack, onBookingComplete }) => {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    rooms: '1',
    guests: '2',
    roomType: 'standard',
    specialRequests: ''
  });

  const hotels = [
    {
      id: 'hotel1',
      name: 'Ranchi Hill Resort',
      location: 'Ranchi',
      category: 'Luxury',
      rating: 4.5,
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Parking'],
      roomTypes: {
        standard: { name: 'Standard Room', price: 3500 },
        deluxe: { name: 'Deluxe Room', price: 5000 },
        suite: { name: 'Executive Suite', price: 8000 }
      },
      image: '🏨',
      description: 'Luxury resort with panoramic hill views'
    },
    {
      id: 'hotel2',
      name: 'Tribal Heritage Hotel',
      location: 'Jamshedpur',
      category: 'Mid-range',
      rating: 4.2,
      amenities: ['Free WiFi', 'Restaurant', 'Cultural Shows', 'Parking'],
      roomTypes: {
        standard: { name: 'Heritage Room', price: 2500 },
        deluxe: { name: 'Tribal Suite', price: 3800 },
        suite: { name: 'Royal Suite', price: 5500 }
      },
      image: '🏛️',
      description: 'Experience authentic Jharkhand tribal culture'
    },
    {
      id: 'hotel3',
      name: 'Eco Valley Resort',
      location: 'Netarhat',
      category: 'Eco-friendly',
      rating: 4.3,
      amenities: ['Nature Walks', 'Organic Food', 'Bonfire', 'Parking'],
      roomTypes: {
        standard: { name: 'Valley View Room', price: 2000 },
        deluxe: { name: 'Forest Cottage', price: 3000 },
        suite: { name: 'Tree House Suite', price: 4500 }
      },
      image: '🌲',
      description: 'Sustainable eco-resort in pristine nature'
    },
    {
      id: 'hotel4',
      name: 'Budget Stay Inn',
      location: 'Dhanbad',
      category: 'Budget',
      rating: 3.8,
      amenities: ['Free WiFi', 'AC', 'Basic Restaurant'],
      roomTypes: {
        standard: { name: 'Comfort Room', price: 1200 },
        deluxe: { name: 'Superior Room', price: 1800 },
        suite: { name: 'Family Suite', price: 2500 }
      },
      image: '🏠',
      description: 'Clean, comfortable and affordable accommodation'
    }
  ];

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  };

  const calculateTotal = () => {
    if (!selectedHotel) return 0;
    const hotel = hotels.find(h => h.id === selectedHotel);
    if (!hotel) return 0;
    const roomPrice = hotel.roomTypes[formData.roomType as keyof typeof hotel.roomTypes].price;
    return roomPrice * calculateNights() * parseInt(formData.rooms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel) {
      alert('Please select a hotel');
      return;
    }
    
    const selectedHotelData = hotels.find(h => h.id === selectedHotel);
    const bookingData = {
      type: 'Hotel Booking',
      hotel: selectedHotelData,
      ...formData,
      nights: calculateNights(),
      totalCost: calculateTotal(),
      status: 'Pending',
      id: `hotel_${Date.now()}`
    };
    
    onBookingComplete(bookingData);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'free wifi': return <Wifi size={16} />;
      case 'parking': return <Car size={16} />;
      case 'restaurant': return <Utensils size={16} />;
      case 'spa': return <Coffee size={16} />;
      default: return null;
    }
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
            <div className="text-6xl mb-4">🏨</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">Hotel Booking</h1>
            <p className="text-gray-700">Find and book the perfect accommodation for your stay in Jharkhand</p>
          </div>
        </Card>

        {/* Search Form */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Search Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">Check-in Date</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                min={new Date().toISOString().split('T')[0]}
                title="Check-in date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">Check-out Date</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
                title="Check-out date"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">Rooms</label>
              <select
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                title="Number of rooms"
              >
                {[1,2,3,4,5].map(num => (
                  <option key={num} value={num}>{num} Room{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">Guests</label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                title="Number of guests"
              >
                {[1,2,3,4,5,6].map(num => (
                  <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Hotel Selection */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Available Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map(hotel => (
              <div
                key={hotel.id}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedHotel === hotel.id
                    ? 'border-peach-500 bg-peach-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedHotel(hotel.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{hotel.image}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg text-peach-700">{hotel.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-500 fill-current" size={16} />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{hotel.location}</span>
                      <span className="px-2 py-1 bg-peach-100 text-peach-700 text-xs rounded-full">
                        {hotel.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {hotel.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {getAmenityIcon(amenity)}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm">
                      <p className="font-medium text-peach-700">
                        From ₹{Math.min(...Object.values(hotel.roomTypes).map(rt => rt.price))}/night
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Room Selection & Booking */}
        {selectedHotel && (
          <Card className="glassmorphic-card border-peach-200/40">
            <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Room Selection & Booking</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-3">Select Room Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(hotels.find(h => h.id === selectedHotel)!.roomTypes).map(([key, room]) => (
                    <div
                      key={key}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.roomType === key
                          ? 'border-peach-500 bg-peach-50'
                          : 'border-gray-200 hover:border-peach-300'
                      }`}
                      onClick={() => setFormData({ ...formData, roomType: key })}
                    >
                      <h4 className="font-bold text-peach-700 mb-2">{room.name}</h4>
                      <p className="text-lg font-bold text-peach-600">₹{room.price}/night</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Early check-in, late check-out, dietary requirements, etc."
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80 h-24 resize-none"
                />
              </div>

              {formData.checkIn && formData.checkOut && calculateNights() > 0 && (
                <div className="p-6 bg-peach-50 rounded-lg border border-peach-200">
                  <h3 className="font-bold text-peach-700 mb-4">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Hotel:</strong> {hotels.find(h => h.id === selectedHotel)?.name}</p>
                      <p><strong>Room Type:</strong> {(() => {
                        const hotel = hotels.find(h => h.id === selectedHotel);
                        return hotel?.roomTypes[formData.roomType as keyof typeof hotel.roomTypes].name;
                      })()}</p>
                      <p><strong>Check-in:</strong> {new Date(formData.checkIn).toLocaleDateString()}</p>
                      <p><strong>Check-out:</strong> {new Date(formData.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p><strong>Nights:</strong> {calculateNights()}</p>
                      <p><strong>Rooms:</strong> {formData.rooms}</p>
                      <p><strong>Guests:</strong> {formData.guests}</p>
                      <p className="text-lg font-bold text-peach-700 mt-2">
                        <strong>Total: ₹{calculateTotal().toLocaleString()}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold py-4 px-6 rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                disabled={!formData.checkIn || !formData.checkOut || calculateNights() <= 0}
              >
                Book Hotel - ₹{calculateTotal().toLocaleString()}
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