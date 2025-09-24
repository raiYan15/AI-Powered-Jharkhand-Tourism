import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Add this import
import { Card } from '../components/common/Card';
import { ItineraryPlanner } from './TouristDashboard/ItineraryPlanner';
import { JharkhandChatbot } from './TouristDashboard/JharkhandChatbot';
import { IssueFeedback } from './TouristDashboard/IssueFeedback';
import { PlacesExplorer } from './TouristDashboard/PlacesExplorer';
import { BookingManager } from './TouristDashboard/BookingManager';
import DashboardOverview from './TouristDashboard/DashboardOverview';
import type { Booking } from '../types';

const NAV_ITEMS = [
    { id: 'overview', label: 'Dashboard', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" />
        </svg>
    )},
    { id: 'planner', label: 'My Planner', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M8 7V3M16 7V3M4 11H20M5 21H19A2 2 0 0021 19V7A2 2 0 0019 5H5A2 2 0 003 7V19A2 2 0 005 21Z" />
        </svg>
    )},
    { id: 'feedback', label: 'Issue & Feedback', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
        </svg>
    )},
    { id: 'places', label: 'Places', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
        </svg>
    )},
    { id: 'booking', label: 'Booking', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" />
        </svg>
    )},
    { id: 'chatbot', label: 'Chatbot', icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="10" rx="5" /><circle cx="7" cy="12" r="1.5" /><circle cx="17" cy="12" r="1.5" />
        </svg>
    )},
];

export const TouristDashboard: React.FC = () => {
    const [view, setView] = useState('overview');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const navigate = useNavigate(); // <-- Add this line

    const renderView = () => {
        switch (view) {
            case 'planner': return <ItineraryPlanner />;
            case 'chatbot': return <JharkhandChatbot />;
            case 'feedback': return <IssueFeedback />;
            case 'places': return <PlacesExplorer />;
            case 'booking': return <BookingManager setBookings={setBookings} />;
            case 'overview':
            default: return <DashboardOverview bookings={bookings} setView={setView} />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6]">
            {/* Glassmorphic Top Navbar */}
            <nav className="fixed top-0 left-0 w-full z-20 flex justify-center backdrop-blur-md bg-white/40 border-b border-green-300/30 shadow-lg">
                <ul className="flex flex-row gap-2 md:gap-6 px-2 md:px-8 py-2 items-center">
                    {/* Home Button */}
                    <li>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-white/70 text-green-900 hover:bg-green-100/80 transition shadow"
                            style={{ backdropFilter: 'blur(8px)' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M3 12l9-9 9 9" /><path d="M9 21V9h6v12" />
                            </svg>
                            <span className="hidden sm:inline">Home</span>
                        </button>
                    </li>
                    {NAV_ITEMS.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setView(item.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition
                                    ${view === item.id
                                        ? 'bg-green-600/80 text-white shadow'
                                        : 'bg-white/60 text-green-900 hover:bg-green-100/80'}
                                `}
                                style={{ backdropFilter: 'blur(8px)' }}
                            >
                                {item.icon}
                                <span className="hidden sm:inline">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            {/* Main Content */}
            <main className="pt-24 max-w-5xl mx-auto px-2 md:px-8">
                <div className="w-full">
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default TouristDashboard;