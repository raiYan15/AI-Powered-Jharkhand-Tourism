import React, { useState } from 'react';
import { Card } from '../../components/Card';
import { GuideBooking } from '../../components/booking/GuideBooking';
import { HotelBooking } from '../../components/booking/HotelBooking';
import { TransportBooking } from '../../components/booking/TransportBooking';
import { RestaurantBooking } from '../../components/booking/RestaurantBooking';
import { TicketBooking } from '../../components/booking/TicketBooking';
import { CarRental } from '../../components/booking/CarRental';
import { AllInOneBooking } from '../../components/booking/AllInOneBooking';

const bookingCategories = [
    { title: 'Guide Booking', icon: '👤', component: 'guide' },
    { title: 'Local Transport (Cab/Bus)', icon: '🚌', component: 'transport' },
    { title: 'Hotel Booking', icon: '🏨', component: 'hotel' },
    { title: 'Restaurant Reservations', icon: '🍽️', component: 'restaurant' },
    { title: 'Train / Flight Tickets', icon: '✈️', component: 'tickets' },
    { title: 'Car Rentals', icon: '🚗', component: 'rental' },
];

interface Booking {
    id: string;
    category: string;
    status: string;
    date: string;
}

interface BookingManagerProps {
    setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export const BookingManager: React.FC<BookingManagerProps> = ({ setBookings }) => {
    const [activePortal, setActivePortal] = useState<string | null>(null);
    const [confirmation, setConfirmation] = useState<string | null>(null);

    const handleBookNow = (category: string, component: string) => {
        // Open the individual portal for all booking types
        setActivePortal(component);
    };

    const handleBookingComplete = (bookingData: any) => {
        const newBooking: Booking = {
            id: bookingData.id,
            category: bookingData.type,
            status: bookingData.status,
            date: new Date().toLocaleDateString('en-CA'),
        };
        setBookings(prev => [...prev, newBooking]);
        setConfirmation(`Your ${bookingData.type} has been successfully booked! Booking ID: ${bookingData.id}`);
        setTimeout(() => {
            setConfirmation(null);
            setActivePortal(null);
        }, 3000);
    };

    const handleBackToPortal = () => {
        setActivePortal(null);
    };

    // Render individual portal components
    if (activePortal === 'guide') {
        return <GuideBooking onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }
    if (activePortal === 'hotel') {
        return <HotelBooking onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }
    if (activePortal === 'transport') {
        return <TransportBooking onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }
    if (activePortal === 'restaurant') {
        return <RestaurantBooking onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }
    if (activePortal === 'tickets') {
        return <TicketBooking onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }
    if (activePortal === 'rental') {
        return <CarRental onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }
    if (activePortal === 'allinone') {
        return <AllInOneBooking onBack={handleBackToPortal} onBookingComplete={handleBookingComplete} />;
    }

    // Main booking portal view
    return (
        <div className="min-h-[80vh] py-8 px-2 bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] flex flex-col">
            <div className="max-w-6xl mx-auto w-full space-y-8">
                <Card className="glassmorphic-card border-peach-200/40">
                    <h2 className="text-3xl font-serif font-bold text-peach-700 mb-6 text-center">Booking Portal</h2>
                    <p className="text-gray-700 text-center mb-8">Choose from our comprehensive booking services for your Jharkhand adventure</p>

                    {confirmation && (
                        <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-md animate-fade-in">
                            <p className="font-bold">Booking Submitted!</p>
                            <p>{confirmation}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bookingCategories.map(cat => (
                            <Card key={cat.title} className="text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 glassmorphic-card border-peach-200/40">
                                <div className="text-5xl mb-4" aria-hidden="true">{cat.icon}</div>
                                <h3 className="text-lg font-bold text-peach-700 mb-4 h-12 flex items-center justify-center">{cat.title}</h3>
                                <button 
                                    onClick={() => handleBookNow(cat.title, cat.component)}
                                    className="w-full px-4 py-3 bg-gradient-to-r from-peach-600 to-peach-400 text-white font-semibold rounded-lg hover:from-peach-700 hover:to-peach-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Book Now
                                </button>
                            </Card>
                        ))}
                    </div>
                </Card>

                <Card className="glassmorphic-card border-peach-200/40 text-center">
                    <h3 className="font-bold text-2xl font-serif text-peach-700 mb-4">All-in-One Trip Booking</h3>
                    <p className="text-gray-700 mt-2 max-w-2xl mx-auto mb-6">
                        Want a hassle-free experience? Let us handle everything from your transport to stays with a single, convenient booking.
                    </p>
                    <button 
                        onClick={() => setActivePortal('allinone')}
                        className="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white font-bold rounded-lg hover:from-orange-700 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Book Complete Package 🎯
                    </button>
                    <div className="mt-4 text-sm text-gray-600">
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full mr-2">✓ Save up to 30%</span>
                        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full">✓ Everything Included</span>
                    </div>
                </Card>
            </div>

            {/* Glassmorphic style */}
            <style>{`
                .glassmorphic-card {
                    background: rgba(255,255,255,0.7);
                    backdrop-filter: blur(12px);
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};