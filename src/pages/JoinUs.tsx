import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from '../components/common/Card'; // Adjusted import path

const TouristIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const GuideIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.5-10.5h-7a.5.5 0 00-.5.5v14.5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5V7.25a.5.5 0 00-.5-.5z" />
    </svg>
);

const VendorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h18M5.25 3v18m13.5-18v18M9 6.75h6.75M9 11.25h6.75M9 15.75h6.75" />
    </svg>
);

const AdminIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.871a3 3 0 01-.879-2.122v-1.007" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 8.25v-1.5a3.75 3.75 0 10-7.5 0v1.5m11.25 10.5a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const userTypes = [
    {
        type: 'Tourist',
        description: 'Plan your perfect adventure, discover hidden gems, and book authentic experiences.',
        Icon: TouristIcon,
        color: 'bg-blue-500',
        hoverColor: 'hover:bg-blue-600',
    },
    {
        type: 'Guide',
        description: 'Showcase your expertise, connect with travelers, and get verified on our platform.',
        Icon: GuideIcon,
        color: 'bg-green-500',
        hoverColor: 'hover:bg-green-600',
    },
    {
        type: 'Vendor',
        description: 'List your hotel, restaurant, or shop to reach a wider audience of tourists.',
        Icon: VendorIcon,
        color: 'bg-yellow-500',
        hoverColor: 'hover:bg-yellow-600',
    },
    {
        type: 'Admin',
        description: 'Access the dashboard to manage listings, monitor analytics, and ensure quality.',
        Icon: AdminIcon,
        color: 'bg-purple-500',
        hoverColor: 'hover:bg-purple-600',
    }
];

const JoinUs: React.FC = () => {
    const navigate = useNavigate();
    const handleSignupClick = (userType: string) => {
        if (userType === 'Tourist') {
            navigate('/signup/tourist');
        } else if (userType === 'Vendor') {
            navigate('/vendor-signup');
        } else if (userType === 'Guide') {
            navigate('/guide-signup');
        } else if (userType === 'Admin') {
            navigate('/admin-signup');
        }
    };

    return (
        <div className="bg-[#fdf8f3] min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow py-12 px-4 mt-8"> {/* Add mt-8 for top margin */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-serif font-bold text-brand-green mb-2">
                        Join Our Community
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Whether you're here to explore, guide, or offer services, we have a place for you. Choose your role to get started.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {userTypes.map(({ type, description, Icon, color, hoverColor }) => (
                        <Card key={type} className="p-0 text-center flex flex-col group overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                            <div className={`p-8 text-white ${color}`}>
                                <Icon className="h-16 w-16 mx-auto" />
                                <h3 className="text-3xl font-bold font-serif mt-4">{type}</h3>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <p className="text-gray-600 flex-grow">{description}</p>
                                <button
                                    onClick={() => handleSignupClick(type)}
                                    className={`mt-6 w-full px-4 py-3 text-white font-bold rounded-lg ${color} ${hoverColor} transition-colors`}
                                >
                                    Sign Up as a {type}
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default JoinUs;