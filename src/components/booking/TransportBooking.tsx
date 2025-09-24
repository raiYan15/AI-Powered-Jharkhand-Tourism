import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, MapPin, Calendar, Clock, Users, Car, Bus } from 'lucide-react';

interface TransportBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export const TransportBooking: React.FC<TransportBookingProps> = ({ onBack, onBookingComplete }) => {
  const [transportType, setTransportType] = useState<'cab' | 'bus'>('cab');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    passengers: '2',
    returnTrip: false,
    returnDate: '',
    returnTime: '',
    specialRequests: ''
  });

  const cabOptions = [
    { id: 'sedan', name: 'Sedan', capacity: 4, pricePerKm: 12, image: '🚗', description: 'Comfortable for city rides' },
    { id: 'suv', name: 'SUV', capacity: 6, pricePerKm: 18, image: '🚙', description: 'Perfect for hill stations' },
    { id: 'luxury', name: 'Luxury Car', capacity: 4, pricePerKm: 25, image: '🚘', description: 'Premium experience' },
    { id: 'tempo', name: 'Tempo Traveller', capacity: 12, pricePerKm: 22, image: '🚐', description: 'Great for groups' }
  ];

  const busRoutes = [
    { route: 'Ranchi to Jamshedpur', distance: 130, price: 250, duration: '3h' },
    { route: 'Ranchi to Dhanbad', distance: 160, price: 300, duration: '4h' },
    { route: 'Ranchi to Netarhat', distance: 156, price: 280, duration: '4.5h' },
    { route: 'Jamshedpur to Ranchi', distance: 130, price: 250, duration: '3h' },
    { route: 'Dhanbad to Ranchi', distance: 160, price: 300, duration: '4h' }
  ];

  const [selectedCab, setSelectedCab] = useState<string>('sedan');

  const calculateCabPrice = () => {
    // Estimated distance for popular routes
    const routeDistances: { [key: string]: number } = {
      'ranchi-jamshedpur': 130,
      'ranchi-dhanbad': 160,
      'ranchi-netarhat': 156,
      'ranchi-deoghar': 170,
      'default': 50
    };

    const routeKey = `${formData.from.toLowerCase()}-${formData.to.toLowerCase()}`;
    const distance = routeDistances[routeKey] || routeDistances.default;
    const selectedCabOption = cabOptions.find(cab => cab.id === selectedCab);
    
    if (!selectedCabOption) return 0;
    
    const oneWayPrice = distance * selectedCabOption.pricePerKm;
    return formData.returnTrip ? oneWayPrice * 2 : oneWayPrice;
  };

  const getBusPrice = () => {
    const routeKey = `${formData.from} to ${formData.to}`;
    const route = busRoutes.find(r => r.route.toLowerCase() === routeKey.toLowerCase());
    const basePrice = route ? route.price : 200;
    return formData.returnTrip ? basePrice * 2 : basePrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      type: 'Transport Booking',
      transportType,
      ...(transportType === 'cab' && { 
        selectedCab: cabOptions.find(cab => cab.id === selectedCab),
        totalCost: calculateCabPrice()
      }),
      ...(transportType === 'bus' && { 
        totalCost: getBusPrice()
      }),
      ...formData,
      status: 'Pending',
      id: `transport_${Date.now()}`
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
            <div className="text-6xl mb-4">🚌</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">Local Transport Booking</h1>
            <p className="text-gray-700">Book cabs or buses for your travel within Jharkhand</p>
          </div>
        </Card>

        {/* Transport Type Selection */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Choose Transport Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 text-center ${
                transportType === 'cab'
                  ? 'border-peach-500 bg-peach-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
              }`}
              onClick={() => setTransportType('cab')}
            >
              <Car size={48} className="mx-auto mb-4 text-peach-600" />
              <h3 className="text-xl font-bold text-peach-700 mb-2">Private Cab</h3>
              <p className="text-gray-600">Door-to-door service, flexible timing</p>
            </div>
            <div
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 text-center ${
                transportType === 'bus'
                  ? 'border-peach-500 bg-peach-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
              }`}
              onClick={() => setTransportType('bus')}
            >
              <Bus size={48} className="mx-auto mb-4 text-peach-600" />
              <h3 className="text-xl font-bold text-peach-700 mb-2">Bus Service</h3>
              <p className="text-gray-600">Affordable travel on fixed routes</p>
            </div>
          </div>
        </Card>

        {/* Cab Selection */}
        {transportType === 'cab' && (
          <Card className="glassmorphic-card border-peach-200/40">
            <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Select Vehicle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cabOptions.map(cab => (
                <div
                  key={cab.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 text-center ${
                    selectedCab === cab.id
                      ? 'border-peach-500 bg-peach-50 shadow-lg'
                      : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedCab(cab.id)}
                >
                  <div className="text-3xl mb-3">{cab.image}</div>
                  <h4 className="font-bold text-peach-700 mb-1">{cab.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{cab.description}</p>
                  <p className="text-sm text-gray-600 mb-1">Up to {cab.capacity} passengers</p>
                  <p className="text-sm font-bold text-peach-600">₹{cab.pricePerKm}/km</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Bus Routes */}
        {transportType === 'bus' && (
          <Card className="glassmorphic-card border-peach-200/40">
            <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Popular Bus Routes</h2>
            <div className="space-y-4">
              {busRoutes.map((route, idx) => (
                <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-peach-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-peach-700">{route.route}</h4>
                      <p className="text-sm text-gray-600">Distance: {route.distance}km • Duration: {route.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-peach-600">₹{route.price}</p>
                      <p className="text-xs text-gray-500">per person</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Booking Form */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Trip Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  From
                </label>
                <input
                  type="text"
                  value={formData.from}
                  onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                  placeholder="Enter pickup location"
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Pickup location"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  To
                </label>
                <input
                  type="text"
                  value={formData.to}
                  onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                  placeholder="Enter destination"
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Destination"
                />
              </div>
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
                  title="Travel date"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <Clock size={16} className="inline mr-2" />
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Travel time"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <Users size={16} className="inline mr-2" />
                  Passengers
                </label>
                <select
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  title="Number of passengers"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-peach-900">
                  <input
                    type="checkbox"
                    checked={formData.returnTrip}
                    onChange={(e) => setFormData({ ...formData, returnTrip: e.target.checked })}
                    className="w-4 h-4 text-peach-600 border-peach-300 rounded focus:ring-peach-500"
                  />
                  Return Trip
                </label>
              </div>
            </div>

            {formData.returnTrip && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-peach-50 rounded-lg border border-peach-200">
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">Return Date</label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    min={formData.date || new Date().toISOString().split('T')[0]}
                    title="Return date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">Return Time</label>
                  <input
                    type="time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    title="Return time"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-peach-900 mb-2">
                Special Requests (Optional)
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Any special requirements or stops along the way..."
                className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80 h-24 resize-none"
              />
            </div>

            {/* Price Summary */}
            <div className="p-6 bg-peach-50 rounded-lg border border-peach-200">
              <h3 className="font-bold text-peach-700 mb-4">Price Summary</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span>Transport Type:</span>
                  <span className="font-medium">{transportType === 'cab' ? 'Private Cab' : 'Bus Service'}</span>
                </div>
                {transportType === 'cab' && (
                  <div className="flex justify-between">
                    <span>Vehicle:</span>
                    <span className="font-medium">{cabOptions.find(cab => cab.id === selectedCab)?.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Trip Type:</span>
                  <span className="font-medium">{formData.returnTrip ? 'Round Trip' : 'One Way'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span className="font-medium">{formData.passengers}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold text-peach-700">
                  <span>Total Cost:</span>
                  <span>₹{transportType === 'cab' ? calculateCabPrice().toLocaleString() : getBusPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold py-4 px-6 rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Transport - ₹{transportType === 'cab' ? calculateCabPrice().toLocaleString() : getBusPrice().toLocaleString()}
            </button>
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