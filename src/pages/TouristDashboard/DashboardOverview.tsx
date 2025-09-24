// TouristDashboard.tsx
import React, { useState } from 'react';

interface DashboardOverviewProps {
    bookings: any[];
    setView: React.Dispatch<React.SetStateAction<string>>;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ bookings, setView }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Total Bookings</h3>
                    <p>{bookings.length}</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">Upcoming Tours</h3>
                    <p>{bookings.filter(booking => new Date(booking.date) > new Date()).length}</p>
                </div>
            </div>
            <button onClick={() => setView('planner')} className="mt-4 bg-brand-green text-white py-2 px-4 rounded">
                Go to Itinerary Planner
            </button>
        </div>
    );
};

const TouristDashboard: React.FC = () => {
    const [bookings, setBookings] = useState<any[]>([
        { id: 1, date: '2025-09-20' },
        { id: 2, date: '2025-09-25' },
    ]);
    const [view, setView] = useState<'overview' | 'planner'>('overview');

    const renderView = () => {
        switch (view) {
            case 'planner':
                return <ItineraryPlanner />; // Ensure this component is defined and imported correctly
            case 'overview':
            default:
                return <DashboardOverview bookings={bookings} setView={setView} />;
        }
    };

    return (
        <div>
            {renderView()}
        </div>
    );
};

export default TouristDashboard;