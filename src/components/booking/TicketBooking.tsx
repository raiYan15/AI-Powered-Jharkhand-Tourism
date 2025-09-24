import React, { useState } from 'react';
import { Card } from '../Card';
import { ArrowLeft, MapPin, Calendar, Users, Plane, Train } from 'lucide-react';

interface TicketBookingProps {
  onBack: () => void;
  onBookingComplete: (bookingData: any) => void;
}

export const TicketBooking: React.FC<TicketBookingProps> = ({ onBack, onBookingComplete }) => {
  const [ticketType, setTicketType] = useState<'train' | 'flight'>('train');
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '1',
    class: 'economy',
    isReturn: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookingData = {
      type: `${ticketType === 'train' ? 'Train' : 'Flight'} Ticket Booking`,
      ticketType,
      ...formData,
      totalCost: ticketType === 'train' ? 500 * parseInt(formData.passengers) : 3500 * parseInt(formData.passengers),
      status: 'Pending',
      id: `${ticketType}_${Date.now()}`
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
            <div className="text-6xl mb-4">✈️</div>
            <h1 className="text-3xl font-serif font-bold text-peach-700 mb-2">Train / Flight Tickets</h1>
            <p className="text-gray-700">Book train and flight tickets for your journey to and from Jharkhand</p>
          </div>
        </Card>

        {/* Ticket Type Selection */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">Choose Travel Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 text-center ${
                ticketType === 'train'
                  ? 'border-peach-500 bg-peach-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
              }`}
              onClick={() => setTicketType('train')}
            >
              <Train size={48} className="mx-auto mb-4 text-peach-600" />
              <h3 className="text-xl font-bold text-peach-700 mb-2">Train</h3>
              <p className="text-gray-600">Comfortable and affordable rail travel</p>
            </div>
            <div
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-300 text-center ${
                ticketType === 'flight'
                  ? 'border-peach-500 bg-peach-50 shadow-lg'
                  : 'border-gray-200 bg-white hover:border-peach-300 hover:shadow-md'
              }`}
              onClick={() => setTicketType('flight')}
            >
              <Plane size={48} className="mx-auto mb-4 text-peach-600" />
              <h3 className="text-xl font-bold text-peach-700 mb-2">Flight</h3>
              <p className="text-gray-600">Fast and convenient air travel</p>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <Card className="glassmorphic-card border-peach-200/40">
          <h2 className="text-2xl font-serif font-bold text-peach-700 mb-6">
            {ticketType === 'train' ? 'Train' : 'Flight'} Booking Details
          </h2>
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
                  placeholder={ticketType === 'train' ? 'Enter departure station' : 'Enter departure airport'}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Departure location"
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
                  placeholder={ticketType === 'train' ? 'Enter destination station' : 'Enter destination airport'}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  title="Destination"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  <Calendar size={16} className="inline mr-2" />
                  Departure Date
                </label>
                <input
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  title="Departure date"
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
                  {[1,2,3,4,5,6].map(num => (
                    <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">
                  Class
                </label>
                <select
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  title="Travel class"
                >
                  {ticketType === 'train' ? (
                    <>
                      <option value="sleeper">Sleeper Class</option>
                      <option value="3ac">3rd AC</option>
                      <option value="2ac">2nd AC</option>
                      <option value="1ac">1st AC</option>
                    </>
                  ) : (
                    <>
                      <option value="economy">Economy</option>
                      <option value="premium-economy">Premium Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First Class</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-peach-900">
                <input
                  type="checkbox"
                  checked={formData.isReturn}
                  onChange={(e) => setFormData({ ...formData, isReturn: e.target.checked })}
                  className="w-4 h-4 text-peach-600 border-peach-300 rounded focus:ring-peach-500"
                />
                Return Journey
              </label>
            </div>

            {formData.isReturn && (
              <div>
                <label className="block text-sm font-semibold text-peach-900 mb-2">Return Date</label>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                  className="w-full p-3 border border-peach-200 rounded-lg focus:ring-2 focus:ring-peach-500 focus:border-peach-500 bg-white/80"
                  min={formData.departureDate || new Date().toISOString().split('T')[0]}
                  title="Return date"
                />
              </div>
            )}

            {/* Price Summary */}
            <div className="p-6 bg-peach-50 rounded-lg border border-peach-200">
              <h3 className="font-bold text-peach-700 mb-4">Booking Summary</h3>
              <div className="text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span>Travel Mode:</span>
                  <span className="font-medium">{ticketType === 'train' ? 'Train' : 'Flight'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Journey Type:</span>
                  <span className="font-medium">{formData.isReturn ? 'Round Trip' : 'One Way'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span className="font-medium">{formData.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Class:</span>
                  <span className="font-medium">{formData.class.charAt(0).toUpperCase() + formData.class.slice(1)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold text-peach-700">
                  <span>Estimated Cost:</span>
                  <span>₹{((ticketType === 'train' ? 500 : 3500) * parseInt(formData.passengers) * (formData.isReturn ? 2 : 1)).toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">*Final price may vary based on availability and booking date</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-peach-600 to-peach-400 text-white font-bold py-4 px-6 rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book {ticketType === 'train' ? 'Train' : 'Flight'} Tickets
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