import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, MapPin, Calendar, Users, Car, Shield, Fuel } from 'lucide-react';

interface CarRentalProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export const CarRental: React.FC<CarRentalProps> = ({ onBack, onBookingComplete }) => {
  const [selectedCar, setSelectedCar] = useState<string>('compact');
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    driverRequired: false,
    insurance: 'basic'
  });

  const carTypes = [
    {
      id: 'compact',
      name: 'Compact Car',
      model: 'Maruti Swift or similar',
      capacity: '4 seats',
      fuel: 'Petrol',
      pricePerDay: 1500,
      image: '🚗',
      features: ['AC', 'Manual', 'Good Mileage']
    },
    {
      id: 'sedan',
      name: 'Sedan',
      model: 'Honda City or similar',
      capacity: '5 seats',
      fuel: 'Petrol',
      pricePerDay: 2200,
      image: '🚘',
      features: ['AC', 'Automatic', 'Comfortable']
    },
    {
      id: 'suv',
      name: 'SUV',
      model: 'Mahindra Scorpio or similar',
      capacity: '7 seats',
      fuel: 'Diesel',
      pricePerDay: 3500,
      image: '🚙',
      features: ['AC', 'Manual', 'Off-road capable']
    },
    {
      id: 'luxury',
      name: 'Luxury Car',
      model: 'Toyota Camry or similar',
      capacity: '5 seats',
      fuel: 'Petrol',
      pricePerDay: 5500,
      image: '🚖',
      features: ['AC', 'Automatic', 'Premium Interior']
    }
  ];

  const calculateDays = () => {
    if (formData.pickupDate && formData.returnDate) {
      const start = new Date(formData.pickupDate);
      const end = new Date(formData.returnDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return days > 0 ? days : 1;
    }
    return 1;
  };

  const calculateTotal = () => {
    const selectedCarData = carTypes.find(car => car.id === selectedCar);
    if (!selectedCarData) return 0;
    
    const days = calculateDays();
    const carCost = selectedCarData.pricePerDay * days;
    const driverCost = formData.driverRequired ? 500 * days : 0;
    const insuranceCost = formData.insurance === 'comprehensive' ? 200 * days : 50 * days;
    
    return carCost + driverCost + insuranceCost;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedCarData = carTypes.find(car => car.id === selectedCar);
    const bookingData = {
      type: 'Car Rental',
      car: selectedCarData,
      ...formData,
      days: calculateDays(),
      totalCost: calculateTotal(),
      status: 'Pending',
      id: `rental_${Date.now()}`
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
            <div className="text-6xl mb-4">🚗</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">Car Rentals</h1>
            <p className="text-gray-700">Rent a car for your comfortable journey across Jharkhand</p>
          </div>
        </Card>

        {/* Car Selection */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Choose Your Vehicle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carTypes.map(car => (
              <div
                key={car.id}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedCar === car.id
                    ? 'border-peach-500 bg-peach-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedCar(car.id)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{car.image}</div>
                  <h3 className="font-bold text-lg text-peach-700 mb-2">{car.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{car.model}</p>
                  <div className="text-xs text-gray-500 mb-3 space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Users size={12} />
                      <span>{car.capacity}</span>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Fuel size={12} />
                      <span>{car.fuel}</span>
                    </div>
                  </div>
                  <div className="space-y-1 mb-3">
                    {car.features.map((feature, idx) => (
                      <span key={idx} className="inline-block px-2 py-1 bg-gray-100 text-xs rounded-full mr-1">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-bold text-peach-600">₹{car.pricePerDay}/day</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rental Form */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Rental Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={formData.pickupLocation}
                  onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                  placeholder="Enter pickup address"
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Pickup location"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <MapPin size={16} className="inline mr-2" />
                  Drop-off Location
                </label>
                <input
                  type="text"
                  value={formData.dropoffLocation}
                  onChange={(e) => setFormData({ ...formData, dropoffLocation: e.target.value })}
                  placeholder="Enter drop-off address (same as pickup if round trip)"
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Drop-off location"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    title="Pickup date"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">Pickup Time</label>
                  <input
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    required
                    title="Pickup time"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-peach-900 mb-2">
                    <Calendar size={16} className="inline mr-2" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                    required
                    min={formData.pickupDate || new Date().toISOString().split('T')[0]}
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
                    required
                    title="Return time"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-peach-900 mb-2">
                  <input
                    type="checkbox"
                    checked={formData.driverRequired}
                    onChange={(e) => setFormData({ ...formData, driverRequired: e.target.checked })}
                    className="w-4 h-4 text-peach-600 border-peach-300 rounded focus:ring-peach-500"
                  />
                  Driver Required (+₹500/day)
                </label>
                <p className="text-xs text-gray-500">Professional driver with local knowledge</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <Shield size={16} className="inline mr-2" />
                  Insurance
                </label>
                <select
                  value={formData.insurance}
                  onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  title="Insurance type"
                >
                  <option value="basic">Basic Insurance (+₹50/day)</option>
                  <option value="comprehensive">Comprehensive Insurance (+₹200/day)</option>
                </select>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="p-6 bg-peach-50 rounded-lg border border-peach-200">
              <h3 className="font-bold text-peach-700 mb-4">Rental Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Vehicle:</strong> {carTypes.find(car => car.id === selectedCar)?.name}</p>
                  <p><strong>Rental Period:</strong> {calculateDays()} day{calculateDays() > 1 ? 's' : ''}</p>
                  <p><strong>Driver:</strong> {formData.driverRequired ? 'Yes' : 'Self-drive'}</p>
                  <p><strong>Insurance:</strong> {formData.insurance.charAt(0).toUpperCase() + formData.insurance.slice(1)}</p>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Car Rental:</span>
                    <span>₹{(carTypes.find(car => car.id === selectedCar)?.pricePerDay || 0) * calculateDays()}</span>
                  </div>
                  {formData.driverRequired && (
                    <div className="flex justify-between">
                      <span>Driver:</span>
                      <span>₹{500 * calculateDays()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Insurance:</span>
                    <span>₹{(formData.insurance === 'comprehensive' ? 200 : 50) * calculateDays()}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold text-peach-700">
                    <span>Total:</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold py-4 px-6 rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Rent Car - ₹{calculateTotal().toLocaleString()}
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